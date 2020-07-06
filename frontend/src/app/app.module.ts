import { BrowserModule } from "@angular/platform-browser";
import { NgModule} from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './http-service.service';
import { AuthModule } from './@auth/auth.module';
import { StateService } from './state-service.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers:[HttpService,StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
