import { Injectable } from '@angular/core'
import {
  UserLogin,
  UserRegistration,
} from '../../auth/interfaces/auth.interface'
import { HttpClientService } from '../http-client/http-client.service'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'
import { Observable, catchError, combineLatest, forkJoin, map, of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClientService,
    private router: Router,
  ) {}
  private loginEndpoint = environment.loginEndpoint

  startSession(userInfo: UserLogin) {
    const userToken = JSON.stringify(userInfo)
    sessionStorage.setItem('authToken', userToken)
    return userToken
  }

  getSessionToken() {
    const sessionToken = sessionStorage.getItem('authToken')
    if (sessionToken) {
      return JSON.parse(sessionToken)
    }
  }

  isUserActive(): Observable<any> {
    if (!this.getSessionToken()) {
      this.router.navigate(['/auth/login'])
      return of(false)
    }
    const userInfo = this.httpClient.getData('/_me')
    const users = this.httpClient.getData()
    return forkJoin([userInfo, users])
  }
  logOut(): void {
    sessionStorage.clear()
  }
  getUsers() {
    return this.httpClient.getData()
  }

  addUser(user: UserRegistration): void {
    this.httpClient.postData(user).subscribe({
      next: (response) => {
        this.startSession(response._kmd.authtoken)
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        console.error('Error fetching data:', error)
      },
    })
  }

  loginUser(currentUser: UserLogin): void {
    this.httpClient
      .postData(currentUser, this.loginEndpoint)
      .pipe(
        tap((response) => this.startSession(response._kmd.authtoken)),
        tap(() => this.router.navigate(['/dashboard'])),
      )
      .subscribe()
  }
}
