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
  hasFocus:any;
}

export default class EditorService {
  private textData = new BehaviorSubject<any>("");
  private onBlur=new BehaviorSubject<any>(false);
  private onBlurFlag=false;
  getUpdatedValue(): Observable<any> {
    return this.textData.asObservable();
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
      // console.log(delta);
      instance.index = instance.quill.getText().length - 1;
    });
  
  }

  insertVaue(text: String) {
    let t: string = this.quill.insertText(this.index, " " + text + " ");
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
