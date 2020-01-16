
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/@authentication/auth.guard';

const routes: Routes = [
  {
    path: "",
    canActivateChild: [AuthGuard],
    component: DashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
