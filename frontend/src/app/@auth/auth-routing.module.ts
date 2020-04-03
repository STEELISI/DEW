import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./components/login/login.component";
import { GoogleOAuth2CallbackComponent } from './components/googlecallback/google-oauth2-callback.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        component: LoginComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "googleoauth2callback",
        component: GoogleOAuth2CallbackComponent
      },{
        path: "logout",
        component: LogoutComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
