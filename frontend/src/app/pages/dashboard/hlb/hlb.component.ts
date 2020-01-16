import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as Quill from "quill";
import EditorService from '../common/editor-service';
import { StateService } from '../common/state-service.service';
import { MatSnackBar } from '@angular/material';

Quill.register("modules/counter", EditorService);
@Component({
  selector: 'hlb',
  templateUrl: './hlb.component.html',
  styleUrls: ['./hlb.component.scss']
})
export class HlbComponent implements OnInit{

 
  actorService:EditorService;
  behaviorService:EditorService;
  constraintService:EditorService;
  service:any;
  editMode:boolean=false;
  actorTextFilter:String="";
  behaviorTextFilter:String="";
  constraintTextFilter:String="";
  editIndex:number;
  behaviorText:String;
  textBoxId:number;
  behaviorList:any=[];
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

constructor(private stateservice:StateService,private _snackBar: MatSnackBar){}
ngOnInit(): void {

  this.behaviorList = [];
  this.stateservice.getBehavior().subscribe(data=>{
      console.log(data);
    if(data != null){
      data.forEach(element => {
        this.behaviorList.push({text:element});
      });
    }
  });

  this.stateservice.getBindings().subscribe(data=>{
    
  });
}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.behaviorList, event.previousIndex, event.currentIndex);
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
    }
   
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
    }
  }

  isEnable(id:number):Boolean{ return this.textBoxId==id};

  delete(index:number){
    this._snackBar.open(this.behaviorList[index].text+" is deleted.", "close", {
      duration: 2000,
    });
    this.behaviorList.splice(index, 1);
  }

  add(){
    console.log("inside add");
    if(this.behaviorService.getText().trim()==="")
      return;
    this.behaviorList.push({text:this.behaviorService.getText()})
    //this.behaviorText="";
    this.updateWordList();
    this.clear();
 
  }

  clear(){
    console.log(this.behaviorText);
    this.service.clear();
    this.behaviorText="";
  }

  edit(index:number){
    this.editMode=true;
    this.editIndex=index;
    this.behaviorText = this.behaviorList[index].text;
  }
  update(){
    this.behaviorList[ this.editIndex].text = this.behaviorService.getText();
    this.editMode=false;
    this.clear();
    this.updateWordList();
  }
  isEditModeEnable():boolean{
    return this.editMode;
  }
  Cancel(){
    this.editMode=false;
    this.clear();
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
}

