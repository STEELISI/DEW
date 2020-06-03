import { Component, OnInit, Input, Inject } from "@angular/core";
import { StateService } from "../../../state-service.service";
import { AuthService } from "src/app/@auth/auth.service";
import { GoogleDriveService } from "src/app/google-drive-service.service";
import { HttpService } from "src/app/http-service.service";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: "experiment-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  providers: [GoogleDriveService]
})
export class InfoComponent implements OnInit {
  @Input() id: Number;
  experiment = {
    userId: this.auth.getCookie("userId"),
    name: "",
    description: "",
    behaviors: [],
    actors: [],
    bindings: [],
    constraints: [],
    driveId: "",
  };
  tokenList = [];

  options: string[] = ["One", "Two", "Three"];

  userAccessList = []
  constructor(
    protected state: StateService,
    protected auth: AuthService,
    public dialog: MatDialog,
    protected http: HttpService,
    protected route: Router,
    protected gdrive: GoogleDriveService
  ) {}
  // gdrive = new GoogleDriveService(this.http, this.auth);
  nameControl = new FormControl();
  experimentControl = 4;
  ngOnInit(): void {
    
    
    if (this.id != undefined && this.id != null && this.id != -1)
      this.experiment["id"] = this.id;
    this.state.getExperimentName().subscribe((name) => {
      this.experiment.name = name;
    });
    this.state.getExperimentDescription().subscribe((description) => {
      this.experiment.description = description;
    });
    this.state.getBehavior().subscribe((behaviorList) => {
      this.experiment.behaviors = behaviorList;
    });
    this.state.getActors().subscribe((actorList) => {
      this.experiment.actors = actorList;
    });
    this.state.getBindings().subscribe((bindingList) => {
      this.experiment.bindings = bindingList;
    });
    this.state.getConstraints().subscribe((constraintsList) => {
      this.experiment.constraints = constraintsList;
    });
    this.state.getDriveId().subscribe((driveId) => {
      this.experiment.driveId = driveId;
    });

    this.state.getExperimentControl().subscribe(data =>{
      this.experimentControl = data
    });
    if(this.experimentControl>3){
    this.loadTokenList();
    this.state.getTokenList().subscribe((data) => {
      if (data != null) {
        this.tokenList = data;
      }
    });
    this.getUserAccessList();
  }

   
  }

  isExperimentDisabled():boolean {
      return this.experimentControl == 2
  }
  getUserAccessList(){
    var params = {
      experiment_id: this.experiment['id'],
      userId: this.experiment.userId
    }
    this.http.post("api/v1/user/getUserAccessList/",params).subscribe(data=>{
      if(data.userList!=undefined && data.userList !=null)
      this.userAccessList = data.userList
      else
      this.userAccessList = []
    })
  }


  setExperimentName() {
    this.state.setExperimentName(this.experiment.name);
  }

  setDriveId(){
    this.state.setDriveId(this.experiment.driveId);
  }

  setExperimentDescription() {
    this.state.setExperimentDescription(this.experiment.description);
  }

  loadTokenList() {
    var input1 = {
      creator_uid: this.auth.getCookie("userId"),
      experiment_id: this.id,
    };
    this.http
      .post("api/v1/token-based-auth/getTokenList", input1)
      .subscribe((data) => {
        this.state.setTokenList(data);
      });
  }

  save() {
    if (
      this.experiment.name != undefined &&
      this.experiment.name != null &&
      this.experiment.name.trim() != ""
    ) {
      if (
        this.experiment.description == undefined ||
        this.experiment.description == null
      )
        this.experiment.description = "";
      
      if (
        this.experiment.driveId == undefined ||
        this.experiment.driveId == null
      )
        this.experiment.driveId = "";

      if (
        this.experiment.behaviors == undefined ||
        this.experiment.behaviors == null
      )
        this.experiment.behaviors = [];

      if (this.experiment.actors == undefined || this.experiment.actors == null)
        this.experiment.actors = [];

      if (
        this.experiment.bindings == undefined ||
        this.experiment.bindings == null
      )
        this.experiment.bindings = [];
      if (
        this.experiment.constraints == undefined ||
        this.experiment.constraints == null
      )
        this.experiment.constraints = [];

        var bindingFLag = false
        if (
          this.experiment.bindings.length!=0
        ){
          this.experiment.bindings.forEach(element=>{
            var list = element.trim().split(" ");

            var key = list[0];

              var value = list.splice(1).join(" ");
              if (value.trim() == '')
                bindingFLag = true
          })
        }
        if (bindingFLag)
        var continueFlag = confirm("Few bindings are missing, Do you still want to continue?")
        else
        continueFlag = !bindingFLag
        if(continueFlag)
      this.http.put("v1/persist/save", this.experiment).subscribe(
        (data) => {
          if (data.saved) {
            alert("Successfully saved!");
            this.route.navigate(["pages/dashboard"]);
          }
        },
        (error) => {
          alert("Error occured. Please try again later");
        }
      );
    } else {
      alert("Please Enter Name to save the experiment.");
      this.nameControl.markAsTouched();
    }
    console.log(this.experiment);
  }

