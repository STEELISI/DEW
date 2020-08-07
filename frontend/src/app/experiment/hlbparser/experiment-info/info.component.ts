import { Component, OnInit, Input, Inject, ChangeDetectorRef, Output, EventEmitter } from "@angular/core";
import { StateService } from "../../../state-service.service";
import { AuthService } from "src/app/@auth/auth.service";
import { GoogleDriveService } from "src/app/google-drive-service.service";
import { HttpService } from "src/app/http-service.service";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: "experiment-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  providers: [GoogleDriveService]
})
export class InfoComponent implements OnInit {
  @Input() id: Number;
  @Output() viewId: EventEmitter<any> = new EventEmitter();
  experiment = {
    name: "Untitled",
    description: "",
    behaviors: [],
    actors: [],
    bindings: [],
    constraints: [],
    driveId: "",
  };
  tokenList = [];
  viewid = 1;
  options: string[] = ["One", "Two", "Three"];

  constructor(
    protected state: StateService,
    protected auth: AuthService,
    public dialog: MatDialog,
    protected http: HttpService,
    protected route: Router,
    protected gdrive: GoogleDriveService,
    private _snackBar: MatSnackBar
  ) {}
  // gdrive = new GoogleDriveService(this.http, this.auth);
  nameControl = new FormControl();
  experimentControl = 4;

    show(id){
      this.viewid = id;
      this.viewId.emit(id);
    }
  titleChanged(){
    if (this.experiment.name.length > 100){
      this.experiment.name = this.experiment.name.substr(0,100)
      this._snackBar.open("Only 100 characters allowed", "close", {
        duration: 2000,
      });
      return false;
    }
    
  }

  checkDefault(){

    if(this.experiment.name.trim() == ''){
 
      this.experiment.name ="Untitled";
     } 
  }

