import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./components/login/login.component";
import { CoreModule } from "../@core/core.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { GoogleOAuth2CallbackComponent } from "./components/googlecallback/google-oauth2-callback.component";
import { AuthResult } from "./auth-result";
import { InitUserService } from "./init-user.service";
import { LogoutComponent } from "./components/logout/logout.component";

@NgModule({
  exports: [AuthComponent],

  declarations: [
    AuthComponent,
    LoginComponent,
    GoogleOAuth2CallbackComponent,
    LogoutComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, CoreModule, AuthRoutingModule]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard]
    };
  }
}
