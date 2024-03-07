import { Injectable } from '@angular/core'
import { UserLogin, UserRegistration } from '../auth/interfaces/auth.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  startSession(userInfo: UserLogin) {
    const userInfoString = JSON.stringify(userInfo)
    sessionStorage.setItem('userInfo', userInfoString)
  }
  isLoggedIn(): boolean {
    const item = sessionStorage.getItem('userInfo')
    return item ? true : false
  }
  logOut(): void {
    sessionStorage.clear()
  }
  getUsers(): UserRegistration[] {
    const usersJSON = localStorage.getItem('users')
    return usersJSON ? JSON.parse(usersJSON) : []
  }

  addUser(user: UserRegistration): void {
    const users = this.getUsers()
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    this.startSession(user)
  }
  loginUser(currentUser: UserLogin): void {
    const users = this.getUsers()
    const finded = users.find((user) => user.email === currentUser.email)
    if (!finded) {
      throw { failMessage: 'User not found' }
    } else if (finded?.password !== currentUser.password) {
      throw { failMessage: 'Incorrect password' }
    }

    this.startSession(currentUser)
  }
}
