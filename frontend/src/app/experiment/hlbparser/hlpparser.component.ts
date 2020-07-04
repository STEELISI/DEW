import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/@auth/auth.service";
import { StateService } from "../../state-service.service";
import { HttpService } from "src/app/http-service.service";

@Component({
  selector: "hlbparser",
  templateUrl: "./hlpparser.component.html",
  styleUrls: ["./hlpparser.component.scss"],
})
export class HLBParserComponent implements OnInit {
  viewFlag:boolean=false;
  viewID:Number=1;
  experimentId: Number = -1;
  experimentControl:Number = 4;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    protected http: HttpService,
    private state: StateService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"] != "") {
        var input = {
          id: params["id"],
        };

        
        this.experimentId = params["id"];
        this.state.enableLoader();
        this.http
          .post("api/v1/pr/persist/experiment/control", input,{withCredential:true})
          .subscribe((controlData) => {
            if(controlData.code!= undefined && controlData.code!=null){
            this.state.setExperimentControl(controlData.code);
            this.experimentControl = controlData.code;
            console.log(this.experimentControl)
        this.http
          .post("api/v1/pr/persist/getExperimentById", input,{withCredential:true})
          .subscribe((data) => {
            this.enableView();
            this.state.setActors(data.actors);
            this.state.setExperimentName(data.name);
            this.state.setExperimentDescription(data.description);
            this.state.setBehavior(data.behaviors);
            this.state.setBindings(data.bindings);
            this.state.setConstraints(data.constraints);
            this.state.setDriveId(data.driveId);
           this.state.disableLoader();
          });
        }else{
          alert("Don't have control for this experiment");
          this.router.navigate(['dashboard']);
        }
        });
     
         
        return "";
      }else{
        this.enableView();
      }
    });

  }

  enableView(){ 
  this.viewFlag = true;
  }
  show(viewId){
      this.viewID = viewId;
  }
  isViewEnable():boolean{return this.viewFlag;}
}
