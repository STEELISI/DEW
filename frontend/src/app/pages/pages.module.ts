
import { NgModule, Directive } from "@angular/core";
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { HeaderComponent } from '../@core/header/header.component';
import { RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../@core/core.module';
import { AuthModule } from '../@authentication/auth.module';

@NgModule({
  exports:[PagesComponent],
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardModule,
    PagesRoutingModule,
    QuillModule.forRoot(),
    AuthModule.forRoot()
  ]
})
export class PagesModule {}
