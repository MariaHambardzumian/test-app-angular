import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UsersList } from 'src/app/auth/interfaces/auth.interface'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users : UsersList[] = []
  fisrtName = ''
  lastName = ''
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isUserActive().subscribe(([userInfo, allUsers]) => {
      this.users = allUsers as UsersList[]
      this.fisrtName = userInfo.firstName
      this.lastName = userInfo.lastName
    })
  }
  logOut() {
    this.authService.logOut()
    this.router.navigate(['/'])
  }
}
