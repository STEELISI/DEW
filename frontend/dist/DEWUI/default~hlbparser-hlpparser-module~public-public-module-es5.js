(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~hlbparser-hlpparser-module~public-public-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/dependency-graph/dependency-graph.component.html":
  /*!*************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/dependency-graph/dependency-graph.component.html ***!
    \*************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserDependencyGraphDependencyGraphComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"row\">\n  <div class=\"col-md-12\" style=\"background-color: grey;\"> \n  <ngx-graph\n  class=\"chart-container\"\n  [view]=\"[500, 700]\"\n  [links]=\"[\n    {\n      id: 'a',\n      source: 'first',\n      target: 'second',\n      label: 'is parent of'\n    },{\n      id: 'b',\n      source: 'first',\n      target: 'third',\n      label: 'is parent of'\n    },{\n      id: 'c',\n      source: 'fourth',\n      target: 'first',\n      label: 'is parent of'\n    },{\n      id: 'd',\n      source: 'fourth',\n      target: 'third',\n      label: 'is parent of'\n    }\n    ,{\n      id: 'e',\n      source: 'fourth',\n      target: 'second',\n      label: 'is parent of'\n    }\n    ,{\n      id: 'f',\n      source: 'fourth',\n      target: 'fifth',\n      label: 'is parent of'\n    }\n  ]\"\n  [nodes]=\"[\n    {\n      id: 'first',\n      label: 'A'\n    }, {\n      id: 'second',\n      label: 'B'\n    }, {\n      id: 'third',\n      label: 'C'\n    }\n    , {\n      id: 'fourth',\n      label: 'D'\n    }\n    , {\n      id: 'fifth',\n      label: 'E'\n    }\n    , {\n      id: 'six',\n      label: 'F'\n    }\n  ]\"\n>\n\n</ngx-graph>\n</div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/experiment-info/info.component.html":
  /*!************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/experiment-info/info.component.html ***!
    \************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserExperimentInfoInfoComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"row\">\n  <div class=\"col-md-8\">\n    <div class=\"row\" style=\"margin: 0.5em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n        <mat-card>\n          <mat-form-field class=\"col-md-12\" appearance=\"outline\">\n            <mat-label>Experiment Name</mat-label>\n            <input\n            [disabled]=\"onlyReadable()\"\n              matInput\n              [(ngModel)]=\"experiment.name\"\n              (change)=\"setExperimentName()\"\n            />\n          </mat-form-field>\n\n          <mat-form-field class=\"col-md-12\" appearance=\"outline\">\n            <mat-label>Experiment Description</mat-label>\n            <textarea\n            [disabled]=\"onlyReadable()\"\n              matInput\n              [(ngModel)]=\"experiment.description\"\n              (change)=\"setExperimentDescription()\"\n            ></textarea>\n          </mat-form-field>\n        </mat-card>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4\">\n    <div style=\"text-align: center; padding: 1em;\" *ngIf=\"!onlyReadable()\">\n      <button mat-stroked-button (click)=\"save()\">Save</button>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlb/hlb-binding.component.html":
  /*!*******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlb/hlb-binding.component.html ***!
    \*******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserHlbHlbBindingComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!-- <h1 mat-dialog-title>Hi {{data.name}}</h1>\n<div mat-dialog-content>\n  <p>What's your favorite animal?</p>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"data.animal\">\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button [mat-dialog-close]=\"data.animal\" cdkFocusInitial>Ok</button>\n</div> -->\n\n\n<div mat-dialog-content>\n<div class=\"row\" style=\"margin: .5em;\">\n    <div class=\"col-md-12\">\n    \n              \n        <div style=\"text-align: center;\">  Bindings</div> \n        \n          <hr>\n          <div *ngIf=\"bindingList.length==0\" style=\"font-size: .8em;text-align: center;\">\n            <span ><i>No Bindings Needed</i></span>\n          </div>\n            <div *ngIf=\"bindingList.length!=0\">\n          <ul  class=\"behavior-list \" >\n            <li class=\"binding-box\" *ngFor=\"let item of bindingList;let index=index\" ><div>\n            \n              <mat-form-field style=\"width:100%\">\n                <input matInput placeholder=\"{{item.key+' represents: '}}\" [(ngModel)]=\"item.value\">\n              </mat-form-field>\n\n              <span>\n              </span>\n             \n            </div>\n              </li>\n        </ul>\n        </div>\n\n        \n\n      </div>\n      </div></div>\n\n      <div mat-dialog-actions>\n        <button mat-button (click)=\"onNoClick()\">Back</button>\n        <button mat-button [mat-dialog-close]=\"bindingList\" cdkFocusInitial>Download</button>\n      </div> ";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlb/hlb.component.html":
  /*!***********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlb/hlb.component.html ***!
    \***********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserHlbHlbComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n <div class=\"row\">\n  <div class=\"col-md-9\">\n  \n    \n      <div class=\"row\" style=\"margin: .5em;\">\n          <div class=\"col-md-12\" style=\"padding: 0;\">\n              <mat-card> \n                 \n                   <div style=\"text-align: center;\">  Behavior</div> \n                 <hr>\n                 <div class=\"row\">\n                 <div class=\"col-md-12\" (click)=\"selectTextBox(2)\">\n                    <div *ngIf=\"!onlyReadable()\" style=\"margin: .6em;border-bottom: 1px solid #eee;\" [hidden]=\"!isEnable(2)\">\n                        <span>Suggestions:</span>\n                       \n                        <button type=\"button\" class=\"btn btn-outline-primary word-bubble-button\" *ngFor=\"let word of behaviorWordList | slice:0:3 | textfilter:behaviorTextFilter \"  (click)=\"insertValue(word.value)\" [disabled]=\"word.flag\">{{word.value}}</button>\n                        <button type=\"button\" *ngIf=\"suggestionbehaviorMessage!=null\" class=\"btn btn-outline-primary word-bubble-button\" [disabled]=\"true\">{{suggestionbehaviorMessage}}</button>\n                        \n                        \n                     </div>\n                  <div class=\"flex-container\" (blur)=\"onBlurMethod()\" >\n                      \n                        <quill-editor [disabled]=\"onlyReadable()\"\n                       \n                        [styles]=\"{height: '400px',border:'none'}\"\n                        [modules]=\"{  counter: { container: '#editor1'} ,toolbar: false }\"\n                        [(ngModel)]=\"behaviorText\" \n                        (onContentChanged)=\"logChangeBehavior($event);\"\n                        (onEditorCreated)=\"created($event,2)\"></quill-editor>\n                      </div>\n                       \n                    \n                    </div>\n                    </div>\n                   \n              </mat-card>\n     \n          </div>\n        </div> \n        <div class=\"row\" style=\"margin: .5em;\">\n            <div class=\"col-md-12\" style=\"padding: 0;\">\n                <mat-card> \n                  \n                  <div style=\"text-align: center;\">  Constraints</div> \n                  \n                    <hr>\n                    <div class=\"row\">\n                    <div class=\"col-md-12\" (click)=\"selectTextBox(3)\">\n                      <div *ngIf=\"!onlyReadable()\" style=\"margin: .6em;border-bottom: 1px solid #eee;\" [hidden]=\"!isEnable(3)\">\n                         <span>Suggestions:</span>\n                         <button type=\"button\" class=\"btn btn-outline-primary word-bubble-button\" *ngFor=\"let word of constraintWordList | slice:0:3 | textfilter:constraintTextFilter\"  (click)=\"insertValueInConstraint(word.value)\">{{word.value}}</button>\n                        <button type=\"button\" *ngIf=\"suggestionConstraintMessage!=null\" class=\"btn btn-outline-primary word-bubble-button\" [disabled]=\"true\">{{suggestionConstraintMessage}}</button>\n                             \n                  \n                      </div>\n                        <div class=\"flex-container\">\n                      \n                            <quill-editor \n                            [disabled]=\"onlyReadable()\"\n                            [styles]=\"{height: '400px',border:'none'}\"\n                            [modules]=\"{  counter: { container: '#editor1'} ,toolbar: false }\"\n                            [(ngModel)]=\"constraintText\" \n                            (onContentChanged)=\"logChangeConstraints($event);\"\n                            (onEditorCreated)=\"created($event,3)\"></quill-editor>\n                          </div>\n                        </div>\n                        </div>\n                </mat-card>\n            </div>\n          </div>\n           <div class=\"row\" style=\"margin: .5em;\">\n            <div class=\"col-md-12\" style=\"padding: 0;\">\n              <mat-card> \n                      \n                <div style=\"text-align: center;\">  Bindings</div> \n                \n                  <hr>\n                  <div *ngIf=\"bindingList.length==0\" style=\"font-size: .8em;text-align: center;\">\n                    <span ><i>No Bindings Needed</i></span>\n                  </div>\n                    <div *ngIf=\"bindingList.length!=0\">\n                  <ul  class=\"behavior-list \" >\n                    <li *ngFor=\"let item of bindingList;let index=index\" ><div>\n                    \n                      <mat-form-field style=\"width:100%\" appearance=\"outline\">\n                        <mat-label>{{item.key+' represents: '}}</mat-label>\n                        <input [disabled]=\"onlyReadable()\" matInput [(ngModel)]=\"item.value\" (change)=\"storeBinding()\">\n                      </mat-form-field>\n        \n                      <span>\n                      </span>\n                     \n                    </div>\n                      </li>\n                </ul>\n                </div>\n        \n                \n              </mat-card> \n              </div>\n              </div> \n     \n  \n   \n    </div>\n  <div class=\"col-md-3\" style=\"margin-top: .5em;\">\n  \n    <div class=\"row\" *ngIf=\"!onlyReadable()\">\n      <div class=\"col-md-12\" style=\"padding: 1em;\">\n          \n        <div style=\"text-align: center;padding: .1em;\">     \n           <button mat-stroked-button (click)=\"addBindings()\" >Generate Ns File</button>\n           \n      </div>\n   \n      </div>\n      </div>\n    \n    <div class=\"row\" style=\"margin-top: .1em;\n    margin-bottom: .1em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n  \n        <mat-card>  \n          <div style=\"text-align: center;\">Actors\n           </div>\n  \n          \n          <hr>\n          <div *ngIf=\"actorsList.length==0\" style=\"font-size: .8em;text-align: center;\">\n            <span ><i>No Actors</i></span>\n          </div>\n            <div *ngIf=\"actorsList.length!=0\" style=\"  height: auto;\n            display: flow-root;\n            padding: 0;\">\n          \n  \n        <div *ngFor=\"let item of actorsList;let index=index\" class=\"binding-word-bubble\" style=\"  border: 1px solid black;\">\n            \n          <span>\n          {{item.text}} </span>\n         \n          </div>\n        </div>\n        </mat-card>\n  \n      </div>\n    </div>\n  \n    <div class=\"row\" style=\"margin-top: .1em;\n    margin-bottom: .1em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n  \n        <mat-card>  \n          <div style=\"text-align: center;\">Bindings Needed\n  \n          \n           </div>\n  \n          \n          <hr>\n          <div *ngIf=\"bindingList.length==0\" style=\"font-size: .8em;text-align: center;\">\n            <span ><i>No Bindings Needed.</i></span>\n          </div>\n          \n            <div *ngIf=\"bindingList.length!=0\" style=\"  height: auto;\n            display: flow-root;\n            padding: 0;\">\n          \n            <div *ngFor=\"let item of bindingList;let index=index\" class=\"binding-word-bubble\" >\n            \n              <span>\n              {{item.key}} </span>\n              <i class=\"fas fa-exclamation-circle\" style=\"color: red;\" *ngIf=\"isEmpty(item)\"></i>\n              <i class=\"fa fa-check-circle\" style=\"color: green;\"  *ngIf=\"!isEmpty(item)\" ></i>\n             \n              </div>\n        \n        </div>\n        </mat-card>\n  \n      </div>\n    </div>\n    </div>\n  </div> \n  \n  ";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlpparser.component.html":
  /*!*************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlpparser.component.html ***!
    \*************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserHlpparserComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n  <mat-tab-group>\n    <mat-tab *ngFor=\"let x of menuList\" label=\"{{ x.name }}\">\n   \n    \n      <div *ngIf=\"x.id ==1\" class=\"tab\">\n        <experiment-info [id]=experimentId></experiment-info>\n      </div>\n      <div *ngIf=\"x.id ==2\" class=\"tab\">\n        <hlb></hlb>\n      </div>\n\n      <div *ngIf=\"x.id ==3\" class=\"tab\">\n        <nlp></nlp>\n      </div>\n\n      <div *ngIf=\"x.id ==4\" class=\"tab\">\n        <dependency-graph></dependency-graph>\n      </div> \n\n      <!-- <div *ngIf=\"x.id ==5\" class=\"tab\">\n        <upload></upload>\n      </div>  -->\n      \n    </mat-tab>\n  </mat-tab-group> \n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/nlp/nlp.component.html":
  /*!***********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/nlp/nlp.component.html ***!
    \***********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserNlpNlpComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n    <div class=\"row\">\n      <div class=\"col-md-12\" style=\"padding: 2em;\">\n        <!-- <div style=\"margin: .6em;\" >\n          <span>Suggestions:</span>\n          <button\n            type=\"button\"\n            class=\"btn btn-outline-primary word-bubble-button\"\n            *ngFor=\"let word of wordlist\"\n            (click)=\"insertValue(word.value)\"\n          >\n            {{ word.value }}\n          </button>\n        </div> -->\n        <div class=\"flex-container\">\n          <quill-editor\n            [styles]=\"{ height: '100px' }\"\n            [modules]=\"{ counter: { container: '#editor1' }, toolbar: false }\"\n            [(ngModel)]=\"nlpText\"\n            (onContentChanged)=\"logChange($event, 1)\"\n            (onEditorCreated)=\"created($event)\"\n          ></quill-editor>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-12\">\n    \n        <div style=\"float:right\">\n          <button mat-stroked-button  (click)=\"save()\">Generate HLB</button>\n        \n      </div>\n    </div>\n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/upload/file.preview.component.html":
  /*!***********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/upload/file.preview.component.html ***!
    \***********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserUploadFilePreviewComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n\n<h2 mat-dialog-title>Content of {{file.name}}:</h2>\n<mat-dialog-content class=\"mat-typography\">\n  <div [innerHTML]=\"fileContent\"></div>\n  \n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n    <button mat-button [mat-dialog-close]=\"false\">close</button>\n    <button mat-button [mat-dialog-close]=\"true\" cdkFocusInitial>upload</button>\n  </mat-dialog-actions>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/upload/upload.component.html":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/upload/upload.component.html ***!
    \*****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPublicHlbparserUploadUploadComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n\n    <div class=\"row\">\n      <div class=\"col-md-12\" >\n  <ngx-file-drop dropZoneLabel=\"Drop files here\" (onFileDrop)=\"dropped($event)\" \n  (onFileOver)=\"fileOver($event)\" (onFileLeave)=\"fileLeave($event)\">\n      <ng-template accept=\"ns\" multiple=\"false\" ngx-file-drop-content-tmp let-openFileSelector=\"openFileSelector\">\n        <div > Drag & drop a file. or Click on \n        <span (click)=\"openFileSelector()\" style=\"cursor: pointer;\"><u>Browse Files</u></span> to upload.\n        </div>\n      \n      </ng-template>\n  </ngx-file-drop>\n</div>\n</div>\n<br>\n<div class=\"row\" >\n  <div class=\"col-md-12\">\n    <table class=\"table\">\n      <thead class=\"upload-name\">\n          <tr >\n            <th style=\"min-width:150px\">Sr.</th>\n              <th style=\"min-width:150px\">Name</th>\n              <th style=\"min-width:150px\"></th>\n          </tr>\n      </thead>\n      <tbody class=\"upload-name\"  *ngIf=\"files.length!=0\">\n          <tr *ngFor=\"let item of files; let i=index\" >\n            <td>{{i+1}}</td>\n              <td><strong>{{ item.relativePath }}</strong></td>\n              <td>\n                <i class=\"fas fa-eye pointer\" (click)=\"preview(item)\"></i>\n                <i class=\"fas fa-upload pointer\" (click)=\"upload(item)\"></i>\n                <i class=\"far fa-trash-alt pointer\" (click)=\"delete(i)\"></i></td>\n\n          </tr>\n      </tbody>\n      <tbody class=\"upload-name\"  *ngIf=\"files.length==0\">\n        <tr >\n          <td colspan=\"3\" ><span ><i>No file found.</i> </span></td>\n            \n\n        </tr>\n    </tbody>\n \n  </table>\n    </div>\n</div>\n\n";
    /***/
  },

  /***/
  "./src/app/public/hlbparser/common/editor-service.ts":
  /*!***********************************************************!*\
    !*** ./src/app/public/hlbparser/common/editor-service.ts ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPublicHlbparserCommonEditorServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "default", function () {
      return EditorService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");

    class EditorService {
      constructor(quill) {
        this.textData = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]("");
        this.onBlur = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.isEnterPress = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.isTabPress = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.onBlurFlag = false;
        this.currentword = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('');
        this.currentsentence = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.isTextChange = false;
        this.index = 0;
        this.quill = quill;
        var instance = this;
        this.quill.on("selection-change", function (range, oldRange, source) {
          if (range) {
            instance.index = range.index;
            instance.range = range.length;

            if (instance.onBlurFlag) {
              instance.onBlur.next(false);
              instance.onBlurFlag = false;
            }
          } else {
            instance.onBlurFlag = true;
            instance.onBlur.next(true);
          }
        });
        this.quill.on("text-change", function (delta, oldDelta, source) {
          //console.log(delta);
          var position = 0;
          var tabFlag = false;
          var delFlag = false;
          instance.isTextChange = true;

          if (delta.ops != undefined) {
            delta.ops.forEach(element => {
              if (element.retain != undefined) position = element.retain;

              if (element.insert != undefined) {
                position += element.insert.length;
                if (element.insert == '\n') instance.pressedEntered();
                if (element.insert == '\t') tabFlag = true;
              }

              if (element.delete != undefined) delFlag = true;
            });
          }

          var index = instance.quill.getText().length - 1;
          var text = instance.quill.getText().substr(0, index);
          instance.index = position; //console.log("value of index inside:"+instance.index);

          if (!tabFlag) {
            instance.currentSentence(text, position);
            instance.currentWord(text, position);
          } else {
            if (!delFlag) setTimeout(function () {
              instance.pressedTab();
            }, 50);
          }
        });
      }

      getUpdatedValue() {
        return this.textData.asObservable();
      }

      getCurrentWord() {
        return this.currentword.asObservable();
      }

      getSuggestionData() {
        return this.currentsentence.asObservable();
      }

      isEnterPressed() {
        return this.isEnterPress.asObservable();
      }

      isTabPressed() {
        return this.isTabPress.asObservable();
      }

      setUpdatedValue(Data) {
        this.textData.next(Data);
      }

      currentWord(text, position) {
        var word = this.getWordAt(text, position);
        this.currentword.next(word);
      }

      currentSentence(text, position) {
        var sentence = this.getSentenceTill(text, position);
        var remainingSentences = this.getRemainingSentences(text, position); ////console.log(remainingSentences);

        var obj = {
          currentSentence: sentence,
          remainingSentences: remainingSentences
        };
        if (sentence.length == 0 || sentence.charAt(sentence.length - 1) == " ") this.currentsentence.next(obj);
      }

      getRemainingSentences(str, pos) {
        str = String(str);
        pos = Number(pos) >>> 0;
        var left = str.slice(0, pos).search(/\n.*$/);
        var list = [];
        var temp; ////console.log(left);

        if (left > 0) {
          temp = str.slice(0, left).split("\n");
          temp.forEach(element => {
            if (element.trim() != '') list.push(element);
          });
        }

        temp = str.slice(left + 1).split("\n");
        temp.splice(0, 1);
        temp.forEach(element => {
          if (element.trim() != '') list.push(element);
        });
        return list;
      }

      getWordAt(str, pos) {
        str = String(str);
        pos = Number(pos) >>> 0;
        var left = str.slice(0, pos).search(/\S+$/),
            right = str.slice(pos).search(/\s/);

        if (right < 0) {
          return str.slice(left);
        }

        return str.slice(left, right + pos);
      }

      getSentenceTill(str, pos) {
        str = String(str);
        pos = Number(pos) >>> 0;
        var t = str.slice(0, pos).search(/\n.*$/);
        var right = str.slice(pos).search(/\s/);

        if (right < 0) {
          return str.slice(t + 1);
        }

        return str.slice(t + 1, right + pos);
      }

      getSentenceAt(str, pos) {
        str = String(str);
        pos = Number(pos) >>> 0;
        var left = str.slice(0, pos).search(/\n.+$/);
        return str.slice(left + 1).split("\n")[0];
      }

      isTextChanged() {
        var flag = this.isTextChange;
        this.resetTextChangeFlag();
        return flag;
      }

      resetTextChangeFlag() {
        this.isTextChange = false;
      }

      pressedEntered() {
        this.isEnterPress.next(true);
      }

      pressedTab() {
        this.isTabPress.next(true);
      }

      insertVaue(text, flag = true, word) {
        if (word.trim() == '') {
          //console.log("inside trim");
          if (flag) {
            this.index--;
            this.quill.deleteText(this.index, 1);
          } //console.log("::"+text);


          this.quill.insertText(this.index, text + " "); //console.log("value of index before:"+this.index);
        } else this.replaceText(this.quill.getText(), text, word, flag);
      }

      replaceText(str, text, word, flag) {
        str = String(str);
        var pos;
        if (flag) pos = Number(this.index - 1) >>> 0;else pos = Number(this.index) >>> 0;
        var left = str.slice(0, pos).search(/\S+$/);
        if (flag) this.quill.deleteText(left, word.length + 1);else this.quill.deleteText(left, word.length);
        let t = this.quill.insertText(left, text + " "); //console.log("h");

        this.index = left + text.length + 1;
      }

      getText() {
        return this.quill.getText();
      }

      clear() {
        this.quill.setText("");
      }

      isBlur() {
        return this.onBlur.asObservable();
      }

    }
    /***/

  },

  /***/
  "./src/app/public/hlbparser/common/text-filter.pipe.ts":
  /*!*************************************************************!*\
    !*** ./src/app/public/hlbparser/common/text-filter.pipe.ts ***!
    \*************************************************************/

  /*! exports provided: TextFilterPipe */

  /***/
  function srcAppPublicHlbparserCommonTextFilterPipeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TextFilterPipe", function () {
      return TextFilterPipe;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/state-service.service */
    "./src/app/state-service.service.ts");

    let TextFilterPipe = class TextFilterPipe {
      constructor(state) {
        this.state = state;
      }

      transform(items, filter1) {
        var filter = filter1.text;
        var option = filter1.name;

        if (!items || !filter) {
          if (items.length > 0) {
            if (option == "behavior") this.state.setCurrentBehaviorWord(items[0].value);else if (option == "constraint") this.state.setCurrentConstraintWord(items[0].value);
          } else {
            if (option == "behavior") this.state.setCurrentBehaviorWord("");else if (option == "constraint") this.state.setCurrentConstraintWord("");
          }

          return items;
        }

        if (filter.trim() === "") {
          if (items.length > 0) {
            if (option == "behavior") this.state.setCurrentBehaviorWord(items[0].value);else if (option == "constraint") this.state.setCurrentConstraintWord(items[0].value);
          } else {
            if (option == "behavior") this.state.setCurrentBehaviorWord("");else if (option == "constraint") this.state.setCurrentConstraintWord("");
          }

          return items;
        } else {
          var filterList = items.filter(item => item.value.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) > -1);

          if (filterList.length > 0) {
            if (option == "behavior") this.state.setCurrentBehaviorWord(filterList[0].value);else if (option == "constraint") this.state.setCurrentConstraintWord(filterList[0].value);
          } else {
            if (option == "behavior") this.state.setCurrentBehaviorWord("");else if (option == "constraint") this.state.setCurrentConstraintWord("");
          }

          return filterList;
        }
      }

    };

    TextFilterPipe.ctorParameters = () => [{
      type: src_app_state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"]
    }];

    TextFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
      name: "textfilter",
      pure: false
    })], TextFilterPipe);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/dependency-graph/dependency-graph.component.scss":
  /*!***********************************************************************************!*\
    !*** ./src/app/public/hlbparser/dependency-graph/dependency-graph.component.scss ***!
    \***********************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPublicHlbparserDependencyGraphDependencyGraphComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".chart-container {\n  width: 100%;\n  height: 100%;\n  background-color: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcHVibGljL2hsYnBhcnNlci9kZXBlbmRlbmN5LWdyYXBoL2RlcGVuZGVuY3ktZ3JhcGguY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3B1YmxpYy9obGJwYXJzZXIvZGVwZW5kZW5jeS1ncmFwaC9kZXBlbmRlbmN5LWdyYXBoLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcHVibGljL2hsYnBhcnNlci9kZXBlbmRlbmN5LWdyYXBoL2RlcGVuZGVuY3ktZ3JhcGguY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2hhcnQtY29udGFpbmVye1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufSIsIi5jaGFydC1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/public/hlbparser/dependency-graph/dependency-graph.component.ts":
  /*!*********************************************************************************!*\
    !*** ./src/app/public/hlbparser/dependency-graph/dependency-graph.component.ts ***!
    \*********************************************************************************/

  /*! exports provided: DependencyGraphComponent */

  /***/
  function srcAppPublicHlbparserDependencyGraphDependencyGraphComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DependencyGraphComponent", function () {
      return DependencyGraphComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let DependencyGraphComponent = class DependencyGraphComponent {};
    DependencyGraphComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'dependency-graph',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./dependency-graph.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/dependency-graph/dependency-graph.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./dependency-graph.component.scss */
      "./src/app/public/hlbparser/dependency-graph/dependency-graph.component.scss")).default]
    })], DependencyGraphComponent);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/experiment-info/info.component.scss":
  /*!**********************************************************************!*\
    !*** ./src/app/public/hlbparser/experiment-info/info.component.scss ***!
    \**********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPublicHlbparserExperimentInfoInfoComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3B1YmxpYy9obGJwYXJzZXIvZXhwZXJpbWVudC1pbmZvL2luZm8uY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/public/hlbparser/experiment-info/info.component.ts":
  /*!********************************************************************!*\
    !*** ./src/app/public/hlbparser/experiment-info/info.component.ts ***!
    \********************************************************************/

  /*! exports provided: InfoComponent */

  /***/
  function srcAppPublicHlbparserExperimentInfoInfoComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InfoComponent", function () {
      return InfoComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/@auth/auth.service */
    "./src/app/@auth/auth.service.ts");
    /* harmony import */


    var src_app_state_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/state-service.service */
    "./src/app/state-service.service.ts");

    let InfoComponent = class InfoComponent {
      constructor(state, auth) {
        this.state = state;
        this.auth = auth;
        this.experiment = {
          userId: this.auth.getCookie("userId"),
          name: "",
          description: "",
          behavior: [],
          actor: [],
          binding: [],
          constraint: []
        };
        this.tokenList = [];
      }

      ngOnInit() {
        if (this.id != undefined && this.id != null && this.id != -1) this.experiment["id"] = this.id;
        this.state.getExperimentName().subscribe(name => {
          this.experiment.name = name;
        });
        this.state.getExperimentDescription().subscribe(description => {
          this.experiment.description = description;
        });
        this.state.getBehavior().subscribe(behaviorList => {
          this.experiment.behavior = behaviorList;
        });
        this.state.getActors().subscribe(actorList => {
          this.experiment.actor = actorList;
        });
        this.state.getBindings().subscribe(bindingList => {
          this.experiment.binding = bindingList;
        });
        this.state.getConstraints().subscribe(constraintsList => {
          this.experiment.constraint = constraintsList;
        });
        this.tokenLevel = this.state.getTokenLevel();
      }

      onlyReadable() {
        return this.tokenLevel == 'read';
      }

      setExperimentName() {
        this.state.setExperimentName(this.experiment.name);
      }

      setExperimentDescription() {
        this.state.setExperimentDescription(this.experiment.description);
      }

      save() {
        console.log(this.experiment);
      }

    };

    InfoComponent.ctorParameters = () => [{
      type: src_app_state_service_service__WEBPACK_IMPORTED_MODULE_3__["StateService"]
    }, {
      type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
    }];

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], InfoComponent.prototype, "id", void 0);
    InfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "experiment-info",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./info.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/experiment-info/info.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./info.component.scss */
      "./src/app/public/hlbparser/experiment-info/info.component.scss")).default]
    })], InfoComponent);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/hlb/hlb.component.scss":
  /*!*********************************************************!*\
    !*** ./src/app/public/hlbparser/hlb/hlb.component.scss ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPublicHlbparserHlbHlbComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".behavior-list {\n  margin: 0.1em;\n  list-style: none;\n  padding: 0;\n}\n\n.behavior-box {\n  margin: 0.5em;\n  border: 1px solid #ccc;\n  padding: 0.5em;\n}\n\n.word-bubble {\n  border: 1px dotted black;\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.binding-word-bubble {\n  border: 1px solid black;\n  float: left;\n  margin: 2px;\n  border-radius: 8px;\n  padding: 3px;\n}\n\n.word-bubble-button {\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n}\n\n.float-left {\n  float: left;\n}\n\n.actions {\n  float: right;\n  cursor: pointer;\n  display: none;\n}\n\n.behavior-list:hover .actions {\n  display: block;\n}\n\n.disabled {\n  pointer-events: none;\n}\n\n.grabbable {\n  cursor: move;\n  /* fallback if grab cursor is unsupported */\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n/* (Optional) Apply a \"closed-hand\" cursor during drag operation. */\n\n.grabbable:active {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n\n.mat-radio-button ~ .mat-radio-button {\n  margin-left: 16px;\n}\n\n.padding-left-right {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.button-padding {\n  margin-left: 0.1em;\n}\n\n.expand {\n  float: right;\n  cursor: pointer;\n}\n\n.hide {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcHVibGljL2hsYnBhcnNlci9obGIvaGxiLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wdWJsaWMvaGxicGFyc2VyL2hsYi9obGIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0FDQ0o7O0FERUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FDQ0o7O0FESUE7RUFDSSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FDREo7O0FES0E7RUFDSSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FDRko7O0FESUE7RUFDSSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0FDREo7O0FESUE7RUFDSSxXQUFBO0FDREo7O0FESUE7RUFDSSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUNESjs7QURJQTtFQUNJLGNBQUE7QUNESjs7QURJQTtFQUNJLG9CQUFBO0FDREo7O0FESUE7RUFDSSxZQUFBO0VBQWMsMkNBQUE7RUFDZCxZQUFBO0VBRUEsb0JBQUE7QUNBSjs7QURHQyxtRUFBQTs7QUFDRDtFQUNJLGdCQUFBO0VBRUEsd0JBQUE7QUNBSjs7QURHQTtFQUNJLGlCQUFBO0FDQUo7O0FER0U7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0FDQU47O0FESUU7RUFDSSxrQkFBQTtBQ0ROOztBRElFO0VBQ0ksWUFBQTtFQUNBLGVBQUE7QUNETjs7QURJRTtFQUNJLGFBQUE7QUNETiIsImZpbGUiOiJzcmMvYXBwL3B1YmxpYy9obGJwYXJzZXIvaGxiL2hsYi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iZWhhdmlvci1saXN0e1xuICAgIG1hcmdpbjouMWVtO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbn1cblxuLmJlaGF2aW9yLWJveHtcbiAgICBtYXJnaW46IC41ZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBwYWRkaW5nOiAuNWVtO1xufVxuXG5cblxuLndvcmQtYnViYmxle1xuICAgIGJvcmRlcjogMXB4IGRvdHRlZCBibGFjaztcbiAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgcGFkZGluZzogMC40ZW07XG4gICAgbWFyZ2luOiAwLjFlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gXG59XG5cbi5iaW5kaW5nLXdvcmQtYnViYmxle1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIG1hcmdpbjogMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nOiAzcHg7XG59XG4ud29yZC1idWJibGUtYnV0dG9ue1xuICAgIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgICBwYWRkaW5nOiAwLjRlbTtcbiAgICBtYXJnaW46IDAuMWVtO1xuIFxufVxuLmZsb2F0LWxlZnR7XG4gICAgZmxvYXQ6bGVmdDtcbn1cblxuLmFjdGlvbnN7XG4gICAgZmxvYXQ6cmlnaHQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5iZWhhdmlvci1saXN0OmhvdmVyIC5hY3Rpb25ze1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uZGlzYWJsZWR7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7ICAgXG59XG5cbi5ncmFiYmFibGUge1xuICAgIGN1cnNvcjogbW92ZTsgLyogZmFsbGJhY2sgaWYgZ3JhYiBjdXJzb3IgaXMgdW5zdXBwb3J0ZWQgKi9cbiAgICBjdXJzb3I6IGdyYWI7XG4gICAgY3Vyc29yOiAtbW96LWdyYWI7XG4gICAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XG59XG5cbiAvKiAoT3B0aW9uYWwpIEFwcGx5IGEgXCJjbG9zZWQtaGFuZFwiIGN1cnNvciBkdXJpbmcgZHJhZyBvcGVyYXRpb24uICovXG4uZ3JhYmJhYmxlOmFjdGl2ZSB7XG4gICAgY3Vyc29yOiBncmFiYmluZztcbiAgICBjdXJzb3I6IC1tb3otZ3JhYmJpbmc7XG4gICAgY3Vyc29yOiAtd2Via2l0LWdyYWJiaW5nO1xufVxuXG4ubWF0LXJhZGlvLWJ1dHRvbiB+IC5tYXQtcmFkaW8tYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogMTZweDtcbiAgfVxuXG4gIC5wYWRkaW5nLWxlZnQtcmlnaHR7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgfVxuXG4gXG4gIC5idXR0b24tcGFkZGluZ3tcbiAgICAgIG1hcmdpbi1sZWZ0OiAuMWVtO1xuICB9XG5cbiAgLmV4cGFuZHtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5oaWRle1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgfSIsIi5iZWhhdmlvci1saXN0IHtcbiAgbWFyZ2luOiAwLjFlbTtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLmJlaGF2aW9yLWJveCB7XG4gIG1hcmdpbjogMC41ZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmc6IDAuNWVtO1xufVxuXG4ud29yZC1idWJibGUge1xuICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgcGFkZGluZzogMC40ZW07XG4gIG1hcmdpbjogMC4xZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmJpbmRpbmctd29yZC1idWJibGUge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1hcmdpbjogMnB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDNweDtcbn1cblxuLndvcmQtYnViYmxlLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgcGFkZGluZzogMC40ZW07XG4gIG1hcmdpbjogMC4xZW07XG59XG5cbi5mbG9hdC1sZWZ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5hY3Rpb25zIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5iZWhhdmlvci1saXN0OmhvdmVyIC5hY3Rpb25zIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5kaXNhYmxlZCB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4uZ3JhYmJhYmxlIHtcbiAgY3Vyc29yOiBtb3ZlO1xuICAvKiBmYWxsYmFjayBpZiBncmFiIGN1cnNvciBpcyB1bnN1cHBvcnRlZCAqL1xuICBjdXJzb3I6IGdyYWI7XG4gIGN1cnNvcjogLW1vei1ncmFiO1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYjtcbn1cblxuLyogKE9wdGlvbmFsKSBBcHBseSBhIFwiY2xvc2VkLWhhbmRcIiBjdXJzb3IgZHVyaW5nIGRyYWcgb3BlcmF0aW9uLiAqL1xuLmdyYWJiYWJsZTphY3RpdmUge1xuICBjdXJzb3I6IGdyYWJiaW5nO1xuICBjdXJzb3I6IC1tb3otZ3JhYmJpbmc7XG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcbn1cblxuLm1hdC1yYWRpby1idXR0b24gfiAubWF0LXJhZGlvLWJ1dHRvbiB7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4ucGFkZGluZy1sZWZ0LXJpZ2h0IHtcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcbn1cblxuLmJ1dHRvbi1wYWRkaW5nIHtcbiAgbWFyZ2luLWxlZnQ6IDAuMWVtO1xufVxuXG4uZXhwYW5kIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oaWRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/public/hlbparser/hlb/hlb.component.ts":
  /*!*******************************************************!*\
    !*** ./src/app/public/hlbparser/hlb/hlb.component.ts ***!
    \*******************************************************/

  /*! exports provided: HlbComponent, BindingPopUp */

  /***/
  function srcAppPublicHlbparserHlbHlbComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HlbComponent", function () {
      return HlbComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BindingPopUp", function () {
      return BindingPopUp;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/cdk/drag-drop */
    "./node_modules/@angular/cdk/esm2015/drag-drop.js");
    /* harmony import */


    var quill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! quill */
    "./node_modules/quill/dist/quill.js");
    /* harmony import */


    var quill__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var _common_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../common/editor-service */
    "./src/app/public/hlbparser/common/editor-service.ts");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/dialog */
    "./node_modules/@angular/material/esm2015/dialog.js");
    /* harmony import */


    var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/app/http-service.service */
    "./src/app/http-service.service.ts");
    /* harmony import */


    var src_app_state_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! src/app/state-service.service */
    "./src/app/state-service.service.ts");

    quill__WEBPACK_IMPORTED_MODULE_3__["register"]("modules/counter", _common_editor_service__WEBPACK_IMPORTED_MODULE_4__["default"]);
    let HlbComponent = class HlbComponent {
      constructor(http, dialog, stateservice, _snackBar, changeDetection) {
        this.http = http;
        this.dialog = dialog;
        this.stateservice = stateservice;
        this._snackBar = _snackBar;
        this.changeDetection = changeDetection;
        this.actorTextFilter = "";
        this.behaviorTextFilter = {
          name: "behavior",
          text: ""
        };
        this.constraintTextFilter = {
          name: "constraint",
          text: ""
        };
        this.behaviorList = [];
        this.constraintWordList = [];
        this.actorsList = [];
        this.contraintList = [];
        this.bindingList = [];
        this.bindingMap = new Map();
        this.behaviorWordList = [];
        this.inputText = "";
        this.actors = "";
        this.selectedIndex = 0;
      }

      onlyReadable() {
        return this.tokenLevel == 'read';
      }

      ngOnInit() {
        this.bindingMap = new Map();
        this.behaviorList = [];
        const instance = this;
        this.tokenLevel = this.stateservice.getTokenLevel();
        this.stateservice.getBehavior().subscribe(data => {
          if (data != null) {
            var text = "";
            data.forEach(element => {
              text += element + "<br>";
            });
            instance.behaviorText = text;
          }
        });
        this.stateservice.getBindings().subscribe(data => {
          if (data != null) {
            //console.log(data);
            this.bindingList = [];
            this.bindingMap = new Map();
            data.forEach(element => {
              var list = element.trim().split(" ");
              var key = list[0];
              var value = list.splice(1);
              value = value.join(" ");
              var t = {
                key: key,
                value: value
              };
              this.bindingMap.set(key, t);
              this.bindingList.push(t);
            }); //console.log(this.bindingMap);
          }
        });
        this.stateservice.getActors().subscribe(data => {
          // //console.log(data);
          if (data != null) {
            instance.actorsList = [];
            data.forEach(element => {
              this.actorsList.push({
                text: element
              });
            });
          }
        });
        this.stateservice.getConstraints().subscribe(data => {
          // //console.log(data);
          if (data != null) {
            var text = "";
            data.forEach(element => {
              text += element + "<br>";
            });
            instance.constraintText = text;
          }
        });
      }

      drop(event, list) {
        Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__["moveItemInArray"])(list, event.previousIndex, event.currentIndex);
      }

      created(editor, id) {
        // //console.log(id);
        var instance = this;

        switch (id) {
          case 1:
            this.actorService = editor.getModule("counter");
            break;

          case 2:
            this.behaviorService = editor.getModule("counter");
            this.behaviorService.isBlur().subscribe(data => {
              if (data && instance.behaviorService.isTextChanged()) this.updateActors();
              if (!data) this.textBoxId = 2;else this.textBoxId = -1;
            });
            this.behaviorService.isEnterPressed().subscribe(flag => {
              if (flag && instance.behaviorService.isTextChanged()) {
                if (this.behaviorService.getText().trim() === "") return;
                var index = this.behaviorService.getText().length - 2;
                if (this.behaviorService.getText().charAt(index) == "\n") this.updateActors();
              }
            });
            this.behaviorService.isTabPressed().subscribe(flag => {
              if (flag) {
                //console.log("inside istab");
                if (this.stateservice.getCurrentBehaviorWord().trim() != "") this.insertValue(this.stateservice.getCurrentBehaviorWord(), true); //this.behaviorService
              }
            });
            this.behaviorService.getSuggestionData().subscribe(data => {
              if (data != null) {
                var params = {
                  type: "behavior",
                  suggestion_for: data.currentSentence,
                  behaviors: data.remainingSentences,
                  constraints: [],
                  actors: []
                };
                var constraints = this.constraintService.getText().trim();

                if (constraints != "") {
                  var constraintsList = constraints.split("\n");
                  params.constraints = constraintsList;
                }

                this.behaviorTextFilter.text = "";
                this.http.put("v1/hlb/suggestions", params).subscribe(data => {
                  var list = [];
                  data.suggestions.forEach(element => {
                    list.push({
                      value: element,
                      flag: false
                    });
                  });
                  if (data.suggestion_text.trim() != "") this.suggestionbehaviorMessage = data.suggestion_text;else this.suggestionbehaviorMessage = null;
                  this.behaviorWordList = list;
                  this.changeDetection.detectChanges();
                });
              }
            });
            this.behaviorService.getCurrentWord().subscribe(data => {
              //console.log(data);
              if (data != null && data.trim()) {
                this.behaviorTextFilter.text = data;
              }
            });
            break;

          case 3:
            this.constraintService = editor.getModule("counter");
            this.constraintService.isBlur().subscribe(data => {
              if (data && instance.constraintService.isTextChanged()) this.updateActorsConstraint();
              if (!data) this.textBoxId = 3;else this.textBoxId = -1;
            });
            this.constraintService.isEnterPressed().subscribe(flag => {
              if (flag && instance.constraintService.isTextChanged()) {
                if (this.constraintService.getText().trim() === "") return;
                var index = this.constraintService.getText().length - 2;
                if (this.constraintService.getText().charAt(index) == "\n") this.updateActorsConstraint();
              }
            });
            this.constraintService.isTabPressed().subscribe(flag => {
              if (flag) {
                if (this.stateservice.getCurrentConstraintWord().trim() != "") this.insertValueInConstraint(this.stateservice.getCurrentConstraintWord(), true); //this.behaviorService
              }
            });
            this.constraintService.getSuggestionData().subscribe(data => {
              if (data != null) {
                var params = {
                  type: "constraint",
                  suggestion_for: data.currentSentence,
                  behaviors: [],
                  constraints: data.remainingSentences,
                  actors: []
                };
                var behaviors = this.behaviorService.getText().trim();

                if (behaviors != "") {
                  var behaviorsList = behaviors.split("\n");
                  params.behaviors = behaviorsList;
                }

                this.constraintTextFilter.text = "";
                this.http.put("v1/hlb/suggestions", params).subscribe(data => {
                  var list = [];
                  data.suggestions.forEach(element => {
                    list.push({
                      value: element,
                      flag: false
                    });
                  });
                  if (data.suggestion_text.trim() != "") this.suggestionConstraintMessage = data.suggestion_text;else this.suggestionConstraintMessage = null;
                  this.constraintWordList = list;
                  this.changeDetection.detectChanges();
                });
              }
            });
            this.constraintService.getCurrentWord().subscribe(data => {
              ////console.log(data);
              if (data != null && data.trim()) {
                this.constraintTextFilter.text = data;
              }
            });
            break;
        }
      }

      updateActors() {
        //console.log('inside update Actors');
        if (this.behaviorService.getText().trim() === "") {
          this.actorsList = [];
          return;
        }

        var data = {
          ParseType: "bash",
          Scenario: [],
          Constraints: []
        };
        this.behaviorList = [];
        var blist = this.behaviorService.getText().trim().split("\n");
        blist.forEach(element => {
          var text = element.trim();

          if (text != "") {
            data.Scenario.push(text);
            this.behaviorList.push(text);
          }
        });
        this.stateservice.setBehavior(this.behaviorList);
        this.http.put("v1/hlb/parse", data).subscribe(data => {
          this.extractInfo(data);
        });
      }

      updateActorsConstraint() {
        if (this.constraintService.getText().trim() === "") {
          this.actorsList = [];
          return;
        }

        var data = {
          ParseType: "bash",
          Scenario: [],
          Constraints: []
        };
        this.contraintList = [];
        var blist = this.constraintService.getText().trim().split("\n");
        blist.forEach(element => {
          var text = element.trim();

          if (text != "") {
            data.Constraints.push(text);
            this.contraintList.push(text);
          }
        });
        this.stateservice.setConstraints(this.contraintList);
        this.http.put("v1/hlb/parse", data).subscribe(data => {//console.log(data);
          //   this.extractInfo(data);
        });
      }

      extractInfo(data) {
        this.extractScenario(data.parsedScenario);
      }

      extractScenario(scenario) {
        //console.log(scenario);
        // this.bindingMap = new Map<String,any>();
        this.actorsList = [];
        this.bindingList = [];
        var trigger = [];
        scenario.forEach(element => {
          this.extractActors(element[1] != null ? element[1] : []);

          if (element[0] != null) {
            element[0].map(x => {
              if (!trigger.includes(x)) {
                trigger.push(x);
              }
            });
          }

          if (element[2] != null) element[2].map(x => {
            if (!trigger.includes(x)) {
              trigger.push(x);
            }
          });
          if (element[3] != null) element[3].map(x => {
            if (!trigger.includes(x)) {
              trigger.push(x);
            }
          });
        });
        this.extractEvents(trigger); // this.loadBindings();

        this.changeDetection.detectChanges();
      }

      isEmpty(binding) {
        if (binding.value == undefined) return true;
        return binding.value.trim() == "";
      }

      loadBindings() {
        this.bindingMap.forEach((value, key) => {
          this.bindingList.push(key);
        });
      }

      extractEvents(triggers //,actions,emitters
      ) {
        //console.log(this.bindingMap);
        if (triggers != null) triggers.forEach(element => {
          //console.log(element);
          if (!this.bindingMap.has(element)) {
            var t = {
              key: element,
              value: ""
            };
            this.bindingMap.set(element, t);
            this.bindingList.push(t);
          } else {
            this.bindingList.push(this.bindingMap.get(element));
          }
        }); //   if(actions!=null)
        //   actions.forEach(element => {
        //     //console.log(element);
        //     if (!this.bindingMap.has(element)){
        //       var t = {key:element,value:""};
        //       this.bindingMap.set(element,t);
        //       this.bindingList.push(t);
        // }else{
        //   this.bindingList.push(this.bindingMap.get(element));
        // }
        //   });
        //   if(emitters!=null)
        //   emitters.forEach(element => {
        //     //console.log(element);
        //     if (!this.bindingMap.has(element)){
        //       var t = {key:element,value:""};
        //       this.bindingMap.set(element,t);
        //       this.bindingList.push(t);
        // }else{
        //   this.bindingList.push(this.bindingMap.get(element));
        // }
        //   });
        // //console.log(this.bindingMap);
      }

      logChangeBehavior(event) {
        if (this.behaviorService.getText().trim() === "") return; // var index = this.behaviorService.getText().length-2;
        // if (this.behaviorService.getText().charAt(index) == '\n')
        //     this.updateActors();
      }

      logChangeConstraints(event) {
        if (this.constraintService.getText().trim() === "") return; // //console.log(this.constraintService.getText().charAt(this.constraintService.getText().length-1))
      }

      insertValue(text, flag = false) {
        //console.log("word:"+text);
        this.service.insertVaue(text, flag, this.behaviorTextFilter.text);
      }

      insertValueInConstraint(text, flag = false) {
        this.service.insertVaue(text, flag, this.constraintTextFilter.text);
      }

      selectTextBox(id) {
        this.textBoxId = id;

        switch (id) {
          case 1:
            this.service = this.actorService;
            break;

          case 2:
            this.service = this.behaviorService;
            break;

          case 3:
            this.service = this.constraintService;
            break;
        }
      }

      isEnable(id) {
        return this.textBoxId == id;
      }

      extractActors(data) {
        data.forEach(element => {
          ////console.log(element);
          this.insertActor(element);
        });
        var alist = [];
        this.actorsList.forEach(element => {
          alist.push(element.text);
        });
        this.stateservice.setActors(alist);
      }

      insertActor(actor) {
        var t = this.actorsList.find(function (element) {
          return element.text === actor;
        }); // //console.log(t);

        if (t == undefined) this.actorsList.push({
          text: actor
        });
      }

      clear() {
        //console.log(this.behaviorText);
        this.service.clear();
        this.behaviorText = "";
      }

      selectedTab(index) {
        this.selectedIndex = index;
      }

      addBindings() {
        //console.log(this.bindingList);
        var dialogRef = this.dialog.open(BindingPopUp, {
          width: "70%",
          data: this.bindingList
        });
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed');
          this.generateNs();
        });
      }

      generateNs() {
        var data = {
          actors: [],
          behaviors: [],
          constraints: [],
          bindings: []
        };
        if (this.actorsList.length == 0) return;
        if (this.behaviorList.length == 0) return;
        this.actorsList.forEach(element => {
          data.actors.push(element.text);
        });
        var flag = false;
        this.behaviorList.forEach(element => {
          data.behaviors.push(element);
        });
        this.contraintList.forEach(element => {
          data.constraints.push(element.text);
        });
        this.bindingList.forEach(element => {
          if (element.value == null || element.value.trim() == "") {
            flag = true;
            return;
          }

          data.bindings.push(element.key + " " + element.value);
        });
        if (flag) return;
        this.stateservice.enableLoader();
        this.http.put("v1/hlb/generateNs", data, null).subscribe(data => {
          //console.log(data);
          this.stateservice.disableLoader();
          this.downLoadFile(data.script);

          this._snackBar.open("Successfully Downloaded.", "close", {
            duration: 2000
          }); // this.stateservice.setBindings(data.Bindings);

        }, error => {
          this.stateservice.disableLoader();

          this._snackBar.open(error, "close", {
            duration: 2000
          });
        });
      }

      storeBinding() {
        // console.log(this.bindingList);
        var binding = [];
        this.bindingList.forEach(element => {
          binding.push(element.key.trim() + " " + element.value.trim());
        });
        this.stateservice.setBindings(binding);
      }

      downLoadFile(data) {
        var blob = new Blob([data], {
          type: "text/plain"
        }); //console.log(blob);
        // var url = (window.URL || window.webkitURL).createObjectURL(blob);

        var fileName = "experiment.txt";

        if ("msSaveOrOpenBlob" in navigator) {
          navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          var downloadLink = document.createElement("a");
          downloadLink.download = fileName;
          downloadLink.innerHTML = "Download File"; // if ('webkitURL' in window) {
          // Chrome allows the link to be clicked
          // without actually adding it to the DOM.
          //  downloadLink.href = window.webkitURL.createObjectURL(blob);
          // } else {
          // Firefox requires the link to be added to the DOM
          // before it can be clicked.

          downloadLink.href = window.URL.createObjectURL(blob); //downloadLink.onclick = destroyClickedElement;

          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink); //  }

          downloadLink.click();
        }
      }

    };

    HlbComponent.ctorParameters = () => [{
      type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"]
    }, {
      type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]
    }, {
      type: src_app_state_service_service__WEBPACK_IMPORTED_MODULE_8__["StateService"]
    }, {
      type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]
    }];

    HlbComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "hlb",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./hlb.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlb/hlb.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./hlb.component.scss */
      "./src/app/public/hlbparser/hlb/hlb.component.scss")).default]
    })], HlbComponent);
    let BindingPopUp = class BindingPopUp {
      constructor(dialogRef, bindingList) {
        this.dialogRef = dialogRef;
        this.bindingList = bindingList;
      }

      onNoClick() {
        this.dialogRef.close();
      }

    };

    BindingPopUp.ctorParameters = () => [{
      type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialogRef"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
        args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MAT_DIALOG_DATA"]]
      }]
    }];

    BindingPopUp = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "hlb-binding",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./hlb-binding.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlb/hlb-binding.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./hlb.component.scss */
      "./src/app/public/hlbparser/hlb/hlb.component.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MAT_DIALOG_DATA"]))], BindingPopUp);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/hlbparser-routing.module.ts":
  /*!**************************************************************!*\
    !*** ./src/app/public/hlbparser/hlbparser-routing.module.ts ***!
    \**************************************************************/

  /*! exports provided: HLBParserRoutingModule */

  /***/
  function srcAppPublicHlbparserHlbparserRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HLBParserRoutingModule", function () {
      return HLBParserRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _hlpparser_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./hlpparser.component */
    "./src/app/public/hlbparser/hlpparser.component.ts");
    /* harmony import */


    var src_app_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/@auth/auth.guard */
    "./src/app/@auth/auth.guard.ts");

    const routes = [{
      path: "view/:id",
      canActivateChild: [src_app_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]],
      component: _hlpparser_component__WEBPACK_IMPORTED_MODULE_3__["HLBParserComponent"]
    }];
    let HLBParserRoutingModule = class HLBParserRoutingModule {};
    HLBParserRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })], HLBParserRoutingModule);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/hlpparser.component.scss":
  /*!***********************************************************!*\
    !*** ./src/app/public/hlbparser/hlpparser.component.scss ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPublicHlbparserHlpparserComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".tab {\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcHVibGljL2hsYnBhcnNlci9obHBwYXJzZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3B1YmxpYy9obGJwYXJzZXIvaGxwcGFyc2VyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3B1YmxpYy9obGJwYXJzZXIvaGxwcGFyc2VyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYntcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufSIsIi50YWIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/public/hlbparser/hlpparser.component.ts":
  /*!*********************************************************!*\
    !*** ./src/app/public/hlbparser/hlpparser.component.ts ***!
    \*********************************************************/

  /*! exports provided: HLBParserComponent */

  /***/
  function srcAppPublicHlbparserHlpparserComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HLBParserComponent", function () {
      return HLBParserComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/@auth/auth.service */
    "./src/app/@auth/auth.service.ts");
    /* harmony import */


    var src_app_state_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/state-service.service */
    "./src/app/state-service.service.ts");
    /* harmony import */


    var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/http-service.service */
    "./src/app/http-service.service.ts");

    let HLBParserComponent = class HLBParserComponent {
      constructor(route, router, http, state, auth) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.state = state;
        this.auth = auth;
        this.menuList = [];
        this.experimentId = -1;
      }

      ngOnInit() {
        this.route.params.subscribe(params => {
          if (params["id"] != "") {
            var input = {
              id: params["id"]
            };
            this.experimentId = params["id"];
            this.state.enableLoader();
            this.http.get("v1/token-based-auth/get/" + this.experimentId).subscribe(resultT => {
              if (resultT.data != null && resultT.data.token != undefined && resultT.data.status) {
                this.http.get("v1/token-based-auth/getdetails/" + this.experimentId).subscribe(result => {
                  var data = result.data;
                  this.state.setActors(data.actors);
                  this.state.setExperimentName(data.name);
                  this.state.setExperimentDescription(data.description);
                  this.state.setBehavior(data.behaviors);
                  this.state.setBindings(data.bindings);
                  this.state.setConstraints(data.constraints);
                  this.state.setTokenLevel(resultT.data.level);
                  this.setMenu();
                  this.state.disableLoader();
                }, error => {
                  alert("Invalid Token");
                  this.router.navigate(["auth/login"]);
                });
              } else {
                alert("Invalid Token");
                this.router.navigate(["auth/login"]);
              }

              return "";
            });
          }
        });
      }

      setMenu() {
        this.menuList.push({
          name: "Information",
          id: 1,
          html: "<experiment-info></experiment-info>"
        });
        this.menuList.push({
          name: "HLB",
          id: 2,
          html: "<hlb></hlb>"
        });

        if (this.state.getTokenLevel() == "write") {
          this.menuList.push({
            name: "NLP",
            id: 3,
            html: "<nlp></nlp>"
          });
          this.menuList.push({
            name: "Behavior Dependency Graph",
            id: 4,
            html: "<p>In Progress.....</p>"
          });
          this.menuList.push({
            name: "Upload",
            id: 5,
            html: "<upload></upload>"
          });
        }
      }

    };

    HLBParserComponent.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
    }, {
      type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"]
    }, {
      type: src_app_state_service_service__WEBPACK_IMPORTED_MODULE_4__["StateService"]
    }, {
      type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
    }];

    HLBParserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "hlbparser",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./hlpparser.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/hlpparser.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./hlpparser.component.scss */
      "./src/app/public/hlbparser/hlpparser.component.scss")).default]
    })], HLBParserComponent);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/hlpparser.module.ts":
  /*!******************************************************!*\
    !*** ./src/app/public/hlbparser/hlpparser.module.ts ***!
    \******************************************************/

  /*! exports provided: PublicHLBParserModule */

  /***/
  function srcAppPublicHlbparserHlpparserModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PublicHLBParserModule", function () {
      return PublicHLBParserModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material/tabs */
    "./node_modules/@angular/material/esm2015/tabs.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material/expansion */
    "./node_modules/@angular/material/esm2015/expansion.js");
    /* harmony import */


    var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material/input */
    "./node_modules/@angular/material/esm2015/input.js");
    /* harmony import */


    var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/card */
    "./node_modules/@angular/material/esm2015/card.js");
    /* harmony import */


    var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/cdk/drag-drop */
    "./node_modules/@angular/cdk/esm2015/drag-drop.js");
    /* harmony import */


    var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ngx-quill */
    "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
    /* harmony import */


    var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @fortawesome/angular-fontawesome */
    "./node_modules/@fortawesome/angular-fontawesome/fesm2015/angular-fontawesome.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var ngx_file_drop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ngx-file-drop */
    "./node_modules/ngx-file-drop/fesm2015/ngx-file-drop.js");
    /* harmony import */


    var _hlpparser_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ./hlpparser.component */
    "./src/app/public/hlbparser/hlpparser.component.ts");
    /* harmony import */


    var _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @swimlane/ngx-graph */
    "./node_modules/@swimlane/ngx-graph/fesm2015/swimlane-ngx-graph.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _hlbparser_routing_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./hlbparser-routing.module */
    "./src/app/public/hlbparser/hlbparser-routing.module.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./hlb/hlb.component */
    "./src/app/public/hlbparser/hlb/hlb.component.ts");
    /* harmony import */


    var _nlp_nlp_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./nlp/nlp.component */
    "./src/app/public/hlbparser/nlp/nlp.component.ts");
    /* harmony import */


    var _common_text_filter_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./common/text-filter.pipe */
    "./src/app/public/hlbparser/common/text-filter.pipe.ts");
    /* harmony import */


    var _upload_upload_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ./upload/upload.component */
    "./src/app/public/hlbparser/upload/upload.component.ts");
    /* harmony import */


    var _dependency_graph_dependency_graph_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! ./dependency-graph/dependency-graph.component */
    "./src/app/public/hlbparser/dependency-graph/dependency-graph.component.ts");
    /* harmony import */


    var _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! @angular/material/radio */
    "./node_modules/@angular/material/esm2015/radio.js");
    /* harmony import */


    var _experiment_info_info_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./experiment-info/info.component */
    "./src/app/public/hlbparser/experiment-info/info.component.ts");
    /* harmony import */


    var src_app_state_service_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! src/app/state-service.service */
    "./src/app/state-service.service.ts");

    let PublicHLBParserModule = class PublicHLBParserModule {};
    PublicHLBParserModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      exports: [_hlpparser_component__WEBPACK_IMPORTED_MODULE_12__["HLBParserComponent"]],
      declarations: [_hlpparser_component__WEBPACK_IMPORTED_MODULE_12__["HLBParserComponent"], _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_17__["HlbComponent"], _nlp_nlp_component__WEBPACK_IMPORTED_MODULE_18__["NlpComponent"], _dependency_graph_dependency_graph_component__WEBPACK_IMPORTED_MODULE_21__["DependencyGraphComponent"], _common_text_filter_pipe__WEBPACK_IMPORTED_MODULE_19__["TextFilterPipe"], _upload_upload_component__WEBPACK_IMPORTED_MODULE_20__["UploadComponent"], _upload_upload_component__WEBPACK_IMPORTED_MODULE_20__["FilePreviewComponent"], _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_17__["BindingPopUp"], _experiment_info_info_component__WEBPACK_IMPORTED_MODULE_23__["InfoComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_16__["RouterModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__["MatRadioModule"], _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_13__["NgxGraphModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__["FontAwesomeModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__["DragDropModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTableModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_8__["QuillModule"].forRoot(), _hlbparser_routing_module__WEBPACK_IMPORTED_MODULE_15__["HLBParserRoutingModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"], ngx_file_drop__WEBPACK_IMPORTED_MODULE_11__["NgxFileDropModule"]],
      entryComponents: [_upload_upload_component__WEBPACK_IMPORTED_MODULE_20__["FilePreviewComponent"], _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_17__["BindingPopUp"]],
      providers: [src_app_state_service_service__WEBPACK_IMPORTED_MODULE_24__["StateService"]],
      bootstrap: [_hlpparser_component__WEBPACK_IMPORTED_MODULE_12__["HLBParserComponent"]]
    })], PublicHLBParserModule);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/nlp/nlp.component.scss":
  /*!*********************************************************!*\
    !*** ./src/app/public/hlbparser/nlp/nlp.component.scss ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPublicHlbparserNlpNlpComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".behavior-list {\n  margin: 0.1em;\n  list-style: none;\n  padding: 0;\n}\n\n.behavior-box {\n  margin: 0.5em;\n  border: 1px solid #ccc;\n  padding: 0.5em;\n}\n\n.word-bubble {\n  border: 1px dotted black;\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.word-bubble-button {\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.float-left {\n  float: left;\n}\n\n.actions {\n  float: right;\n}\n\n.disabled {\n  pointer-events: none;\n  background-color: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcHVibGljL2hsYnBhcnNlci9ubHAvbmxwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wdWJsaWMvaGxicGFyc2VyL25scC9ubHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0FDQ0o7O0FERUE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FDQ0o7O0FERUE7RUFDSSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtBQ0NKOztBREVBO0VBQ0ksb0JBQUE7RUFDQSxzQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcHVibGljL2hsYnBhcnNlci9ubHAvbmxwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJlaGF2aW9yLWxpc3R7XG4gICAgbWFyZ2luOi4xZW07XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4uYmVoYXZpb3ItYm94e1xuICAgIG1hcmdpbjogLjVlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIHBhZGRpbmc6IC41ZW07XG59XG5cbi53b3JkLWJ1YmJsZXtcbiAgICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIHBhZGRpbmc6IDAuNGVtO1xuICAgIG1hcmdpbjogMC4xZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuIFxufVxuLndvcmQtYnViYmxlLWJ1dHRvbntcbiAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgcGFkZGluZzogMC40ZW07XG4gICAgbWFyZ2luOiAwLjFlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gXG59XG4uZmxvYXQtbGVmdHtcbiAgICBmbG9hdDpsZWZ0O1xufVxuXG4uYWN0aW9uc3tcbiAgICBmbG9hdDpyaWdodDtcbn1cblxuLmRpc2FibGVke1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG4iLCIuYmVoYXZpb3ItbGlzdCB7XG4gIG1hcmdpbjogMC4xZW07XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5iZWhhdmlvci1ib3gge1xuICBtYXJnaW46IDAuNWVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAwLjVlbTtcbn1cblxuLndvcmQtYnViYmxlIHtcbiAgYm9yZGVyOiAxcHggZG90dGVkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAxZW07XG4gIHBhZGRpbmc6IDAuNGVtO1xuICBtYXJnaW46IDAuMWVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi53b3JkLWJ1YmJsZS1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAxZW07XG4gIHBhZGRpbmc6IDAuNGVtO1xuICBtYXJnaW46IDAuMWVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mbG9hdC1sZWZ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5hY3Rpb25zIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuXG4uZGlzYWJsZWQge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/public/hlbparser/nlp/nlp.component.ts":
  /*!*******************************************************!*\
    !*** ./src/app/public/hlbparser/nlp/nlp.component.ts ***!
    \*******************************************************/

  /*! exports provided: NlpComponent */

  /***/
  function srcAppPublicHlbparserNlpNlpComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NlpComponent", function () {
      return NlpComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! quill */
    "./node_modules/quill/dist/quill.js");
    /* harmony import */


    var quill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var _common_editor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../common/editor-service */
    "./src/app/public/hlbparser/common/editor-service.ts");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/http-service.service */
    "./src/app/http-service.service.ts");
    /* harmony import */


    var src_app_state_service_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! src/app/state-service.service */
    "./src/app/state-service.service.ts");

    quill__WEBPACK_IMPORTED_MODULE_2__["register"]("modules/counter", _common_editor_service__WEBPACK_IMPORTED_MODULE_3__["default"]);
    let NlpComponent = class NlpComponent {
      constructor(http, stateservice, _snackBar) {
        this.http = http;
        this.stateservice = stateservice;
        this._snackBar = _snackBar;
        this.nlpTextFilter = "";
        this.nlpText = "";
        this.behaviorList = [];
        this.wordlist = [];
      }

      created(editor) {
        this.nlpText = "";
        this.service = editor.getModule("counter");
      }

      logChange(event, id) {
        if (this.service.getText().trim() === "") {
          return;
        }

        var text = this.service.getText().split(/\s/);
        this.nlpTextFilter = text[text.length - 2];
      }

      insertValue(text) {
        this.service.insertVaue(text);
      }

      delete(index) {
        this.behaviorList.splice(index, 1);
      }

      save() {
        var text = this.service.getText();
        var data = {
          text: text.trim()
        };
        this.stateservice.enableLoader();
        this.http.put("v1/nlp/behavior", data, null).subscribe(data => {
          console.log(data);
          this.stateservice.disableLoader();
          this.stateservice.setBehavior(data.behavior);
          this.stateservice.setActors(data.actors);
          this.stateservice.setConstraints(data.constraints);

          this._snackBar.open("Successfully Translated.", "close", {
            duration: 2000
          }); // this.stateservice.setBindings(data.Bindings);

        }, error => {
          this.stateservice.disableLoader();

          this._snackBar.open(error, "close", {
            duration: 2000
          });
        });
      }

      updateWordList() {
        this.localWordList = [];
        var dict = new Map();
        this.behaviorList.forEach(element => {
          //console.log(element);
          var wordlist = element.text.trim().split(/\s/);
          wordlist.forEach(element => {
            if (element.trim() !== "") {
              if (!dict.has(element.trim())) {
                this.localWordList.push({
                  value: element.trim()
                });
                dict.set(element.trim(), true);
              }
            }
          });
        });
        this.wordlist = this.wordlist.concat(this.localWordList);
      }

    };

    NlpComponent.ctorParameters = () => [{
      type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"]
    }, {
      type: src_app_state_service_service__WEBPACK_IMPORTED_MODULE_6__["StateService"]
    }, {
      type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"]
    }];

    NlpComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "nlp",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./nlp.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/nlp/nlp.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./nlp.component.scss */
      "./src/app/public/hlbparser/nlp/nlp.component.scss")).default]
    })], NlpComponent);
    /***/
  },

  /***/
  "./src/app/public/hlbparser/upload/upload.component.scss":
  /*!***************************************************************!*\
    !*** ./src/app/public/hlbparser/upload/upload.component.scss ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPublicHlbparserUploadUploadComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".pointer {\n  cursor: pointer;\n  padding: 0.2em;\n}\n\n.cdk-overlay-pane {\n  max-width: 80%;\n}\n\n.upload-name {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcHVibGljL2hsYnBhcnNlci91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wdWJsaWMvaGxicGFyc2VyL3VwbG9hZC91cGxvYWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBQ0ksY0FBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3B1YmxpYy9obGJwYXJzZXIvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb2ludGVye1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAuMmVtO1xufVxuXG4uY2RrLW92ZXJsYXktcGFuZXtcbiAgICBtYXgtd2lkdGg6IDgwJTtcbn1cblxuLnVwbG9hZC1uYW1le1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iLCIucG9pbnRlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMC4yZW07XG59XG5cbi5jZGstb3ZlcmxheS1wYW5lIHtcbiAgbWF4LXdpZHRoOiA4MCU7XG59XG5cbi51cGxvYWQtbmFtZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/public/hlbparser/upload/upload.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/public/hlbparser/upload/upload.component.ts ***!
    \*************************************************************/

  /*! exports provided: UploadComponent, FilePreviewComponent */

  /***/
  function srcAppPublicHlbparserUploadUploadComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UploadComponent", function () {
      return UploadComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FilePreviewComponent", function () {
      return FilePreviewComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material/dialog */
    "./node_modules/@angular/material/esm2015/dialog.js");
    /* harmony import */


    var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/http-service.service */
    "./src/app/http-service.service.ts");
    /* harmony import */


    var src_app_state_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/state-service.service */
    "./src/app/state-service.service.ts");

    let UploadComponent = class UploadComponent {
      constructor(_snackBar, dialog, http, state) {
        this._snackBar = _snackBar;
        this.dialog = dialog;
        this.http = http;
        this.state = state;
        this.files = [];
        this.filename = "";
      }

      dropped(files) {
        //this.files = files;
        for (const droppedFile of files) {
          this.files.push(droppedFile); // Is it a file?

          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry;
            fileEntry.file(file => {
              this.filename = file.name; // Here you can access the real file

              var reader = new FileReader();

              reader.onload = () => {// console.log(reader.result);
              };

              reader.readAsText(file); //  console.log(  );
              // You could upload it like this:
              // const formData = new FormData()
              // formData.append('logo', file, relativePath)
              // Headers
              // const headers = new HttpHeaders({
              //   'security-token': 'mytoken'
              // })
              // this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
              // .subscribe(data => {
              //   // Sanitized logo returned from backend
              // })
            });
          } else {
            // It was a directory (empty directories are added, otherwise only files)
            const fileEntry = droppedFile.fileEntry;
            console.log(droppedFile.relativePath, fileEntry);
          }
        }
      }

      fileOver(event) {
        console.log(event);
      }

      fileLeave(event) {
        console.log(event);
      }

      delete(index) {
        const fileEntry = this.files[index].fileEntry;

        this._snackBar.open("File name " + fileEntry.name + " is deleted.", "Close", {
          duration: 2000
        });

        this.files.splice(index, 1);
      }

      upload(item) {
        const fileEntry = item.fileEntry;
        this.state.enableLoader();
        fileEntry.file(file => {
          const formData = new FormData();
          formData.append("file", file);
          this.http.put("v1/upload/dew", formData, {
            responseType: "blob"
          }).subscribe(data => {
            this.state.disableLoader();

            if (data.behaviors != undefined) {
              this.state.setActors(data.actors);
              this.state.setBehavior(data.behaviors);
              this.state.setBindings(data.bindings); // this.state.setBindings(data.constraints);

              this._snackBar.open("File name " + fileEntry.name + " is uploaded!", "Close", {
                duration: 2000
              });
            } else {
              this._snackBar.open("Error in uploading file name " + fileEntry.name, "Close", {
                duration: 2000
              });
            }
          }, error => {
            this.state.disableLoader();
          });
        }); //   alert(fileEntry.name+" is uploaded!");
      }

      preview(item) {
        const dialogRef = this.dialog.open(FilePreviewComponent, {
          data: item.fileEntry
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        });
      }

    };

    UploadComponent.ctorParameters = () => [{
      type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]
    }, {
      type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]
    }, {
      type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"]
    }, {
      type: src_app_state_service_service__WEBPACK_IMPORTED_MODULE_5__["StateService"]
    }];

    UploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "upload",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./upload.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/upload/upload.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./upload.component.scss */
      "./src/app/public/hlbparser/upload/upload.component.scss")).default]
    })], UploadComponent);
    let FilePreviewComponent = class FilePreviewComponent {
      constructor(dialogRef, file) {
        this.dialogRef = dialogRef;
        this.file = file;
        var t = this;
        file.file(file => {
          // Here you can access the real file
          var reader = new FileReader();

          reader.onload = () => {
            t.fileContent = reader.result;
          };

          reader.readAsText(file);
        });
      }

      onNoClick() {
        this.dialogRef.close();
      }

    };

    FilePreviewComponent.ctorParameters = () => [{
      type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
        args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
      }]
    }];

    FilePreviewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "file-preview",
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./file.preview.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/public/hlbparser/upload/file.preview.component.html")).default
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]))], FilePreviewComponent);
    /***/
  }
}]);
//# sourceMappingURL=default~hlbparser-hlpparser-module~public-public-module-es5.js.map