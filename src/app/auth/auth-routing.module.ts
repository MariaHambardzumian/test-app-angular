import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { AuthMainComponent } from './components/auth-main/auth-main.component'

const authRouts: Routes = [
  {
    path: '',
    component: AuthMainComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(authRouts)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
