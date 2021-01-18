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
	lastSequenceNumber = 0;

  constructor(
    protected http: HttpService,
    protected state: StateService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
  	console.log("experimentId : ", this.experimentId)
    this.getSlideDetails()
  }


  showTopology(){
  	this.navigate.emit(5);
  }

  showDependencyGraph(){
  	this.navigate.emit(2);
  }

  createSlide(){
  	this.http.post("api/v1/pr/design/experiment/slides",{"experiment_id": this.experimentId, "sequence_number": this.lastSequenceNumber + 1},{withCredential: true}).subscribe((data) => {
  		this.slides.push(data['slide'])
  		this.lastSequenceNumber += 1
  	})
  }

  deleteSlide(slide){
  	this.http.delete("v1/pr/design/experiment/slides/"+this.experimentId+"/"+slide['slide_id'], {withCredential: true}).subscribe((data) => {
  		this.slides = this.slides.filter(s => s['slide_id'] != slide['slide_id'])
  	})
  }

  moveUpSlide(slide, index){
  	if(index == 0){
  		return;
  	}
  	this.http.post("api/v1/pr/design/experiment/slides/swap",{"experiment_id": this.experimentId, "first_slide_id": slide['slide_id'].toString(), "second_slide_id": this.slides[index-1]['slide_id'].toString()},{withCredential: true}).subscribe((data) => {
  		var second_slide = this.slides[index-1]
  		var s = slide['sequence_number']
  		slide['sequence_number'] = second_slide['sequence_number']
  		second_slide['sequence_number'] = s
  		this.slides[index-1] = slide
  		this.slides[index] = second_slide

  	})
  	console.log(this.slides)
  }

  moveDownSlide(slide, index){
  	if(index == this.slides.length - 1){
  		return;
  	}
  	this.http.post("api/v1/pr/design/experiment/slides/swap",{"experiment_id": this.experimentId, "first_slide_id": slide['slide_id'].toString(), "second_slide_id": this.slides[index+1]['slide_id'].toString()},{withCredential: true}).subscribe((data) => {
  		var second_slide = this.slides[index+1]
  		var s = slide['sequence_number']
  		slide['sequence_number'] = second_slide['sequence_number']
  		second_slide['sequence_number'] = s
  		this.slides[index+1] = slide
  		this.slides[index] = second_slide
  	});
  	console.log(this.slides)
  }

  editSlide(slide){
    
  }

  private getSlideDetails(){
  	this.http.get("v1/pr/design/experiment/slides/"+this.experimentId, {withCredential: true}).subscribe((response) => {
    	this.slides = response['slides']
		    this.slides.forEach((slide)=>{
	    		var num = parseInt(slide['sequence_number'])
	    		if(this.lastSequenceNumber < num){
	    			this.lastSequenceNumber = num
	    		}
	    });
    })
  }

}
