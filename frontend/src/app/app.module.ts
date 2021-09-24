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
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import google_oauth_credentials from '../../google_oauth_credentials.json';

//Auth service config
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_credentials.web.client_id)
  }
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
  ],
  imports: [
    AuthModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [
    HttpService, 
    StateService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
