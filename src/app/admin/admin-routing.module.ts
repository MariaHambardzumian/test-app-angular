import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './components/dashboard/dashboard.component'

const adminRouts: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(adminRouts)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
