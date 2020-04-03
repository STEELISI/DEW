import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../@auth/auth.guard';
import { PageNotFound } from './error/error.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  //canActivate: [AuthGuard],
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },
    {
      path: 'hlbparser',
      loadChildren: () => import('./hlbparser/hlpparser.module')
        .then(m => m.HLBParserModule),
    },
    
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component:PageNotFound,
    },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
