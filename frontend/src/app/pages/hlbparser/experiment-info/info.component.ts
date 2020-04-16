import { Component, OnInit, Input } from "@angular/core";
import { StateService } from "../common/state-service.service";
import { AuthService } from 'src/app/@auth/auth.service';
import { HttpService } from 'src/app/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: "experiment-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit {

  @Input() id:Number;
  experiment = {
    userId: this.auth.getCookie("userId"),
    name: "",
    description: "",
    behaviors:[],
    actors:[],
    bindings:[],
    constraints:[]
  };
  tokenList=[];
  constructor(protected state: StateService,protected auth:AuthService,protected http:HttpService,protected route:Router) {}
  ngOnInit(): void {
    if( this.id!=undefined &&  this.id!=null &&  this.id!=-1)
    this.experiment['id'] = this.id;
    this.state.getExperimentName().subscribe(name => {
      this.experiment.name = name;
    });
    this.state.getExperimentDescription().subscribe(description => {
      this.experiment.description = description;
    });
    this.state.getBehavior().subscribe(behaviorList=>{
      this.experiment.behaviors=behaviorList;
    });
    this.state.getActors().subscribe(actorList=>{
      this.experiment.actors=actorList;
    });
    this.state.getBindings().subscribe(bindingList=>{
      this.experiment.bindings=bindingList;
    });
    this.state.getConstraints().subscribe(constraintsList=>{
      this.experiment.constraints=constraintsList;
    });
  }

  setExperimentName() {
    this.state.setExperimentName(this.experiment.name);
  }
  setExperimentDescription() {
    this.state.setExperimentDescription(this.experiment.description);
  }

  save(){
      
      this.http.put("v1/persist/save",this.experiment).subscribe(data=>{
        if(data.saved){
          alert("Successfully saved!");
          this.route.navigate(["pages/dashboard"]);
        }
      });
    console.log(this.experiment)
  }
}
