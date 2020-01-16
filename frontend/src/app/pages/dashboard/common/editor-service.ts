import "quill";
import { Observable, BehaviorSubject } from "rxjs";

export interface QuillInstance {
  on: any;
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
}
