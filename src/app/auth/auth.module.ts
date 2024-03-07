import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
  declarations: [RegisterComponent, LoginComponent, NavbarComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class AuthModule {}
