import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Directive, APP_INITIALIZER } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpService } from './http-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './@auth/auth.guard';
import {AuthService} from './@auth/auth.service';
import { AuthModule } from './@auth/auth.module';
import { AppService } from './app.service';
import { StateService } from './pages/hlbparser/common/state-service.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
   // PagesModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers:[HttpService,StateService
   // AppService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (ds: AppService) => function() {return ds.load()},
    //   deps: [AppService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
