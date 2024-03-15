import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AdminRoutingModule } from './admin-routing.module'
import { AuthService } from '../services/auth/auth.service'

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, AdminRoutingModule],
  providers: [AuthService],
})
export class AdminModule {}
