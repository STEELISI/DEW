import * as Quill from "quill";
import { Observable, BehaviorSubject } from "rxjs";
var Keyboard = Quill.import('modules/keyboard'); 
export interface QuillInstance {
  on: any;
  keyboard:any;
  getText: any;
  getSelection: any;
  setText: any;
  insertText: any;
}

export default class EditorService {
  private textData = new BehaviorSubject<any>("");

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
      }
    });
    this.quill.on("text-change", function(delta, oldDelta, source) {
    //  console.log(delta);
      instance.index = instance.quill.getText().length - 1;
    });
   // console.log(Keyboard);
    this.quill.keyboard.addBinding({ key: Keyboard.keys.ENTER , shiftKey: true }, function(range,context) {
        console.log("inside binding");
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
}
