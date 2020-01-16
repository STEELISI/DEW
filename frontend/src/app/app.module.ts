import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Directive } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from './pages/dashboard/common/http-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './@authentication/auth.guard';
import {AuthService} from './@authentication/auth.service';
import { AuthModule } from './@authentication/auth.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers:[HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
