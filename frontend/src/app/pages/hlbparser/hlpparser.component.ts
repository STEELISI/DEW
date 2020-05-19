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
  menuList: any =  [
    {
      name: "Information",
      id: 1,
      html: "<experiment-info></experiment-info>",
    },
    {
      name: "HLB",
      id: 2,
      html: "<hlb></hlb>",
    }]
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
          userId: this.auth.getCookie("userId"),
          id: params["id"],
        };

        
        this.experimentId = params["id"];
        this.state.enableLoader();
        this.http
          .post("api/v1/persist/experiment/control", input)
          .subscribe((controlData) => {
            if(controlData.code!= undefined && controlData.code!=null){
            this.state.setExperimentControl(controlData.code);
            this.experimentControl = controlData.code;
            console.log(this.experimentControl)
        this.http
          .post("api/v1/persist/getExperimentById", input)
          .subscribe((data) => {
            this.enableView();
            this.state.setActors(data.actors);
            this.state.setExperimentName(data.name);
            this.state.setExperimentDescription(data.description);
            this.state.setBehavior(data.behaviors);
            this.state.setBindings(data.bindings);
            this.state.setConstraints(data.constraints);
           this.state.disableLoader();
          });
        }else{
          alert("Don't have control for this experiment");
          this.router.navigate(['pages/dashboard']);
        }
        });
     
         
        return "";
      }else{
        this.enableView();
      }
    });

  }

  enableView(){
   
    let menu =  [{
        name: "NLP",
        id: 3,
        html: "<nlp></nlp>",
      },
      {
        name: "Behavior Dependency Graph",
        id: 4,
        html: "<p>In Progress.....</p>",
      },
      {
        name: "Upload",
        id: 5,
        html: "<upload></upload>",
      },
    ];
    if(this.experimentControl >2){
      menu.forEach(item=>{
        this.menuList.push(item);
      });
      
    }
   
    
  this.viewFlag = true;
  }

  isViewEnable():boolean{return this.viewFlag;}
}
