import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthModule } from './auth/auth.module'
import { AdminModule } from './admin/admin.module'
import { HttpClientModule } from '@angular/common/http'
import { NavbarComponent } from './auth/components/navbar/navbar.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AdminModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
