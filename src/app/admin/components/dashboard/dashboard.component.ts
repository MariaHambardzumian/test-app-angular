import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users = this.authService.getUsers().map((user) => {
    user.password = user.password.replace(/./g, '*')
    return user
  })
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}
  logOut() {
    this.authService.logOut()
    this.router.navigate(['/'])
  }
}
