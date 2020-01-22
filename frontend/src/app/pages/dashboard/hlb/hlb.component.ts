import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as Quill from "quill";
import EditorService from '../common/editor-service';
import { StateService } from '../common/state-service.service';
import { MatSnackBar } from '@angular/material';
import { saveAs } from 'file-saver';
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
  hlbOptions:number=1;
  isExpandDisabled:boolean=true;
  editorService:EditorService;
  constraintService:EditorService;
  service:any;
  activeExpandIndex:number = 1;
  editMode:boolean=false;
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
  localWordList:any;
  wordlist:any=[{
    value:"Hello"
  }
,{
  value:"World"
},{
  value:"server"
},{
  value:"router"
},{
  value:"actors"
}
];
inputText:string="";
actors:String ="";
selectedIndex:number=0;
constructor(private http: HttpService,private stateservice:StateService,private _snackBar: MatSnackBar){}
ngOnInit(): void {


  this.behaviorList = [];
  this.stateservice.getBehavior().subscribe(data=>{
      console.log(data);
    if(data != null){
      data.split("\n").forEach(element => {
        if(element.trim()!='')
        this.behaviorList.push({text:element});
      });
    }
  });

  this.stateservice.getActors().subscribe(data=>{
    console.log(data);
  if(data != null){
    data.forEach(element => {
      this.actors+=element+"\n";
      this.actorsList.push({text:element});
    });
  }
});

  this.stateservice.getBindings().subscribe(data=>{
    
  });
}
  drop(event: CdkDragDrop<string[]>,list:Array<any>) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }
  created(editor,id:number) {
    console.log(id);
    switch(id){
      case 1:
          this.actorService = editor.getModule("counter");
          break;
          case 2:
              this.behaviorService = editor.getModule("counter");
              break;
              case 3:
                  this.constraintService = editor.getModule("counter");
                  break;
                  case 4:
                  this.editorService = editor.getModule("counter");
                  break;
    }
   
  }

  isExpandable(option:number):boolean{
    return option ==this.activeExpandIndex;
  }
  expand(option:number){
    this.activeExpandIndex=option;
    this.isExpandDisabled=false;
  }
  collapse(option:number){
    this.isExpandDisabled=true;
  }
  logChange(event,id:number){
    if(this.service.getText().trim()===""){
      this.clear();
      return;
    }
var text = this.service.getText().split(/\s/);
switch(id){
  case 1:
      this.actorTextFilter=text[text.length-2];
      break;
      case 2:
         this.behaviorTextFilter=text[text.length-2];
          break;
          case 3:
              this.constraintTextFilter=text[text.length-2];
              break;
}

//console.log(this.behaviorTextFilter);
  }
  insertValue(text: string) {
    //  var quill =  Quill.getModule('#t');
    this.service.insertVaue(text);
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

  delete(index:number,radioOption:number){
      var text="";
    switch(radioOption){
      case 1:
        text = this.actorsList[index].text;
        this.actorsList.splice(index, 1);
        break;
        case 2:
          text = this.behaviorList[index].text;

          this.behaviorList.splice(index, 1);
        break;
        case 3:
          text = this.contraintList[index].text;

          this.contraintList.splice(index, 1);
        break;
        case 4:
          text = this.bindingList[index].text;

          this.bindingList.splice(index, 1);
        break;

     }

    this._snackBar.open(text+" is deleted.", "close", {
      duration: 2000,
    });
 
  }

  add(){
    if(this.editorService.getText().trim()==="")
     return;

     var data ={
      ParseType: "bash",
      Scenario: [],
      Constraints: []
    };
     switch(this.hlbOptions){
      case 1:
        this.actorsList.push({text:this.editorService.getText().trim()});
        break;
        case 2:
        this.behaviorList.push({text:this.editorService.getText().trim()});
        data.Scenario.push(this.editorService.getText().trim());
        break;
        case 3:
        data.Constraints.push(this.editorService.getText().trim());
        this.contraintList.push({text:this.editorService.getText().trim()});
        break;
        case 4:
        this.bindingList.push({text:this.editorService.getText().trim()});
        break;

     }
     this.http.put("v1/hlb/parse",data).subscribe(data=>{
      //console.log(data);
      this.extractActors(data.parsedScenario.length!=0?data.parsedScenario:[]);
     });
     this.clear();

    // console.log("inside add");
    // if(this.behaviorService.getText().trim()==="")
    //   return;
    // this.behaviorList.push({text:this.behaviorService.getText()})
    // //this.behaviorText="";
    // this.updateWordList();
    // this.clear();
 
  }

  extractActors(data:Array<any>){
    data.forEach(element => {
      element[1].forEach(element => {
        //console.log(element);
        this.insertActor(element);
      });
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

  edit(index:number,radioValue:number){
   // console.log(this.selectedIndex);
    this.hlbOptions=radioValue;
    this.editMode=true;
    this.editIndex=index;
   this.selectedTab(1);
   switch(radioValue){
     case 1:
       this.inputText=this.actorsList[index].text;
       break;
       case 2:
        this.inputText=this.behaviorList[index].text;
        break;

         case 3:
          this.inputText=this.contraintList[index].text;
          break;

           case 4:
            this.inputText=this.bindingList[index].text;
            break;


   }
   // this.behaviorText = this.behaviorList[index].text;
  }
  update(){
    var data ={
      ParseType: "bash",
      Scenario: [],
      Constraints: []
    };
    switch(this.hlbOptions){
      case 1:
        this.actorsList[ this.editIndex].text = this.editorService.getText().trim();
        break;
        case 2:
          data.Scenario.push(this.editorService.getText().trim());
          this.behaviorList[ this.editIndex].text = this.editorService.getText().trim();
         break;
 
          case 3:
            data.Constraints.push(this.editorService.getText().trim());
            this.contraintList[ this.editIndex].text = this.editorService.getText().trim();
           break;
 
            case 4:
              this.bindingList[ this.editIndex].text = this.editorService.getText().trim();
             break;
 
 
    }

    this.http.put("v1/hlb/parse",data).subscribe(data=>{
      //console.log(data);
      this.extractActors(data.parsedScenario.length!=0?data.parsedScenario:[]);
     });
   
    this.editMode=false;
    this.clear();
   // this.updateWordList();
  }
  isEditModeEnable():boolean{
    return this.editMode;
  }
  Cancel(){
    this.editMode=false;
    this.clear();
  }

  selectedTab(index:number){
    this.selectedIndex=index;
  }

  updateWordList(){
    this.localWordList=[];
    var dict = new Map;
    this.behaviorList.forEach(element => {
      //console.log(element);
    var wordlist = element.text.trim().split(/\s/);
    wordlist.forEach(element => {
      if(element.trim()!==""){
        if(!dict.has(element.trim())){
          this.localWordList.push({value:element.trim()});
          dict.set(element.trim(),true);
        }
      }
    });
  
  });
  this.wordlist = this.wordlist.concat(this.localWordList);
  console.log(this.localWordList);
  }

  generateNs(){

    var data = {
      actors: [],
      behaviors: [],
      constraints: [],
      bindings: []
    };

    this.actorsList.forEach(element => {
      data.actors.push(element.text);
    });

    this.behaviorList.forEach(element => {
      data.behaviors.push(element.text);
    });
    this.contraintList.forEach(element => {
      data.constraints.push(element.text);
    });
    this.bindingList.forEach(element => {
      data.bindings.push(element.text);
    });
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

