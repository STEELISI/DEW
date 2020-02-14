import * as Quill from "quill";
import { Observable, BehaviorSubject } from "rxjs";
//var Keyboard = Quill.import('modules/keyboard'); 
export interface QuillInstance {
  on: any;
  keyboard:any;
  getText: any;
  getSelection: any;
  setText: any;
  insertText: any;
  hasFocus:any;deleteText:any;
}

export default class EditorService {
  private textData = new BehaviorSubject<any>("");
  private onBlur=new BehaviorSubject<any>(false);
  private isEnterPress=new BehaviorSubject<any>(false);
  private onBlurFlag=false;
  private currentword=new BehaviorSubject<any>('');
  private currentsentence=new BehaviorSubject<any>(null);
  private isTextChange:boolean=false;
  getUpdatedValue(): Observable<any> {
    return this.textData.asObservable();
  }

  getCurrentWord(): Observable<any> {
    return this.currentword.asObservable();
  }

  getSuggestionData(): Observable<any> {
    return this.currentsentence.asObservable();
  }
  isEnterPressed(): Observable<any> {
    return this.isEnterPress.asObservable();
  }
  setUpdatedValue(Data: String) {
    this.textData.next(Data);
  }
  quill: QuillInstance;
  index: number = 0;
  range;
  any;
  constructor(quill) {
    this.quill = quill;
    const index = 1;
    var instance = this;
    this.quill.on("selection-change", function(range, oldRange, source) {
      if (range) {
        instance.index = range.index;
        instance.range = range.length;
        if(instance.onBlurFlag){
        instance.onBlur.next(false);
        instance.onBlurFlag  =false;
      }
      }else{
        instance.onBlurFlag  =true;
        instance.onBlur.next(true);
      }
    });
    this.quill.on("text-change", function(delta, oldDelta, source) {
       //console.log(delta);
       var position =0;
       instance.isTextChange=true;
        if(delta.ops!=undefined){
          delta.ops.forEach(element => {
            if(element.retain!=undefined)
              position = element.retain;
            if(element.insert!=undefined){
              position+=element.insert.length;
              if(element.insert == '\n')
                  instance.pressedEntered();
            }
          });
        }
        //console.log(position);
        var index = instance.quill.getText().length-1;
        var text = instance.quill.getText().substr(0,index);
      //  console.log(text);
        //console.log();
        instance.currentSentence( text,position);
        instance.currentWord(text,position);
      instance.index = position;
    });
  
  }
  currentWord(text,position){
   var word = this.getWordAt(text,position);
   if(word.trim() !=''){
     this.currentword.next(word);
   }
  }

   currentSentence(text,position){
   var sentence = this.getSentenceTill(text,position);
   var remainingSentences = this.getRemainingSentences(text,position);
   //console.log(remainingSentences);
   var obj ={
     currentSentence:sentence,
     remainingSentences:remainingSentences
   }
    if(sentence.length==0 || sentence.charAt(sentence.length-1)==" ")
     this.currentsentence.next(obj);
   
  }
  getRemainingSentences (str, pos){

    str = String(str);
    pos = Number(pos) >>> 0;
    var left= str.slice(0, pos).search(/\n.*$/);
    var list = [];
    var temp;
    //console.log(left);
    if(left>0){
      temp = str.slice(0, left).split("\n");
      temp.forEach(element => {
          if(element.trim()!='')
              list.push(element);
      });
    }


    temp= str.slice(left+1).split("\n");
    temp.splice(0,1);
   
    temp.forEach(element => {
      if(element.trim()!='')
          list.push(element);
  });
  return list;
  }

  getWordAt (str, pos) {

    str = String(str);
    pos = Number(pos) >>> 0; 
    var left = str.slice(0, pos).search(/\S+$/),
        right = str.slice(pos).search(/\s/);
       
    if (right < 0) {
        return str.slice(left);
    }
    return str.slice(left, right + pos);

}

getSentenceTill (str, pos) {

  str = String(str);
  pos = Number(pos) >>> 0;
 
  var t = str.slice(0, pos).search(/\n.*$/);
  
  var right = str.slice(pos).search(/\s/);
    
      if (right < 0) {
        return str.slice(t+1);
    }
   
      return str.slice(t+1,right+ pos);
  

}
getSentenceAt (str, pos) {

  str = String(str);
  pos = Number(pos) >>> 0;
  var left= str.slice(0, pos).search(/\n.+$/);
  return str.slice(left+1).split("\n")[0];
  
}
  isTextChanged():boolean{
    var flag = this.isTextChange;
    this.resetTextChangeFlag();
    return flag;
  }
  resetTextChangeFlag(){
    this.isTextChange = false;
  }
  pressedEntered(){
      this.isEnterPress.next(true);
  }
  insertVaue(text: String) {
    var word = this.getWordAt(String(this.quill.getText()),this.index);
    if (word.trim()=='')
     this.quill.insertText(this.index, text + " ");
     else
    this.replaceText(this.quill.getText(),text,word);
  }

  replaceText(str,text,word){
    str = String(str);
    var pos = Number(this.index) >>> 0; 
    var left = str.slice(0, pos).search(/\S+$/);
    this.quill.deleteText(left,word.length);
    let t: string = this.quill.insertText(left, text + " ");
    this.index = left+text.length+1;
  }

  getText(): String {
    return this.quill.getText();
  }

  clear() {
    this.quill.setText("");
  }
  isBlur():Observable<any>{
    return this.onBlur.asObservable();
  }
}
