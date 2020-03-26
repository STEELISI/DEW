
import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { AuthModule } from '../@auth/auth.module';
import { AuthService } from '../@auth/auth.service';
import { InitUserService } from '../@auth/init-user.service';
import { HttpService } from '../pages/hlbparser/common/http-service.service';

const COMPONENTS = [
    HeaderComponent,
    LayoutComponent
  ];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
   CommonModule,
   MatMenuModule,
   MatButtonModule,
   FormsModule
  ], exports: [CommonModule, ...COMPONENTS]
})
export class CoreModule {}
