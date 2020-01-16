
import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatButtonModule } from '@angular/material';

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
  ], exports: [CommonModule, ...COMPONENTS],
})
export class CoreModule {}
