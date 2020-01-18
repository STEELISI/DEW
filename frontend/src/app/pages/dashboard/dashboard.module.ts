
import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { QuillModule } from "ngx-quill";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StateService } from './common/state-service.service';
import { MatButtonModule, MatSnackBarModule, MatDialogModule, MatTableModule } from '@angular/material';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DashboardComponent } from './dashboard.component';
import {NgxGraphModule} from "@swimlane/ngx-graph"
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { HlbComponent } from './hlb/hlb.component';
import { NlpComponent } from './nlp/nlp.component';
import { TextFilterPipe } from './common/text-filter.pipe';
import { UploadComponent, FilePreviewComponent } from './upload/upload.component';
import { AuthGuard } from 'src/app/@authentication/auth.guard';
import { AuthModule } from 'src/app/@authentication/auth.module';
import { DependencyGraphComponent } from './dependency-graph/dependency-graph.component';
@NgModule({
  exports:[DashboardComponent],
  declarations: [
    DashboardComponent,
     HlbComponent,
     NlpComponent,
     DependencyGraphComponent,
     TextFilterPipe,
     UploadComponent,
     FilePreviewComponent
  ],
  imports: [
    CommonModule,
    AuthModule.forRoot(),
    RouterModule,
    NgxGraphModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatTabsModule,
    DragDropModule,
    FormsModule,
    MatTableModule,
    MatExpansionModule,
    MatCardModule,
    QuillModule.forRoot(),
    DashboardRoutingModule,
    MatInputModule,
    NgxFileDropModule
  ],
  entryComponents: [FilePreviewComponent],
  providers: [StateService],
  bootstrap:[DashboardComponent]
})
export class DashboardModule {}
