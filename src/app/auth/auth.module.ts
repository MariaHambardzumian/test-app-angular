import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../services/auth/auth.service'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { HttpClientService } from '../services/http-client/http-client.service'
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http'
import { TokenInterceptor } from 'src/interceptors/token.interceptor'
import { AuthMainComponent } from './components/auth-main/auth-main.component'

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthMainComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService, HttpClientService, HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
})
export class AuthModule {}