  saveDrive(){
    if (
      this.experiment.name != undefined &&
      this.experiment.name != null &&
      this.experiment.name.trim() != ""
    ) {
      if (
        this.experiment.description == undefined ||
        this.experiment.description == null
      )
        this.experiment.description = "";

      if (
        this.experiment.behaviors == undefined ||
        this.experiment.behaviors == null
      )
        this.experiment.behaviors = [];

      if (this.experiment.actors == undefined || this.experiment.actors == null)
        this.experiment.actors = [];

      if (
        this.experiment.bindings == undefined ||
        this.experiment.bindings == null
      )
        this.experiment.bindings = [];
      if (
        this.experiment.constraints == undefined ||
        this.experiment.constraints == null
      )
        this.experiment.constraints = [];

        var bindingFLag = false
        if (
          this.experiment.bindings.length!=0
        ){
          this.experiment.bindings.forEach(element=>{
            var list = element.trim().split(" ");

            var key = list[0];

              var value = list.splice(1).join(" ");
              if (value.trim() == '')
                bindingFLag = true
          })
        }

        var continueFlag = confirm("Few bindings are missing, Do you still want to continue?")
        
        if(continueFlag){
          console.log(this.experiment.driveId)
          if (this.experiment.driveId == null) {
            this.gdrive.create(this.experiment.name+".dew").subscribe((data) => {
              this.experiment.driveId = data.id
              this.setDriveId()
              this.updateDrive()
            })
          } else {
            this.updateDrive()
            
          }
        }
      
    } else {
      alert("Please Enter Name to save the experiment.");
      this.nameControl.markAsTouched();
    }
    console.log(this.experiment);
    this.save()
  }

  updateDrive() {
    this.gdrive.update(this.experiment.driveId, JSON.stringify(this.experiment)).subscribe(
      (data) => {
        if (data.id) {
          this.http.put("v1/persist/save", this.experiment).subscribe(
            (data) => {
              if (data.saved) {
                alert("Successfully saved!");
                this.route.navigate(["pages/dashboard"]);
              }
            },
            (error) => {
              alert("Error occured. Please try again later");
            }
          );
        }
      },
      (error) => {
        console.error(error)
        alert("Error occured. Please try again later");
      }
    );
  }

  createToken() {
    var params = {
      experiment_id: this.id,
      access_level: "write",
      creator_uid: this.auth.getCookie("userId"),
    };
    this.http
      .post("api/v1/token-based-auth/create", params)
      .subscribe((data) => {
        this.loadTokenList();
      });
  }

  addUserPopUp(){
    let t:string = this.experiment.userId
    console.log(t)
      var dialogRef = this.dialog.open(AddUserPopUp, {
        width: "40%",
        data: t
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result!=undefined)
          this.addUser(result)
      });
    
  }

  addUser(userobj){

    var params = {
      "userId": this.experiment.userId,
      "userHandle": userobj.handle,
      "id": this.experiment["id"],
      "accessLevel":userobj.access
    }

    this.http.post("api/v1/persist/experiment/grantaccess",params).subscribe(data=>{
      console.log(data);
      if(data.error != undefined && data.error != null)
      alert("Error in granting access.")
      else
      this.getUserAccessList()
    },error=>{
      alert("Error in granting access.")
    })
  }
  deleteUser(user){
    var header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body:{
      userId:this.experiment.userId,
      id:this.experiment['id'],
      userHandle:user.handle
    }}
    this.http.delete("v1/persist/experiment/removeaccess",header).subscribe(data=>{
      alert("User is removed.")
      this.getUserAccessList()
    },error=>{
      alert('There is some error while deleting the experiment. Please try again after sometime.');
    })
  }
  
  delete(){
    var header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body:{
      userId:this.experiment.userId,
      id:this.experiment['id']
    }}
    this.http.delete("v1/persist/experiment/delete",header).subscribe(data=>{
      alert("experiment is delete.");
      this.route.navigate(["/pages/dashboard"])
    },error=>{
      alert('There is some error while deleting the experiment. Please try again after sometime.');
    })
  }
}



@Component({
  selector: "add-user",
  templateUrl: "add-user.component.html",
  styleUrls: ["./info.component.scss"],
})
export class AddUserPopUp implements OnInit {
  filteredUserHandle: Observable<string[]>;
  filteredLevels: Observable<string[]>;
  userHandleSelect = new FormControl();
  accessLevelControl = new FormControl();
  UserObj = {
    handle:"",
    access:""
  }
  constructor(
    public dialogRef: MatDialogRef<AddUserPopUp>,
    private http:HttpService,
    @Inject(MAT_DIALOG_DATA) public token: any
  ) {}

  options = [{name:'Read',value:'2'},{name:'Write',value:'3'},{name:'Manage',value:'4'}]
  userOptions = [];
  ngOnInit(): void {
    this.http.get("v1/user/getUserHandles/"+this.token).subscribe(data=>{
      //console.log(data);
      this.userOptions = [];
      if(data.userList != undefined && data.userList != null)
      data.userList.forEach(element => {
        this.userOptions.push({name: element['name'],value:element.handle})
      });
    });
    this.filteredUserHandle = this.userHandleSelect.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value, this.userOptions))
    );
    this.filteredLevels = this.accessLevelControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value, this.options))
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  isAddDisabled():boolean{
    let flag = true

    if (this.UserObj.handle.trim()!='' && this.UserObj.access.trim()!='')
    flag = false
    return flag
  }

  private _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();

    return options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
