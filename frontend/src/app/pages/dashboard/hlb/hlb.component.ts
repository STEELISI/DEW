import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as Quill from "quill";
import EditorService from '../common/editor-service';
import { StateService } from '../common/state-service.service';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from '../common/http-service.service';
Quill.register("modules/counter", EditorService);



@Component({
  selector: 'hlb',
  templateUrl: './hlb.component.html',
  styleUrls: ['./hlb.component.scss']
})
export class HlbComponent implements OnInit{

 
  actorService:EditorService;
  behaviorService:EditorService;
  editorService:EditorService;
  constraintService:EditorService;
  service:any;
  actorTextFilter:String="";
  behaviorTextFilter:String="";
  constraintTextFilter:String="";
  editIndex:number;
  behaviorText:String;
  textBoxId:number;
  behaviorList:any=[];
  actorsList:any=[];
  contraintList:any=[];
  bindingList:any=[];
  suggestionMessage:String;

  bindingMap = new Map<String,any>();
  wordlist:any=[];
inputText:string="";
actors:String ="";
selectedIndex:number=0;
constructor(private http: HttpService,
  public dialog: MatDialog,private stateservice:StateService,private _snackBar: MatSnackBar,private changeDetection: ChangeDetectorRef){}
ngOnInit(): void {


  this.behaviorList = [];
  const instance =this;
  this.stateservice.getBehavior().subscribe(data=>{
    if(data != null){
      console.log(data);
      var text = '';
      data.forEach(element => {
        text+=element+'<br>';
      });
      instance.behaviorText = text;
    }
  });
  this.stateservice.getBindings().subscribe(data=>{
    if(data != null){
      this.behaviorList=[];
      
    data.forEach(element => {
      var list=element.trim().split(' ');
     // console.log(list);
      var key = list[0];
      //console.log(key);

      var value = list.splice(0).join(' ');
      //console.log(value);
      if (!this.bindingMap.has(key)){
        this.bindingMap.set(key,null);
        this.bindingList.push({key:key,value:value});
      }
      
    });
  }
  });
  this.stateservice.getActors().subscribe(data=>{
   // console.log(data);
  if(data != null){
    instance.actorsList=[];
    data.forEach(element => {
      
      this.actorsList.push({text:element});
    });
  }
});




}
  drop(event: CdkDragDrop<string[]>,list:Array<any>) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }
  created(editor,id:number) {
   // console.log(id);
   var instance = this;
    switch(id){
      case 1:
          this.actorService = editor.getModule("counter");
          break;
          case 2:
              this.behaviorService = editor.getModule("counter");
              
              this.behaviorService.isBlur().subscribe(data=>{
                if(data  && instance.behaviorService.isTextChanged())
                this.updateActors();
              })
              this.behaviorService.isEnterPressed().subscribe(flag=>{
                if(flag && instance.behaviorService.isTextChanged()){
                if(this.behaviorService.getText().trim()==="")
                   return;
                  var index = this.behaviorService.getText().length-2;
                  if (this.behaviorService.getText().charAt(index) == '\n')
                      this.updateActors();
                }
              });

              this.behaviorService.isTabPressed().subscribe(flag=>{
                if(flag ){
                  this.insertValue( this.stateservice.getCurrentWord(),true);
                  //this.behaviorService
                }
              });
              this.behaviorService.getSuggestionData().subscribe(data=>{
                if(data!=null){
                  
                    var params = {
                      type: "behavior",
                      suggestion_for: data.currentSentence,
                      behaviors: data.remainingSentences,
                      constraints: [],
                      actors: []
                    }
                    this.behaviorTextFilter = '';
                    this.http.put("v1/hlb/suggestions",params).subscribe(data=>{

                      var list =[];
                      data.suggestions.forEach(element => {
                        list.push({value:element,flag:false});
                      });
                      if(data.suggestion_text.trim()!='')
                      this.suggestionMessage = data.suggestion_text;
                      else
                      this.suggestionMessage =null;
                      this.wordlist = list;
                      this.changeDetection.detectChanges();
                    });
                }

              });

              this.behaviorService.getCurrentWord().subscribe(data=>{
               console.log(data);
                if(data!=null && data.trim()){
                  this.behaviorTextFilter = data;
                }
              });
              break;
              case 3:
                  this.constraintService = editor.getModule("counter");
                  this.constraintService.isBlur().subscribe(data=>{
                    console.log(data);
                  })
                  break;
                  // case 4:
                  // this.editorService = editor.getModule("counter");
                  // break;
    }
   
  }
  updateActors(){
    console.log('inside update Actors');
    if(this.behaviorService.getText().trim()===""){
      this.actorsList=[];
     return;
    }

     var data ={
      ParseType: "bash",
      Scenario: [],
      Constraints: []
    };
    this.behaviorList=[];
    var blist = this.behaviorService.getText().trim().split('\n');
   blist.forEach(element => {

    var text = element.trim();
      if(text!=''){
      data.Scenario.push(text);
      this.behaviorList.push(text);
      }
    });
   
    
     this.http.put("v1/hlb/parse",data).subscribe((data:ParseApiBean)=>{
     
     
      this.extractInfo(data);
      
     });
     
  }
  extractInfo(data:ParseApiBean){
    this.extractScenario(data.parsedScenario);
   
  }

  extractScenario(scenario){
      console.log(scenario);
      this.bindingMap = new Map<String,any>();
      this.actorsList=[];
      this.bindingList=[];
      scenario.forEach(element => {
        
        this.extractActors(element[1]!=null?element[1]:[]);
        this.extractEvents(element[0],element[2],element[3]);
      });

     // this.loadBindings();
     this.changeDetection.detectChanges();
      
  }

  isEmpty(binding):boolean{
    if(binding.value == undefined)
        return true;
    return binding.value.trim() =='';
  }
  loadBindings(){
    this.bindingMap.forEach((value,key) => {
      this.bindingList.push(key);
    });
  }
  extractEvents(triggers,actions,emitters){
      if(triggers!=null)
      triggers.forEach(element => {
        if (!this.bindingMap.has(element)){
              this.bindingMap.set(element,null);
              this.bindingList.push({key:element,value:""});
        }
      });
      if(actions!=null)
      actions.forEach(element => {
        if (!this.bindingMap.has(element)){
          this.bindingMap.set(element,null);
          this.bindingList.push({key:element,value:""});
    }
      });
      if(emitters!=null)
      emitters.forEach(element => {
        if (!this.bindingMap.has(element)){
          this.bindingMap.set(element,null);
          this.bindingList.push({key:element,value:""});
    }
      });
    
     // console.log(this.bindingMap);
  }
  logChangeBehavior(event){
    if(this.behaviorService.getText().trim()==="")
      return;

   
    // var index = this.behaviorService.getText().length-2;
    // if (this.behaviorService.getText().charAt(index) == '\n')
    //     this.updateActors();
}
logChangeConstraints(event){
  if(this.constraintService.getText().trim()==="")
    return;
  console.log(this.constraintService.getText().charAt(this.constraintService.getText().length-1))
}
  insertValue(text: any,flag:boolean=false) {
    //  var quill =  Quill.getModule('#t');
    this.service.insertVaue(text,flag,this.behaviorTextFilter);
  }

  selectTextBox(id:number){
    this.textBoxId = id;
    switch(id){
      case 1:
          this.service =  this.actorService;
          break;
          case 2:
              this.service =  this.behaviorService ;
              break;
              case 3:
                  this.service =   this.constraintService 
                  break;
                  case 4:
                  this.service =   this.editorService; 
                  break;
    }
  }

  isEnable(id:number):Boolean{ return this.textBoxId==id};



  

  extractActors(data:Array<any>){
   
    data.forEach(element => {
      
        //console.log(element);
        this.insertActor(element);
     
    });
  }

  insertActor(actor:String){
    var t = this.actorsList.find(function(element) {
      return element.text === actor;
  });

 // console.log(t);
     if(t == undefined)
     this.actorsList.push({text:actor});
  }
  clear(){
    console.log(this.behaviorText);
    this.service.clear();
    this.behaviorText="";
  }

  


  selectedTab(index:number){
    this.selectedIndex=index;
  }


  addBindings(){
    console.log(this.bindingList);

    var dialogRef = this.dialog.open(BindingPopUp, {
      width: '70%',
      data: this.bindingList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.generateNs();
    });
  }
  generateNs(){

    var data = {
      actors: [],
      behaviors: [],
      constraints: [],
      bindings: []
    };

    if(this.actorsList.length ==0)
        return;
    
        if(this.behaviorList.length ==0)
        return;
    this.actorsList.forEach(element => {
      data.actors.push(element.text);
    });
    var flag=false;
    this.behaviorList.forEach(element => {
      data.behaviors.push(element);
    });
    this.contraintList.forEach(element => {
      data.constraints.push(element.text);
    });
    this.bindingList.forEach(element => {
      if(element.value==null || element.value.trim()==''){
      flag=true;
      return;
      }
      data.bindings.push(element.key+" "+element.value);
    });

    if (flag)
    return;
    this.stateservice.enableLoader();
    this.http
      .put("v1/hlb/generateNs", data, null)
      .subscribe(data => {
        console.log(data);
        this.stateservice.disableLoader();
        this.downLoadFile(data.script);
        this._snackBar.open("Successfully Downloaded.", "close", {
          duration: 2000,
        });
       // this.stateservice.setBindings(data.Bindings);
      },error=>{
        this.stateservice.disableLoader();
        this._snackBar.open(error, "close", {
          duration: 2000,
        });
      });
 
  }

  downLoadFile(data: any) {
    var blob = new Blob([data], { type: "text/plain"});
    console.log(blob);
   // var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var fileName = "experiment.txt";
    if ('msSaveOrOpenBlob' in navigator) {

      navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
      var downloadLink = document.createElement('a');
      downloadLink.download = fileName;
      downloadLink.innerHTML = 'Download File';
     // if ('webkitURL' in window) {
          // Chrome allows the link to be clicked
          // without actually adding it to the DOM.
        //  downloadLink.href = window.webkitURL.createObjectURL(blob);
     // } else {
          // Firefox requires the link to be added to the DOM
          // before it can be clicked.
          downloadLink.href = window.URL.createObjectURL(blob);
          //downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
    //  }
  
      downloadLink.click();
  }
}
}

@Component({
  selector: 'hlb-binding',
  templateUrl: 'hlb-binding.component.html',
  styleUrls: ['./hlb.component.scss']
})
export class BindingPopUp {

  constructor(
    public dialogRef: MatDialogRef<BindingPopUp>,
    @Inject(MAT_DIALOG_DATA) public bindingList: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}