import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { FailedLogin } from '../../interfaces/auth.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../style/form.component.css', './login.component.css'],
})
export class LoginComponent implements OnInit {
  failed: FailedLogin = { failMessage: null }
  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}
  login() {
    if (this.loginForm.invalid) return
    try {
      this.authService.loginUser(this.loginForm.value)
      this.router.navigate(['/dashboard'])
    } catch (error) {
      this.failed = error as FailedLogin
    }
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName)
    return !!(control?.invalid && (control?.dirty || control?.touched))
  }
  get emailControl(): AbstractControl {
    return this.loginForm.get('email') as AbstractControl
  }
  get passwordControl(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl
  }
}
