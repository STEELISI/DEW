import { Component, OnInit, Inject, Input, Output, ViewChild, HostListener, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { HttpService } from "src/app/http-service.service";
import { StateService } from "src/app/state-service.service";


@Component({
  selector: "experiment-slides",
  templateUrl: "experiment-slides.component.html",
  styleUrls: ['./experiment-slides.component.scss']
})
export class ExperimentSlides implements OnInit {
	@Input() experimentId: Number;
	@Output() navigate: EventEmitter<any> = new EventEmitter();
	slides: any = [];

  constructor(
    protected http: HttpService,
    protected state: StateService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
  	console.log("experimentId : ", this.experimentId)
    this.http.get("v1/pr/design/experiment/slides/"+this.experimentId, {withCredential: true}).subscribe((response) => {
    		this.slides = response['slides']
    })
  }

  showTopology(){
  	this.navigate.emit(3);
  }

  showDependencyGraph(){
  	this.navigate.emit(2);
  }

  createSlide(){
  	console.log(this.slides)
  }

}
