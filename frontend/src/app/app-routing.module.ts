import { NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions } from "@angular/router";
import { AuthGuard } from './@authentication/auth.guard';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  // {
  //   path: 'pages',
  //  canLoad:[AuthGuard],
  //   loadChildren: () => import('../app/pages/pages.module')
  //     .then(m => m.PagesModule),
  // },
  {
    path: 'pages',
   canLoad:[AuthGuard],
    component:PagesComponent
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
 { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};


@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
