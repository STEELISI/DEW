import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { AuthResult } from '../../auth-result';
import { InitUserService } from '../../init-user.service';

@Component({
  selector: 'google-oauth2-callback',
  template: `
  <div>
    <div>Welcome {{name}}!</div>
  </div>
`,
  styleUrls: ['./google-oauth2-callback.component.scss']
})
export class GoogleOAuth2CallbackComponent implements OnDestroy {

  alive = true;
  name:string='';
  constructor(private authService: AuthService,private router: Router,private initUserService:InitUserService) {
    this.authService.authenticate('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: AuthResult) => {
        console.log(authResult);
        if (authResult.isSuccess()) {
        this.router.navigate(['pages/dashboard']);
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}