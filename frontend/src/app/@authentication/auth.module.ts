import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';



@NgModule({
  imports: [CommonModule, ReactiveFormsModule]

})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    };
  }
}

@NgModule({
  imports: [AuthModule]
})
export class RootAuthModule { }
