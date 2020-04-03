
import { NgModule, Directive, APP_INITIALIZER } from "@angular/core";
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HLBParserModule } from './hlbparser/hlpparser.module';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from '../@core/core.module';
import { AuthModule } from '../@auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PageNotFound } from './error/error.component';

@NgModule({
  exports:[PagesComponent],
  declarations: [
    PagesComponent,
    PageNotFound
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    CoreModule,
    HLBParserModule,
    DashboardModule,

    QuillModule.forRoot(),
    //AuthModule.forRoot()
  ]
})
export class PagesModule {}
