
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HLBParserComponent } from './hlpparser.component';
import { AuthGuard } from 'src/app/@auth/auth.guard';

const routes: Routes = [
  {
    path: "create/:id",
    canActivateChild: [AuthGuard],
    component: HLBParserComponent
  }
  ,{
    path: 'create',
    redirectTo: 'create/',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HLBParserRoutingModule {}