  ngOnInit(): void {
    
    
    if (this.id != undefined && this.id != null && this.id != -1)
      this.experiment["id"] = this.id;
    this.state.getExperimentName().subscribe((name) => {
      if(name != null && name != undefined && name.trim()!='')
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
    
  }

   
  }

  isExperimentDisabled():boolean {
      return this.experimentControl == 2
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
      experiment_id: this.id,
    };
    this.http
      .post("api/v1/pr/token-based-auth/getTokenList", input1,{withCredential:true})
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
      this.http.put("v1/pr/persist/save", this.experiment,{withCredential:true}).subscribe(
        (data) => {
          if (data.saved) {
            this._snackBar.open("Successfully saved.", "close", {
              duration: 2000,
            });
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
    this.state.enableLoader()
    this.auth.authorizeGoogleDrive(this.id).then(() => {
      this.state.disableLoader()
      if(
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

        var data = {...this.experiment}
        data['token'] = this.auth.getCookie("drive_token")
        data['create_new_file'] = true

        if (bindingFLag)
        var continueFlag = confirm("Few bindings are missing, Do you still want to continue?")
        else
        continueFlag = !bindingFLag
        if(continueFlag)
      this.http.put("v1/pr/persist/save_drive", data,{withCredential:true}).subscribe(
        (data) => {
          if (data.saved) {
            alert("Successfully saved!");
            this.route.navigate(["dashboard"]);
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
    })}

  updateDrive() {
    this.gdrive.update(this.experiment.driveId, JSON.stringify(this.experiment)).subscribe(
      (data) => {
        if (data.id) {
          this.http.put("v1/pr/persist/save", this.experiment,{withCredential:true}).subscribe(
            (data) => {
              if (data.saved) {
                alert("Successfully saved!");
                this.route.navigate(["dashboard"]);
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
      access_level: "write"
    };
    this.http
      .post("api/v1/pr/token-based-auth/create", params,{withCredential:true})
      .subscribe((data) => {
        this.loadTokenList();
      });
  }

  addUserPopUp(){
    let t:string = this.auth.getCookie('userId')
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


  listUserPopUp(){

      var dialogRef = this.dialog.open(UserListPopUp, {
        width: "60%",
        data: this.experiment['id']
      });
    
  }

  addUser(userobj){

    var params = {
      "userHandle": userobj.handle,
      "id": this.experiment["id"],
      "accessLevel":userobj.access
    }

    this.http.post("api/v1/pr/persist/experiment/grantaccess",params,{withCredential:true}).subscribe(data=>{
      console.log(data);
      if(data.error != undefined && data.error != null)
      alert("Error in granting access.")
    },error=>{
      alert("Error in granting access.")
    })
  }

  
  delete(){
    var header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body:{
      id:this.experiment['id']
    }}
    this.http.delete("v1/pr/persist/experiment/delete",header).subscribe(data=>{
      alert("experiment is delete.");
      this.route.navigate(["/dashboard"])
    },error=>{
      alert('There is some error while deleting the experiment. Please try again after sometime.');
    })
  }

  nlpInput(){

   
      var dialogRef = this.dialog.open(NLPPopUp, {
        width: "40%"
      });
  
  }

  uploadInput(){

   
    var dialogRef = this.dialog.open(UploadPopUp, {
      width: "40%"
    });
}

  closeExperiment(){
    this.route.navigate(['dashboard'])
  }

  newExperiment(){
    this.route.navigate(['p/e/c'])
  }


  addBindings() {
    //console.log(this.bindingList);

    var dialogRef = this.dialog.open(NSFilePopUp, {
      width: "70%",
      data: this.experiment.bindings,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log('The dialog was closed');
      this.generateNs();
    });
  }
  generateNs() {
    var data = {
      actors: this.experiment.actors,
      behaviors: this.experiment.behaviors,
      constraints: this.experiment.constraints,
      bindings: this.experiment.bindings,
    };
    var flag = false;
    this.experiment.behaviors.forEach((element) => {
      if (element == null || element.trim() == "") {
        flag = true;
        return;
      }
    });

    if (flag) return;
    this.http.put("v1/pr/hlb/generateNs", data, {withCredential:true}).subscribe(
      (data) => {

        this.downLoadFile(data.script);
        this._snackBar.open("Successfully Downloaded.", "close", {
          duration: 2000,
        });
        // this.stateservice.setBindings(data.Bindings);
      },
      (error) => {
        this._snackBar.open(error, "close", {
          duration: 2000,
        });
      }
    );
  }

  downLoadFile(data: any) {
    var blob = new Blob([data], { type: "text/plain" });
    //console.log(blob);
    // var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var fileName = "experiment.txt";
    if ("msSaveOrOpenBlob" in navigator) {
      navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      var downloadLink = document.createElement("a");
      downloadLink.download = fileName;
      downloadLink.innerHTML = "Download File";
      // if ('webkitURL' in window) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      //  downloadLink.href = window.webkitURL.createObjectURL(blob);
      // } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(blob);
      //downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      //  }

      downloadLink.click();
    }
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
    this.http.get("v1/p/user/getUserHandles/"+this.token,{withCredential:true}).subscribe(data=>{
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


@Component({
  selector: "nlp-popup",
  templateUrl: "nlp-popup.component.html",
  styleUrls: ["./info.component.scss"],
})
export class NLPPopUp implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<NLPPopUp>
  ) {}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  
}


@Component({
  selector: "upload-popup",
  templateUrl: "upload-popup.component.html",
  styleUrls: ["./info.component.scss"],
})
export class UploadPopUp implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<UploadPopUp>
  ) {}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  } 
}

@Component({
  selector: "hlb1-binding",
  templateUrl: "hlb-binding.component.html",
  styleUrls: ["./info.component.scss"],
})
export class NSFilePopUp {
  constructor(
    public dialogRef: MatDialogRef<NSFilePopUp>,
    @Inject(MAT_DIALOG_DATA) public bindingList: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "user-list",
  templateUrl: "user-list.component.html",
  styleUrls: ["./info.component.scss"],
})
export class UserListPopUp implements OnInit {
  userAccessList:[];
  constructor(
    public dialogRef: MatDialogRef<UserListPopUp>,
    protected http: HttpService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public experimentID: any
  ) {}
  ngOnInit(): void {
    this.getUserAccessList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getUserAccessList(){
    var params = {
      experiment_id: this.experimentID
    }
    this.http.post("api/v1/pr/persist/getUserAccessList/",params,{withCredential:true}).subscribe(data=>{
      if(data.userList!=undefined && data.userList !=null)
      this.userAccessList = data.userList
      else
      this.userAccessList = []
    })
  }

  deleteUser(user){
    var header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body:{
      id:this.experimentID,
      userHandle:user.handle
    }}
    this.http.delete("v1/pr/persist/experiment/removeaccess",header).subscribe(data=>{
    
      this._snackBar.open("User is removed.", "close", {
        duration: 2000,
      });
      this.getUserAccessList();
    },error=>{
      this._snackBar.open("Error in removing User.", "close", {
        duration: 2000,
      });
    })
  }
}

