import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === control.parent?.value.password
      ? null
      : { PasswordNoMatch: true }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../style/form.component.css', './register.component.css'],
})
export class RegisterComponent implements OnInit {
  regForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),
      ],
    ],
    confirmPassword: ['', [Validators.required, confirmPasswordValidator()]],
  })
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  handleSignup() {
    if (this.regForm.valid) {
      try {
        this.authService.addUser(this.regForm.value)
        this.router.navigate(['/dashboard'])
      } catch (error) {}
    }
  }
  get confirmPasswordControl(): AbstractControl {
    return this.regForm.get('confirmPassword') as AbstractControl
  }
  get passwordControl(): AbstractControl {
    return this.regForm.get('password') as AbstractControl
  }
  get emailControl(): AbstractControl {
    return this.regForm.get('email') as AbstractControl
  }
  get firstNameControl(): AbstractControl {
    return this.regForm.get('firstName') as AbstractControl
  }
  get lastNameControl(): AbstractControl {
    return this.regForm.get('lastName') as AbstractControl
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.regForm.get(controlName)
    return !!(control?.invalid && (control?.dirty || control?.touched))
  }
}

// export class RegisterComponent implements OnInit {

//     confirmPassword: ['', [confirmPasswordValidator]]
//   })
//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
//   }

// }
