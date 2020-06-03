(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~hlbparser-hlpparser-module~pages-pages-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n  <div class=\"col-md-12\" style=\"background-color: grey;\"> \n  <ngx-graph\n  class=\"chart-container\"\n  [view]=\"[500, 700]\"\n  [links]=\"[\n    {\n      id: 'a',\n      source: 'first',\n      target: 'second',\n      label: 'is parent of'\n    },{\n      id: 'b',\n      source: 'first',\n      target: 'third',\n      label: 'is parent of'\n    },{\n      id: 'c',\n      source: 'fourth',\n      target: 'first',\n      label: 'is parent of'\n    },{\n      id: 'd',\n      source: 'fourth',\n      target: 'third',\n      label: 'is parent of'\n    }\n    ,{\n      id: 'e',\n      source: 'fourth',\n      target: 'second',\n      label: 'is parent of'\n    }\n    ,{\n      id: 'f',\n      source: 'fourth',\n      target: 'fifth',\n      label: 'is parent of'\n    }\n  ]\"\n  [nodes]=\"[\n    {\n      id: 'first',\n      label: 'A'\n    }, {\n      id: 'second',\n      label: 'B'\n    }, {\n      id: 'third',\n      label: 'C'\n    }\n    , {\n      id: 'fourth',\n      label: 'D'\n    }\n    , {\n      id: 'fifth',\n      label: 'E'\n    }\n    , {\n      id: 'six',\n      label: 'F'\n    }\n  ]\"\n>\n\n</ngx-graph>\n</div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/experiment-info/add-user.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/experiment-info/add-user.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <h1 mat-dialog-title>Hi {{data.name}}</h1>\n<div mat-dialog-content>\n  <p>What's your favorite animal?</p>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"data.animal\">\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button [mat-dialog-close]=\"data.animal\" cdkFocusInitial>Ok</button>\n</div> -->\n\n\n\n<div mat-dialog-content>\n  <div class=\"row\" style=\"margin: .5em;\" >\n    <div class=\"col-md-12\" style=\"padding: 0;\">\n  \n          <div class=\"row\">\n           \n              <mat-form-field class=\"col-md-8\" appearance=\"outline\">\n                <mat-label>User Handle</mat-label>\n                <input type=\"text\"\n                       placeholder=\"User Handle\"\n                       aria-label=\"string\"\n                       matInput\n                       [(ngModel)]=\"UserObj.handle\"\n                       [formControl]=\"userHandleSelect\"\n                       [matAutocomplete]=\"UserInfo\">\n                <mat-autocomplete #UserInfo=\"matAutocomplete\">\n                  <mat-option *ngFor=\"let option of filteredUserHandle | async\" [value]=\"option.value\">\n                   {{option.name +\" <\"+option.value+\"> \"}}\n                  </mat-option>\n                </mat-autocomplete>\n              </mat-form-field>\n        \n              <mat-form-field class=\"col-md-4\" appearance=\"outline\">\n                <mat-label>Access Level</mat-label>\n                <mat-select [(ngModel)]=\"this.UserObj.access\" required >\n                  <mat-option *ngFor=\"let option of filteredLevels | async\" [value]=\"option.value\">\n                    {{option.name}}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n       \n      </div>\n\n\n    </div>\n  </div> \n</div>\n\n      <div mat-dialog-actions>\n        <button mat-button (click)=\"onNoClick()\">Cancel</button>\n        <button mat-button [disabled]=\"isAddDisabled()\" [mat-dialog-close]=\"UserObj\" cdkFocusInitial>Add</button>\n      </div>  ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/experiment-info/info.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/experiment-info/info.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"action_menu\">\n      <ul >\n          <li *ngIf=\"!isExperimentDisabled()\"><i class=\"fas fa-save pointer\" (click)=\"save()\" matTooltip=\"Save\"></i></li>\n          <li *ngIf=\"id!=-1 && experimentControl>3\"><i class=\"far fa-trash-alt pointer\" (click)=\"delete()\" matTooltip=\"Delete\"></i></li>\n          <li *ngIf=\"id!=-1 && experimentControl>3\"><i class=\"fas fa-share-square pointer\" (click)=\"addUserPopUp()\" matTooltip=\"Share it with User\"></i></li>\n          <li *ngIf=\"id!=-1 && experimentControl>3\"><i class=\"fas fa-external-link-alt pointer\" (click)=\"createToken()\" matTooltip=\"Get external url\"></i></li>\n      </ul>\n    </div>\n      </div>\n  </div>\n <div class=\"row\">\n<div class=\"col-md-8\">\n\n  \n    <div class=\"row\" style=\"margin: .5em;\">\n        <div class=\"col-md-12\" style=\"padding: 0;\">\n            <mat-card> \n              <div class=\"row\" >\n              <mat-form-field class=\"col-md-12\" appearance=\"outline\">\n                <mat-label>Experiment Name</mat-label>\n                <input matInput [hidden]=\"isExperimentDisabled()\" [(ngModel)]=\"experiment.name\" (change)=\"setExperimentName()\" pattern=\"^([\\s]*[\\w]+[\\s]*)+\" [formControl]=\"nameControl\" required>\n                <input matInput [hidden]=\"!isExperimentDisabled()\" [disabled]=\"isExperimentDisabled()\" [(ngModel)]=\"experiment.name\" (change)=\"setExperimentName()\" pattern=\"^([\\s]*[\\w]+[\\s]*)+\"  required>\n                <mat-hint>Experiment name can be any alphanumeric phrase. For example <i>Manhattan project.</i></mat-hint>\n                <mat-error>\n                  Please enter a valid name. Experiment name can be any alphanumeric phrase.\n                </mat-error>\n              </mat-form-field>\n            </div>\n            <div class=\"row\" style=\"margin-top: 1rem;\">\n              <mat-form-field class=\"col-md-12\" appearance=\"outline\">\n                <mat-label>Experiment Description</mat-label>\n                <textarea matInput [disabled]=\"isExperimentDisabled()\" [(ngModel)]=\"experiment.description\" maxlength=\"4000\" rows=\"10\" (change)=\"setExperimentDescription()\"></textarea>\n                <mat-hint>[Optional] Few lines to describe the project. Not more than 4000 character.</mat-hint>\n              </mat-form-field>\n            </div>\n            </mat-card>\n   \n        </div>\n      </div> \n      <div class=\"row\" style=\"margin: .5em;\" *ngIf=\"id!=-1 && experimentControl>3\">\n        <div class=\"col-md-12\" style=\"padding: 0;\">\n            <mat-card> \n              <div class=\"row\" style=\"margin: .5em;\" >\n                <div class=\"col-md-12\" style=\"padding: 0;\">\n                  <ul>\n           <li > <p>List of user having access for this experiment.</p>\n             \n              <table class=\"table\">\n                <thead >\n                    <tr >\n                     \n                        <th style=\"min-width:250px\">Name</th>\n                        <th style=\"min-width:50px\">Handle</th>\n                        <th style=\"min-width:50px\">Access Level</th> \n                       \n                        <th ></th>\n                    </tr>\n                </thead>\n                <tbody *ngIf=\"userAccessList.length!=0\" >\n                    <tr *ngFor=\"let item of userAccessList; let i=index\" >\n                     \n                        <td><strong>{{ item.name }}</strong></td>\n                        <td><strong>{{ '@'+item.handle }}</strong></td>\n                         <td><strong>{{ item.accessLevel }}</strong></td> \n       \n                        <td>\n               \n                          <i class=\"far fa-trash-alt pointer\" (click)=\"deleteUser(item)\"></i></td>\n          \n                    </tr>\n                </tbody>\n                <tbody style=\"text-align: center;\"  *ngIf=\"userAccessList.length==0\" >\n                  <tr >\n                    <td colspan=\"3\" ><span ><i>No User has been granted access for this experiment.</i> </span></td>\n                      \n          \n                  </tr>\n              </tbody>\n           \n            </table>\n          </li> \n                <!-- </div>\n              </div>\n              <hr>\n      <div class=\"row\" style=\"margin: .5em;\" *ngIf=\"id!=-1\">\n        <div class=\"col-md-12\" style=\"padding: 0;\"> -->\n        \n          <li>  <p>List of public urls</p>\n           \n              \n              <table class=\"table\">\n                <thead >\n                    <tr >\n                     \n                        <th style=\"min-width:250px\">Url</th>\n                        <th style=\"min-width:50px\">Status</th>\n                        <!-- <th style=\"min-width:50px\">Last Created Date</th> -->\n                       \n                        <th ></th>\n                    </tr>\n                </thead>\n                <tbody *ngIf=\"tokenList.length!=0\" >\n                    <tr *ngFor=\"let item of tokenList; let i=index\" >\n                     \n                        <td><strong>{{ 'http://dew.isi.edu/public/hlb/view/'+item.token }}</strong></td>\n                        <td><strong>{{ (item.status)?'Active':'Not Active' }}</strong></td>\n                        <!-- <td><strong>{{ item.created_date }}</strong></td> -->\n       \n                        <td>\n               \n                          <i class=\"far fa-trash-alt pointer\" (click)=\"deleteToken(i)\"></i></td>\n          \n                    </tr>\n                </tbody>\n                <tbody style=\"text-align: center;\"  *ngIf=\"tokenList.length==0\" >\n                  <tr >\n                    <td colspan=\"3\" ><span ><i>No public urls.</i> </span></td>\n                      \n          \n                  </tr>\n              </tbody>\n           \n            </table>\n          </li>  \n          </ul>\n   \n     </div>\n      </div> \n  \n</mat-card>\n   \n</div>\n</div> \n </div>\n  <!-- <div class=\"col-md-4\" *ngIf=\"!isExperimentDisabled()\">\n    <div style=\"text-align: center;padding: 1em;\">     \n      <button mat-stroked-button (click)=\"save()\" >Save</button>\n </div>\n\n\n  </div> -->\n</div> \n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlb/hlb-binding.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlb/hlb-binding.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <h1 mat-dialog-title>Hi {{data.name}}</h1>\n<div mat-dialog-content>\n  <p>What's your favorite animal?</p>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"data.animal\">\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button [mat-dialog-close]=\"data.animal\" cdkFocusInitial>Ok</button>\n</div> -->\n\n\n<div mat-dialog-content>\n<div class=\"row\" style=\"margin: .5em;\">\n    <div class=\"col-md-12\">\n    \n              \n        <div style=\"text-align: center;\">  \n          \n          <h2>Bindings</h2></div> \n        \n          <hr>\n          <div *ngIf=\"bindingList.length==0\" style=\"font-size: .8em;text-align: center;\">\n            <span ><i>No Bindings Needed</i></span>\n          </div>\n            <div *ngIf=\"bindingList.length!=0\">\n          <ul  class=\"behavior-list \" >\n            <li class=\"binding-box\" *ngFor=\"let item of bindingList;let index=index\" ><div>\n            \n              <mat-form-field style=\"width:100%\">\n                <input matInput placeholder=\"{{item.key+' represents: '}}\" [(ngModel)]=\"item.value\">\n              </mat-form-field>\n\n              <span>\n              </span>\n             \n            </div>\n              </li>\n        </ul>\n        </div>\n\n        \n\n      </div>\n      </div></div>\n\n      <div mat-dialog-actions>\n        <button mat-button (click)=\"onNoClick()\">Back</button>\n        <button mat-button [mat-dialog-close]=\"bindingList\" cdkFocusInitial>Download</button>\n      </div> ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlb/hlb.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlb/hlb.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n  <div class=\"col-md-9\">\n    <div class=\"row\" style=\"margin: 0.5em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n        <mat-card>\n          <div style=\"text-align: center;\"><h2>Behavior</h2></div>\n\n          <ul>\n            <li>Define steps to be executed during this experiment.</li>\n            <li>\n              <dl>\n                <dt>\n                  For example:\n                </dt>\n                <ul>\n                  <li>\n                    <span class=\"actor_example_color\">actor0</span>&nbsp;<span\n                      class=\"binding_example_color\"\n                      >start_log</span\n                    >\n                  </li>\n                  <li>\n                    wait t0\n                    <span class=\"actor_example_color\">actor1</span>&nbsp;<span\n                      class=\"binding_example_color\"\n                      >legitimate</span\n                    >\n                  </li>\n                  <li>\n                    when&nbsp;<span class=\"binding_example_color\"\n                      >stop_attack_done</span\n                    >&nbsp;wait t3&nbsp;<span class=\"actor_example_color\"\n                      >actor1</span\n                    >&nbsp;<span class=\"binding_example_color\"\n                      >stop_legitimate</span\n                    >&nbsp;emit&nbsp;<span class=\"binding_example_color\"\n                      >stop_legitimate_done</span\n                    >\n                  </li>\n                </ul>\n              </dl>\n            </li>\n            <li>\n              As you start typing there will be auto-suggestion displayed near\n              the top of the text area.\n            </li>\n            <li>\n              Press tab to use the first auto suggested word. It will append the\n              word near the cursor in the textarea.\n            </li>\n            <li>\n              There will also be suggestion displayed along with suggested text.\n              This will help you to write the next word or phrase.\n            </li>\n          </ul>\n          <hr />\n          <div class=\"row\">\n            <div class=\"col-md-12\" (click)=\"selectTextBox(2)\" >\n              <div\n                style=\"margin: 0.6em; border-bottom: 1px solid #eee;\"\n                [hidden]=\"!isEnable(2) || isExperimentDisabled()\"\n              >\n                <span>Suggestions:</span>\n\n                <button\n                  type=\"button\"\n                  class=\"btn btn-outline-primary word-bubble-button\"\n                  *ngFor=\"\n                    let word of behaviorWordList\n                      | slice: 0:3\n                      | textfilter: behaviorTextFilter\n                  \"\n                  (click)=\"insertValue(word.value)\"\n                  [disabled]=\"word.flag\"\n                >\n                  {{ word.value }}\n                </button>\n                <button\n                  type=\"button\"\n                  *ngIf=\"suggestionbehaviorMessage != null\"\n                  class=\"btn btn-outline-primary word-bubble-button\"\n                  [disabled]=\"true\"\n                >\n                  {{ suggestionbehaviorMessage }}\n                </button>\n              </div>\n              <div class=\"flex-container\" (blur)=\"onBlurMethod()\">\n                <quill-editor\n                  [styles]=\"{ height: '400px', border: 'none' }\"\n                  [modules]=\"{\n                    counter: { container: '#editor1' },\n                    toolbar: false\n                  }\"\n                  placeholder=\"Enter Steps to be executed during the experiment. For example: Actor0 start_log\"\n                  [(ngModel)]=\"behaviorText\"\n                  [disabled]=\"isExperimentDisabled()\"\n                  (onContentChanged)=\"logChangeBehavior($event)\"\n                  (onEditorCreated)=\"created($event, 2)\"\n                ></quill-editor>\n              </div>\n            </div>\n          </div>\n        </mat-card>\n      </div>\n    </div>\n    <div class=\"row\" style=\"margin: 0.5em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n        <mat-card>\n          <div style=\"text-align: center;\"><h2>Constraints</h2></div>\n          <ul>\n            <li>Define all the constraints for this experiment.</li>\n            <li>\n              <dl>\n                <dt>\n                  For example:\n                </dt>\n                <ul>\n                  <li>\n                    server&nbsp;os&nbsp;Ubuntu-latest\n                  </li>\n                  <li>\n                    attacker&nbsp;num&nbsp;3\n                  </li>\n                  <li>\n                    lan&nbsp;client&nbsp;attacker&nbsp;router\n                  </li>\n                  <li>\n                    link&nbsp;router&nbsp;server\n                  </li>\n                </ul>\n              </dl>\n            </li>\n            <li>\n              As you start typing there will be auto-suggestion displayed near\n              the top of the text area.\n            </li>\n            <li>\n              Press tab to use the first auto suggested word. It will append the\n              word near the cursor in the textarea.\n            </li>\n            <li>\n              There will also be suggestion displayed along with suggested text.\n              This will help you to write the next word or phrase.\n            </li>\n          </ul>\n          <hr />\n          <div class=\"row\">\n            <div class=\"col-md-12\" (click)=\"selectTextBox(3)\">\n              <div\n                style=\"margin: 0.6em; border-bottom: 1px solid #eee;\"\n                [hidden]=\"!isEnable(3) || isExperimentDisabled()\"\n              >\n                <span>Suggestions:</span>\n                <button\n                  type=\"button\"\n                  class=\"btn btn-outline-primary word-bubble-button\"\n                  *ngFor=\"\n                    let word of constraintWordList\n                      | slice: 0:3\n                      | textfilter: constraintTextFilter\n                  \"\n                  (click)=\"insertValueInConstraint(word.value)\"\n                >\n                  {{ word.value }}\n                </button>\n                <button\n                  type=\"button\"\n                  *ngIf=\"suggestionConstraintMessage != null\"\n                  class=\"btn btn-outline-primary word-bubble-button\"\n                  [disabled]=\"true\"\n                >\n                  {{ suggestionConstraintMessage }}\n                </button>\n              </div>\n              <div class=\"flex-container\">\n                <quill-editor\n                  [styles]=\"{ height: '400px', border: 'none' }\"\n                  [modules]=\"{\n                    counter: { container: '#editor1' },\n                    toolbar: false\n                  }\"\n                  [disabled]=\"isExperimentDisabled()\"\n                  [(ngModel)]=\"constraintText\"\n                  (onContentChanged)=\"logChangeConstraints($event)\"\n                  (onEditorCreated)=\"created($event, 3)\"\n                ></quill-editor>\n              </div>\n            </div>\n          </div>\n        </mat-card>\n      </div>\n    </div>\n    <div class=\"row\" style=\"margin: 0.5em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n        <mat-card>\n          <div style=\"text-align: center;\"><h2>Bindings</h2></div>\n          <ul>\n            <li>Define all the constraints for this experiment.</li>\n            <li>\n              <dl>\n                <dt>\n                  For example:\n                </dt>\n                <ul>\n                  <li>\n                    <span class=\"binding_example_color\"> install_iperf</span\n                    >&nbsp;apt-get install iperf -y\n                  </li>\n                  <li>\n                    <span class=\"binding_example_color\"> install_tcpdump</span\n                    >&nbsp;apt-get install tcpdump -y\n                  </li>\n                  <li>\n                    <span class=\"binding_example_color\"> install_flooder</span\n                    >&nbsp;/scripts/common/install_flooder.sh\n                  </li>\n                  <li>\n                    <span class=\"binding_example_color\"> start_server</span\n                    >&nbsp;iperf -s\n                  </li>\n                </ul>\n              </dl>\n            </li>\n            <li>\n              As you start typing behaior above this area will be populated with\n              the terms which require defination for the experiment to execute.\n            </li>\n            <li>\n              Below will be a list of text box with the term that requires more\n              input. As you fill the script, there will be a green tick ( like\n              this\n              <i class=\"fa fa-check-circle\" style=\"color: green;\"></i>&nbsp;) inside\n              the binding needed section on the top. This shows that the binding\n              is complete for that term\n            </li>\n          </ul>\n          <hr />\n          <div\n            *ngIf=\"bindingList.length == 0\"\n            style=\"font-size: 0.8em; text-align: center;\"\n          >\n            <span><i>No Bindings Needed</i></span>\n          </div>\n          <div *ngIf=\"bindingList.length != 0\">\n            <ul class=\"behavior-list\">\n              <li *ngFor=\"let item of bindingList; let index = index\">\n                <div>\n                  <mat-form-field style=\"width: 100%;\" appearance=\"outline\">\n                    <mat-label>{{ item.key + \" represents: \" }}</mat-label>\n                    <input\n                      matInput\n                      [disabled]=\"isExperimentDisabled()\"\n                      [(ngModel)]=\"item.value\"\n                      (change)=\"storeBinding()\"\n                    />\n                  </mat-form-field>\n\n                  <span> </span>\n                </div>\n              </li>\n            </ul>\n          </div>\n        </mat-card>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-3\" style=\"margin: 0;\">\n    <div class=\"row\">\n      <div class=\"col-md-12\" style=\"padding: 1em;\">\n        <div style=\"text-align: center; padding: 0.1em;\">\n          <button mat-stroked-button (click)=\"addBindings()\">\n            Generate Ns File\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\" style=\"margin-top: 0.1em; margin-bottom: 0.1em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n        <mat-card>\n          <div style=\"text-align: center;\">Actors</div>\n\n          <hr />\n          <div\n            *ngIf=\"actorsList.length == 0\"\n            style=\"font-size: 0.8em; text-align: center;\"\n          >\n            <span><i>No Actors</i></span>\n          </div>\n          <div\n            *ngIf=\"actorsList.length != 0\"\n            style=\"height: auto; display: flow-root; padding: 0;\"\n          >\n            <div\n              *ngFor=\"let item of actorsList; let index = index\"\n              class=\"binding-word-bubble\"\n              style=\"border: 1px solid black;\"\n            >\n              <span> {{ item.text }} </span>\n            </div>\n          </div>\n        </mat-card>\n      </div>\n    </div>\n\n    <div class=\"row\" style=\"margin-top: 0.1em; margin-bottom: 0.1em;\">\n      <div class=\"col-md-12\" style=\"padding: 0;\">\n        <mat-card>\n          <div style=\"text-align: center;\">Bindings Needed</div>\n\n          <hr />\n          <div\n            *ngIf=\"bindingList.length == 0\"\n            style=\"font-size: 0.8em; text-align: center;\"\n          >\n            <span><i>No Bindings Needed.</i></span>\n          </div>\n\n          <div\n            *ngIf=\"bindingList.length != 0\"\n            style=\"height: auto; display: flow-root; padding: 0;\"\n          >\n            <div\n              *ngFor=\"let item of bindingList; let index = index\"\n              class=\"binding-word-bubble\"\n            >\n              <span> {{ item.key }} </span>\n              <i\n                class=\"fas fa-exclamation-circle\"\n                style=\"color: red;\"\n                *ngIf=\"isEmpty(item)\"\n              ></i>\n              <i\n                class=\"fa fa-check-circle\"\n                style=\"color: green;\"\n                *ngIf=\"!isEmpty(item)\"\n              ></i>\n            </div>\n          </div>\n        </mat-card>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlpparser.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlpparser.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <mat-tab-group *ngIf=\"isViewEnable()\">\n    <mat-tab *ngFor=\"let x of menuList\" label=\"{{ x.name }}\">\n   \n    \n      <div *ngIf=\"x.id ==1\" class=\"tab\">\n        <experiment-info [id]=experimentId></experiment-info>\n      </div>\n      <div *ngIf=\"x.id ==2\" class=\"tab\">\n        <hlb></hlb>\n      </div>\n\n      <div *ngIf=\"x.id ==3 && experimentControl > 2\" class=\"tab\">\n        <nlp></nlp>\n      </div>\n\n      <div *ngIf=\"x.id ==4 && experimentControl > 2\" class=\"tab\">\n        <dependency-graph></dependency-graph>\n      </div> \n\n      <div *ngIf=\"x.id ==5 && experimentControl > 2\" class=\"tab\">\n        <upload></upload>\n      </div> \n      \n    </mat-tab>\n  </mat-tab-group> \n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/nlp/nlp.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/nlp/nlp.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n    <div class=\"row\">\n      <div class=\"col-md-12\" style=\"padding: 2em;\">\n        <!-- <div style=\"margin: .6em;\" >\n          <span>Suggestions:</span>\n          <button\n            type=\"button\"\n            class=\"btn btn-outline-primary word-bubble-button\"\n            *ngFor=\"let word of wordlist\"\n            (click)=\"insertValue(word.value)\"\n          >\n            {{ word.value }}\n          </button>\n        </div> -->\n        <div class=\"flex-container\">\n          <quill-editor\n            [styles]=\"{ height: '100px' }\"\n            [modules]=\"{ counter: { container: '#editor1' }, toolbar: false }\"\n            [(ngModel)]=\"nlpText\"\n            (onContentChanged)=\"logChange($event, 1)\"\n            (onEditorCreated)=\"created($event)\"\n          ></quill-editor>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-12\">\n    \n        <div style=\"float:right\">\n          <button mat-stroked-button  (click)=\"save()\">Generate HLB</button>\n        \n      </div>\n    </div>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/upload/file.preview.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/upload/file.preview.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<h2 mat-dialog-title>Content of {{file.name}}:</h2>\n<mat-dialog-content class=\"mat-typography\">\n  <div [innerHTML]=\"fileContent\"></div>\n  \n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n    <button mat-button [mat-dialog-close]=\"false\">close</button>\n    <button mat-button [mat-dialog-close]=\"true\" cdkFocusInitial>upload</button>\n  </mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/upload/upload.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/upload/upload.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n    <div class=\"row\">\n      <div class=\"col-md-12\" >\n  <ngx-file-drop dropZoneLabel=\"Drop files here\" (onFileDrop)=\"dropped($event)\" \n  (onFileOver)=\"fileOver($event)\" (onFileLeave)=\"fileLeave($event)\">\n      <ng-template accept=\"ns\" multiple=\"false\" ngx-file-drop-content-tmp let-openFileSelector=\"openFileSelector\">\n        <div > Drag & drop a file. or Click on \n        <span (click)=\"openFileSelector()\" style=\"cursor: pointer;\"><u>Browse Files</u></span> to upload.\n        </div>\n      \n      </ng-template>\n  </ngx-file-drop>\n</div>\n</div>\n<br>\n<div class=\"row\" >\n  <div class=\"col-md-12\">\n    <table class=\"table\">\n      <thead class=\"upload-name\">\n          <tr >\n            <th style=\"min-width:150px\">Sr.</th>\n              <th style=\"min-width:150px\">Name</th>\n              <th style=\"min-width:150px\"></th>\n          </tr>\n      </thead>\n      <tbody class=\"upload-name\"  *ngIf=\"files.length!=0\">\n          <tr *ngFor=\"let item of files; let i=index\" >\n            <td>{{i+1}}</td>\n              <td><strong>{{ item.relativePath }}</strong></td>\n              <td>\n                <i class=\"fas fa-eye pointer\" (click)=\"preview(item)\"></i>\n                <i class=\"fas fa-upload pointer\" (click)=\"upload(item)\"></i>\n                <i class=\"far fa-trash-alt pointer\" (click)=\"delete(i)\"></i></td>\n\n          </tr>\n      </tbody>\n      <tbody class=\"upload-name\"  *ngIf=\"files.length==0\">\n        <tr >\n          <td colspan=\"3\" ><span ><i>No file found.</i> </span></td>\n            \n\n        </tr>\n    </tbody>\n \n  </table>\n    </div>\n</div>\n\n");

/***/ }),

/***/ "./src/app/pages/hlbparser/common/editor-service.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/hlbparser/common/editor-service.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");


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
            }
            else {
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
                    if (element.retain != undefined)
                        position = element.retain;
                    if (element.insert != undefined) {
                        position += element.insert.length;
                        if (element.insert == '\n')
                            instance.pressedEntered();
                        if (element.insert == '\t')
                            tabFlag = true;
                    }
                    if (element.delete != undefined)
                        delFlag = true;
                });
            }
            var index = instance.quill.getText().length - 1;
            var text = instance.quill.getText().substr(0, index);
            instance.index = position;
            //console.log("value of index inside:"+instance.index);
            if (!tabFlag) {
                instance.currentSentence(text, position);
                instance.currentWord(text, position);
            }
            else {
                if (!delFlag)
                    setTimeout(function () { instance.pressedTab(); }, 50);
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
        var remainingSentences = this.getRemainingSentences(text, position);
        ////console.log(remainingSentences);
        var obj = {
            currentSentence: sentence,
            remainingSentences: remainingSentences
        };
        if (sentence.length == 0 || sentence.charAt(sentence.length - 1) == " ")
            this.currentsentence.next(obj);
    }
    getRemainingSentences(str, pos) {
        str = String(str);
        pos = Number(pos) >>> 0;
        var left = str.slice(0, pos).search(/\n.*$/);
        var list = [];
        var temp;
        ////console.log(left);
        if (left > 0) {
            temp = str.slice(0, left).split("\n");
            temp.forEach(element => {
                if (element.trim() != '')
                    list.push(element);
            });
        }
        temp = str.slice(left + 1).split("\n");
        temp.splice(0, 1);
        temp.forEach(element => {
            if (element.trim() != '')
                list.push(element);
        });
        return list;
    }
    getWordAt(str, pos) {
        str = String(str);
        pos = Number(pos) >>> 0;
        var left = str.slice(0, pos).search(/\S+$/), right = str.slice(pos).search(/\s/);
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
            }
            //console.log("::"+text);
            this.quill.insertText(this.index, text + " ");
            //console.log("value of index before:"+this.index);
        }
        else
            this.replaceText(this.quill.getText(), text, word, flag);
    }
    replaceText(str, text, word, flag) {
        str = String(str);
        var pos;
        if (flag)
            pos = Number(this.index - 1) >>> 0;
        else
            pos = Number(this.index) >>> 0;
        var left = str.slice(0, pos).search(/\S+$/);
        if (flag)
            this.quill.deleteText(left, word.length + 1);
        else
            this.quill.deleteText(left, word.length);
        let t = this.quill.insertText(left, text + " ");
        //console.log("h");
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


/***/ }),

/***/ "./src/app/pages/hlbparser/common/text-filter.pipe.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/hlbparser/common/text-filter.pipe.ts ***!
  \************************************************************/
/*! exports provided: TextFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFilterPipe", function() { return TextFilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../state-service.service */ "./src/app/state-service.service.ts");



let TextFilterPipe = class TextFilterPipe {
    constructor(state) {
        this.state = state;
    }
    transform(items, filter1) {
        var filter = filter1.text;
        var option = filter1.name;
        if (!items || !filter) {
            if (items.length > 0) {
                if (option == 'behavior')
                    this.state.setCurrentBehaviorWord(items[0].value);
                else if (option == 'constraint')
                    this.state.setCurrentConstraintWord(items[0].value);
            }
            else {
                if (option == 'behavior')
                    this.state.setCurrentBehaviorWord("");
                else if (option == 'constraint')
                    this.state.setCurrentConstraintWord("");
            }
            return items;
        }
        if (filter.trim() === "") {
            if (items.length > 0) {
                if (option == 'behavior')
                    this.state.setCurrentBehaviorWord(items[0].value);
                else if (option == 'constraint')
                    this.state.setCurrentConstraintWord(items[0].value);
            }
            else {
                if (option == 'behavior')
                    this.state.setCurrentBehaviorWord("");
                else if (option == 'constraint')
                    this.state.setCurrentConstraintWord("");
            }
            return items;
        }
        else {
            var filterList = items.filter((item) => item.value.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) > -1);
            if (filterList.length > 0) {
                if (option == 'behavior')
                    this.state.setCurrentBehaviorWord(filterList[0].value);
                else if (option == 'constraint')
                    this.state.setCurrentConstraintWord(filterList[0].value);
            }
            else {
                if (option == 'behavior')
                    this.state.setCurrentBehaviorWord("");
                else if (option == 'constraint')
                    this.state.setCurrentConstraintWord("");
            }
            return filterList;
        }
    }
};
TextFilterPipe.ctorParameters = () => [
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"] }
];
TextFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'textfilter',
        pure: false
    })
], TextFilterPipe);



/***/ }),

/***/ "./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".chart-container {\n  width: 100%;\n  height: 100%;\n  background-color: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvaGxicGFyc2VyL2RlcGVuZGVuY3ktZ3JhcGgvZGVwZW5kZW5jeS1ncmFwaC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvaGxicGFyc2VyL2RlcGVuZGVuY3ktZ3JhcGgvZGVwZW5kZW5jeS1ncmFwaC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2hsYnBhcnNlci9kZXBlbmRlbmN5LWdyYXBoL2RlcGVuZGVuY3ktZ3JhcGguY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2hhcnQtY29udGFpbmVye1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufSIsIi5jaGFydC1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.ts ***!
  \********************************************************************************/
/*! exports provided: DependencyGraphComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DependencyGraphComponent", function() { return DependencyGraphComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let DependencyGraphComponent = class DependencyGraphComponent {
};
DependencyGraphComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'dependency-graph',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./dependency-graph.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./dependency-graph.component.scss */ "./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.scss")).default]
    })
], DependencyGraphComponent);



/***/ }),

/***/ "./src/app/pages/hlbparser/experiment-info/info.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/hlbparser/experiment-info/info.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".profile_img img {\n  vertical-align: middle;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  margin: 4px;\n}\n\n.action_menu ul {\n  list-style-type: none;\n  padding-left: 2rem;\n  margin: 0;\n  border-bottom: 1px solid #ccc;\n  overflow: hidden;\n}\n\n.action_menu ul li {\n  float: left;\n}\n\n.action_menu ul li i {\n  display: block;\n  color: black;\n  text-align: center;\n  padding: 0.31rem;\n  text-decoration: none;\n}\n\n.action_menu ul li i:hover {\n  background-color: #ccc;\n}\n\n.pointer {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvaGxicGFyc2VyL2V4cGVyaW1lbnQtaW5mby9pbmZvLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wYWdlcy9obGJwYXJzZXIvZXhwZXJpbWVudC1pbmZvL2luZm8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFSSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFFQSxXQUFBO0FDREo7O0FESUE7RUFDRSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7QUNERjs7QURHQTtFQUNJLFdBQUE7QUNBSjs7QURHQTtFQUNJLGNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FDQUo7O0FER0E7RUFDSSxzQkFBQTtBQ0FKOztBREdFO0VBQ0ksZUFBQTtBQ0FOIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvaGxicGFyc2VyL2V4cGVyaW1lbnQtaW5mby9pbmZvLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2ZpbGVfaW1nIGltZ3tcbiAgXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB3aWR0aDogNDBweDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBcbiAgICBtYXJnaW46IDRweDtcbn1cblxuLmFjdGlvbl9tZW51IHVse1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMnJlbTtcbiAgbWFyZ2luOiAwO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi5hY3Rpb25fbWVudSB1bCBsaXtcbiAgICBmbG9hdDogbGVmdDtcbn1cblxuLmFjdGlvbl9tZW51IHVsIGxpIGkge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogLjMxcmVtO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuICBcbi5hY3Rpb25fbWVudSB1bCBsaSBpOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICB9XG5cbiAgLnBvaW50ZXJ7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH0iLCIucHJvZmlsZV9pbWcgaW1nIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBtYXJnaW46IDRweDtcbn1cblxuLmFjdGlvbl9tZW51IHVsIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBwYWRkaW5nLWxlZnQ6IDJyZW07XG4gIG1hcmdpbjogMDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5hY3Rpb25fbWVudSB1bCBsaSB7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG4uYWN0aW9uX21lbnUgdWwgbGkgaSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogYmxhY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMC4zMXJlbTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG4uYWN0aW9uX21lbnUgdWwgbGkgaTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG59XG5cbi5wb2ludGVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/hlbparser/experiment-info/info.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/hlbparser/experiment-info/info.component.ts ***!
  \*******************************************************************/
/*! exports provided: InfoComponent, AddUserPopUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoComponent", function() { return InfoComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUserPopUp", function() { return AddUserPopUp; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../state-service.service */ "./src/app/state-service.service.ts");
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/@auth/auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/http-service.service */ "./src/app/http-service.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");










let InfoComponent = class InfoComponent {
    constructor(state, auth, dialog, http, route) {
        this.state = state;
        this.auth = auth;
        this.dialog = dialog;
        this.http = http;
        this.route = route;
        this.experiment = {
            userId: this.auth.getCookie("userId"),
            name: "",
            description: "",
            behaviors: [],
            actors: [],
            bindings: [],
            constraints: [],
        };
        this.tokenList = [];
        this.options = ["One", "Two", "Three"];
        this.userAccessList = [];
        this.nameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.experimentControl = 4;
    }
    ngOnInit() {
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
        this.state.getExperimentControl().subscribe(data => {
            this.experimentControl = data;
        });
        if (this.experimentControl > 3) {
            this.loadTokenList();
            this.state.getTokenList().subscribe((data) => {
                if (data != null) {
                    this.tokenList = data;
                }
            });
            this.getUserAccessList();
        }
    }
    isExperimentDisabled() {
        return this.experimentControl == 2;
    }
    getUserAccessList() {
        var params = {
            experiment_id: this.experiment['id'],
            userId: this.experiment.userId
        };
        this.http.post("api/v1/user/getUserAccessList/", params).subscribe(data => {
            if (data.userList != undefined && data.userList != null)
                this.userAccessList = data.userList;
            else
                this.userAccessList = [];
        });
    }
    setExperimentName() {
        this.state.setExperimentName(this.experiment.name);
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
        if (this.experiment.name != undefined &&
            this.experiment.name != null &&
            this.experiment.name.trim() != "") {
            if (this.experiment.description == undefined ||
                this.experiment.description == null)
                this.experiment.description = "";
            if (this.experiment.behaviors == undefined ||
                this.experiment.behaviors == null)
                this.experiment.behaviors = [];
            if (this.experiment.actors == undefined || this.experiment.actors == null)
                this.experiment.actors = [];
            if (this.experiment.bindings == undefined ||
                this.experiment.bindings == null)
                this.experiment.bindings = [];
            if (this.experiment.constraints == undefined ||
                this.experiment.constraints == null)
                this.experiment.constraints = [];
            var bindingFLag = false;
            if (this.experiment.bindings.length != 0) {
                this.experiment.bindings.forEach(element => {
                    var list = element.trim().split(" ");
                    var key = list[0];
                    var value = list.splice(1).join(" ");
                    if (value.trim() == '')
                        bindingFLag = true;
                });
            }
            if (bindingFLag)
                var continueFlag = confirm("Few bindings are missing, Do you still want to continue?");
            else
                continueFlag = !bindingFLag;
            if (continueFlag)
                this.http.put("v1/persist/save", this.experiment).subscribe((data) => {
                    if (data.saved) {
                        alert("Successfully saved!");
                        this.route.navigate(["pages/dashboard"]);
                    }
                }, (error) => {
                    alert("Error occured. Please try again later");
                });
        }
        else {
            alert("Please Enter Name to save the experiment.");
            this.nameControl.markAsTouched();
        }
        console.log(this.experiment);
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
    addUserPopUp() {
        let t = this.experiment.userId;
        console.log(t);
        var dialogRef = this.dialog.open(AddUserPopUp, {
            width: "40%",
            data: t
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result != undefined)
                this.addUser(result);
        });
    }
    addUser(userobj) {
        var params = {
            "userId": this.experiment.userId,
            "userHandle": userobj.handle,
            "id": this.experiment["id"],
            "accessLevel": userobj.access
        };
        this.http.post("api/v1/persist/experiment/grantaccess", params).subscribe(data => {
            console.log(data);
            if (data.error != undefined && data.error != null)
                alert("Error in granting access.");
            else
                this.getUserAccessList();
        }, error => {
            alert("Error in granting access.");
        });
    }
    deleteUser(user) {
        var header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpHeaders"]({ 'Content-Type': 'application/json' }),
            body: {
                userId: this.experiment.userId,
                id: this.experiment['id'],
                userHandle: user.handle
            }
        };
        this.http.delete("v1/persist/experiment/removeaccess", header).subscribe(data => {
            alert("User is removed.");
            this.getUserAccessList();
        }, error => {
            alert('There is some error while deleting the experiment. Please try again after sometime.');
        });
    }
    delete() {
        var header = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpHeaders"]({ 'Content-Type': 'application/json' }),
            body: {
                userId: this.experiment.userId,
                id: this.experiment['id']
            }
        };
        this.http.delete("v1/persist/experiment/delete", header).subscribe(data => {
            alert("experiment is delete.");
            this.route.navigate(["/pages/dashboard"]);
        }, error => {
            alert('There is some error while deleting the experiment. Please try again after sometime.');
        });
    }
};
InfoComponent.ctorParameters = () => [
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"] },
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialog"] },
    { type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], InfoComponent.prototype, "id", void 0);
InfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "experiment-info",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./info.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/experiment-info/info.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./info.component.scss */ "./src/app/pages/hlbparser/experiment-info/info.component.scss")).default]
    })
], InfoComponent);

let AddUserPopUp = class AddUserPopUp {
    constructor(dialogRef, http, token) {
        this.dialogRef = dialogRef;
        this.http = http;
        this.token = token;
        this.userHandleSelect = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.accessLevelControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.UserObj = {
            handle: "",
            access: ""
        };
        this.options = [{ name: 'Read', value: '2' }, { name: 'Write', value: '3' }, { name: 'Manage', value: '4' }];
        this.userOptions = [];
    }
    ngOnInit() {
        this.http.get("v1/user/getUserHandles/" + this.token).subscribe(data => {
            //console.log(data);
            this.userOptions = [];
            if (data.userList != undefined && data.userList != null)
                data.userList.forEach(element => {
                    this.userOptions.push({ name: element['name'], value: element.handle });
                });
        });
        this.filteredUserHandle = this.userHandleSelect.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])((value) => this._filter(value, this.userOptions)));
        this.filteredLevels = this.accessLevelControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])((value) => this._filter(value, this.options)));
    }
    onNoClick() {
        this.dialogRef.close();
    }
    isAddDisabled() {
        let flag = true;
        if (this.UserObj.handle.trim() != '' && this.UserObj.access.trim() != '')
            flag = false;
        return flag;
    }
    _filter(value, options) {
        const filterValue = value.toLowerCase();
        return options.filter((option) => option.name.toLowerCase().includes(filterValue));
    }
};
AddUserPopUp.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialogRef"] },
    { type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_8__["MAT_DIALOG_DATA"],] }] }
];
AddUserPopUp = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "add-user",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./add-user.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/experiment-info/add-user.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./info.component.scss */ "./src/app/pages/hlbparser/experiment-info/info.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MAT_DIALOG_DATA"]))
], AddUserPopUp);



/***/ }),

/***/ "./src/app/pages/hlbparser/hlb/hlb.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/hlbparser/hlb/hlb.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".behavior-list {\n  margin: 0.1em;\n  list-style: none;\n  padding: 0;\n}\n\n.behavior-box {\n  margin: 0.5em;\n  border: 1px solid #ccc;\n  padding: 0.5em;\n}\n\n.word-bubble {\n  border: 1px dotted black;\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.actor_example_color {\n  color: orange;\n}\n\n.binding_example_color {\n  color: green;\n}\n\n.binding-word-bubble {\n  border: 1px solid black;\n  float: left;\n  margin: 2px;\n  border-radius: 8px;\n  padding: 3px;\n}\n\n.word-bubble-button {\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n}\n\n.float-left {\n  float: left;\n}\n\n.actions {\n  float: right;\n  cursor: pointer;\n  display: none;\n}\n\n.behavior-list:hover .actions {\n  display: block;\n}\n\n.disabled {\n  pointer-events: none;\n}\n\n.grabbable {\n  cursor: move;\n  /* fallback if grab cursor is unsupported */\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n/* (Optional) Apply a \"closed-hand\" cursor during drag operation. */\n\n.grabbable:active {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n\n.mat-radio-button ~ .mat-radio-button {\n  margin-left: 16px;\n}\n\n.padding-left-right {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.button-padding {\n  margin-left: 0.1em;\n}\n\n.expand {\n  float: right;\n  cursor: pointer;\n}\n\n.hide {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvaGxicGFyc2VyL2hsYi9obGIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2hsYnBhcnNlci9obGIvaGxiLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREdBO0VBQ0ksd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQ0FKOztBRElBO0VBQ0ksYUFBQTtBQ0RKOztBRElBO0VBQ0ksWUFBQTtBQ0RKOztBRElBO0VBQ0ksdUJBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0RKOztBREdBO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQ0FKOztBREdBO0VBQ0ksV0FBQTtBQ0FKOztBREdBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FDQUo7O0FER0E7RUFDSSxjQUFBO0FDQUo7O0FER0E7RUFDSSxvQkFBQTtBQ0FKOztBREdBO0VBQ0ksWUFBQTtFQUFjLDJDQUFBO0VBQ2QsWUFBQTtFQUVBLG9CQUFBO0FDQ0o7O0FERUMsbUVBQUE7O0FBQ0Q7RUFDSSxnQkFBQTtFQUVBLHdCQUFBO0FDQ0o7O0FERUE7RUFDSSxpQkFBQTtBQ0NKOztBREVFO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQ0NOOztBREdFO0VBQ0ksa0JBQUE7QUNBTjs7QURHRTtFQUNJLFlBQUE7RUFDQSxlQUFBO0FDQU47O0FER0U7RUFDSSxhQUFBO0FDQU4iLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9obGJwYXJzZXIvaGxiL2hsYi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iZWhhdmlvci1saXN0e1xuICAgIG1hcmdpbjouMWVtO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbn1cblxuLmJlaGF2aW9yLWJveHtcbiAgICBtYXJnaW46IC41ZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBwYWRkaW5nOiAuNWVtO1xufVxuXG5cbi53b3JkLWJ1YmJsZXtcbiAgICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIHBhZGRpbmc6IDAuNGVtO1xuICAgIG1hcmdpbjogMC4xZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuIFxufVxuXG4uYWN0b3JfZXhhbXBsZV9jb2xvcntcbiAgICBjb2xvcjogb3JhbmdlXG59XG5cbi5iaW5kaW5nX2V4YW1wbGVfY29sb3J7XG4gICAgY29sb3I6IGdyZWVuXG59XG5cbi5iaW5kaW5nLXdvcmQtYnViYmxle1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIG1hcmdpbjogMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nOiAzcHg7XG59XG4ud29yZC1idWJibGUtYnV0dG9ue1xuICAgIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgICBwYWRkaW5nOiAwLjRlbTtcbiAgICBtYXJnaW46IDAuMWVtO1xuIFxufVxuLmZsb2F0LWxlZnR7XG4gICAgZmxvYXQ6bGVmdDtcbn1cblxuLmFjdGlvbnN7XG4gICAgZmxvYXQ6cmlnaHQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5iZWhhdmlvci1saXN0OmhvdmVyIC5hY3Rpb25ze1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uZGlzYWJsZWR7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7ICAgXG59XG5cbi5ncmFiYmFibGUge1xuICAgIGN1cnNvcjogbW92ZTsgLyogZmFsbGJhY2sgaWYgZ3JhYiBjdXJzb3IgaXMgdW5zdXBwb3J0ZWQgKi9cbiAgICBjdXJzb3I6IGdyYWI7XG4gICAgY3Vyc29yOiAtbW96LWdyYWI7XG4gICAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XG59XG5cbiAvKiAoT3B0aW9uYWwpIEFwcGx5IGEgXCJjbG9zZWQtaGFuZFwiIGN1cnNvciBkdXJpbmcgZHJhZyBvcGVyYXRpb24uICovXG4uZ3JhYmJhYmxlOmFjdGl2ZSB7XG4gICAgY3Vyc29yOiBncmFiYmluZztcbiAgICBjdXJzb3I6IC1tb3otZ3JhYmJpbmc7XG4gICAgY3Vyc29yOiAtd2Via2l0LWdyYWJiaW5nO1xufVxuXG4ubWF0LXJhZGlvLWJ1dHRvbiB+IC5tYXQtcmFkaW8tYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogMTZweDtcbiAgfVxuXG4gIC5wYWRkaW5nLWxlZnQtcmlnaHR7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgfVxuXG4gXG4gIC5idXR0b24tcGFkZGluZ3tcbiAgICAgIG1hcmdpbi1sZWZ0OiAuMWVtO1xuICB9XG5cbiAgLmV4cGFuZHtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5oaWRle1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgfSIsIi5iZWhhdmlvci1saXN0IHtcbiAgbWFyZ2luOiAwLjFlbTtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLmJlaGF2aW9yLWJveCB7XG4gIG1hcmdpbjogMC41ZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmc6IDAuNWVtO1xufVxuXG4ud29yZC1idWJibGUge1xuICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgcGFkZGluZzogMC40ZW07XG4gIG1hcmdpbjogMC4xZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFjdG9yX2V4YW1wbGVfY29sb3Ige1xuICBjb2xvcjogb3JhbmdlO1xufVxuXG4uYmluZGluZ19leGFtcGxlX2NvbG9yIHtcbiAgY29sb3I6IGdyZWVuO1xufVxuXG4uYmluZGluZy13b3JkLWJ1YmJsZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luOiAycHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogM3B4O1xufVxuXG4ud29yZC1idWJibGUtYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xuICBwYWRkaW5nOiAwLjRlbTtcbiAgbWFyZ2luOiAwLjFlbTtcbn1cblxuLmZsb2F0LWxlZnQge1xuICBmbG9hdDogbGVmdDtcbn1cblxuLmFjdGlvbnMge1xuICBmbG9hdDogcmlnaHQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmJlaGF2aW9yLWxpc3Q6aG92ZXIgLmFjdGlvbnMge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmRpc2FibGVkIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5ncmFiYmFibGUge1xuICBjdXJzb3I6IG1vdmU7XG4gIC8qIGZhbGxiYWNrIGlmIGdyYWIgY3Vyc29yIGlzIHVuc3VwcG9ydGVkICovXG4gIGN1cnNvcjogZ3JhYjtcbiAgY3Vyc29yOiAtbW96LWdyYWI7XG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xufVxuXG4vKiAoT3B0aW9uYWwpIEFwcGx5IGEgXCJjbG9zZWQtaGFuZFwiIGN1cnNvciBkdXJpbmcgZHJhZyBvcGVyYXRpb24uICovXG4uZ3JhYmJhYmxlOmFjdGl2ZSB7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG4gIGN1cnNvcjogLW1vei1ncmFiYmluZztcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWJiaW5nO1xufVxuXG4ubWF0LXJhZGlvLWJ1dHRvbiB+IC5tYXQtcmFkaW8tYnV0dG9uIHtcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XG59XG5cbi5wYWRkaW5nLWxlZnQtcmlnaHQge1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuXG4uYnV0dG9uLXBhZGRpbmcge1xuICBtYXJnaW4tbGVmdDogMC4xZW07XG59XG5cbi5leHBhbmQge1xuICBmbG9hdDogcmlnaHQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmhpZGUge1xuICBkaXNwbGF5OiBub25lO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/hlbparser/hlb/hlb.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/hlbparser/hlb/hlb.component.ts ***!
  \******************************************************/
/*! exports provided: HlbComponent, BindingPopUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HlbComponent", function() { return HlbComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BindingPopUp", function() { return BindingPopUp; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm2015/drag-drop.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/editor-service */ "./src/app/pages/hlbparser/common/editor-service.ts");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../state-service.service */ "./src/app/state-service.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/http-service.service */ "./src/app/http-service.service.ts");









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
            text: "",
        };
        this.constraintTextFilter = {
            name: "constraint",
            text: "",
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
        this.experimentAccess = 4;
    }
    ngOnInit() {
        this.bindingMap = new Map();
        this.behaviorList = [];
        const instance = this;
        this.stateservice.getBehavior().subscribe((data) => {
            if (data != null) {
                var text = "";
                data.forEach((element) => {
                    text += element + "<br>";
                });
                instance.behaviorText = text;
            }
        });
        this.stateservice.getBindings().subscribe((data) => {
            if (data != null) {
                //console.log(data);
                this.bindingList = [];
                this.bindingMap = new Map();
                data.forEach((element) => {
                    var list = element.trim().split(" ");
                    var key = list[0];
                    var value = list.splice(1);
                    value = value.join(" ");
                    var t = { key: key, value: value };
                    this.bindingMap.set(key, t);
                    this.bindingList.push(t);
                });
                //this.storeBinding()
                //console.log(this.bindingMap);
            }
        });
        this.stateservice.getActors().subscribe((data) => {
            // //console.log(data);
            if (data != null) {
                instance.actorsList = [];
                data.forEach((element) => {
                    this.actorsList.push({ text: element });
                });
            }
        });
        this.stateservice.getConstraints().subscribe((data) => {
            // //console.log(data);
            if (data != null) {
                var text = "";
                data.forEach((element) => {
                    text += element + "<br>";
                });
                instance.constraintText = text;
            }
        });
        this.stateservice.getExperimentControl().subscribe(flag => {
            this.experimentAccess = flag;
        });
    }
    isExperimentDisabled() { return this.experimentAccess == 2; }
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
                this.behaviorService.isBlur().subscribe((data) => {
                    if (data && instance.behaviorService.isTextChanged())
                        this.updateActors();
                    if (!data)
                        this.textBoxId = 2;
                    else
                        this.textBoxId = -1;
                });
                this.behaviorService.isEnterPressed().subscribe((flag) => {
                    if (flag && instance.behaviorService.isTextChanged()) {
                        if (this.behaviorService.getText().trim() === "")
                            return;
                        var index = this.behaviorService.getText().length - 2;
                        if (this.behaviorService.getText().charAt(index) == "\n")
                            this.updateActors();
                    }
                });
                this.behaviorService.isTabPressed().subscribe((flag) => {
                    if (flag) {
                        //console.log("inside istab");
                        if (this.stateservice.getCurrentBehaviorWord().trim() != "")
                            this.insertValue(this.stateservice.getCurrentBehaviorWord(), true);
                        //this.behaviorService
                    }
                });
                this.behaviorService.getSuggestionData().subscribe((data) => {
                    if (data != null) {
                        var params = {
                            type: "behavior",
                            suggestion_for: data.currentSentence,
                            behaviors: data.remainingSentences,
                            constraints: [],
                            actors: [],
                        };
                        var constraints = this.constraintService.getText().trim();
                        if (constraints != "") {
                            var constraintsList = constraints.split("\n");
                            params.constraints = constraintsList;
                        }
                        this.behaviorTextFilter.text = "";
                        this.http.put("v1/hlb/suggestions", params).subscribe((data) => {
                            var list = [];
                            data.suggestions.forEach((element) => {
                                list.push({ value: element, flag: false });
                            });
                            if (data.suggestion_text.trim() != "")
                                this.suggestionbehaviorMessage = data.suggestion_text;
                            else
                                this.suggestionbehaviorMessage = null;
                            this.behaviorWordList = list;
                            this.changeDetection.detectChanges();
                        });
                    }
                });
                this.behaviorService.getCurrentWord().subscribe((data) => {
                    //console.log(data);
                    if (data != null && data.trim()) {
                        this.behaviorTextFilter.text = data;
                    }
                });
                break;
            case 3:
                this.constraintService = editor.getModule("counter");
                this.constraintService.isBlur().subscribe((data) => {
                    if (data && instance.constraintService.isTextChanged())
                        this.updateActorsConstraint();
                    if (!data)
                        this.textBoxId = 3;
                    else
                        this.textBoxId = -1;
                });
                this.constraintService.isEnterPressed().subscribe((flag) => {
                    if (flag && instance.constraintService.isTextChanged()) {
                        if (this.constraintService.getText().trim() === "")
                            return;
                        var index = this.constraintService.getText().length - 2;
                        if (this.constraintService.getText().charAt(index) == "\n")
                            this.updateActorsConstraint();
                    }
                });
                this.constraintService.isTabPressed().subscribe((flag) => {
                    if (flag) {
                        if (this.stateservice.getCurrentConstraintWord().trim() != "")
                            this.insertValueInConstraint(this.stateservice.getCurrentConstraintWord(), true);
                        //this.behaviorService
                    }
                });
                this.constraintService.getSuggestionData().subscribe((data) => {
                    if (data != null) {
                        var params = {
                            type: "constraint",
                            suggestion_for: data.currentSentence,
                            behaviors: [],
                            constraints: data.remainingSentences,
                            actors: [],
                        };
                        var behaviors = this.behaviorService.getText().trim();
                        if (behaviors != "") {
                            var behaviorsList = behaviors.split("\n");
                            params.behaviors = behaviorsList;
                        }
                        this.constraintTextFilter.text = "";
                        this.http.put("v1/hlb/suggestions", params).subscribe((data) => {
                            var list = [];
                            data.suggestions.forEach((element) => {
                                list.push({ value: element, flag: false });
                            });
                            if (data.suggestion_text.trim() != "")
                                this.suggestionConstraintMessage = data.suggestion_text;
                            else
                                this.suggestionConstraintMessage = null;
                            this.constraintWordList = list;
                            this.changeDetection.detectChanges();
                        });
                    }
                });
                this.constraintService.getCurrentWord().subscribe((data) => {
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
            Constraints: [],
        };
        this.behaviorList = [];
        var blist = this.behaviorService.getText().trim().split("\n");
        blist.forEach((element) => {
            var text = element.trim();
            if (text != "") {
                data.Scenario.push(text);
                this.behaviorList.push(text);
            }
        });
        this.stateservice.setBehavior(this.behaviorList);
        this.http.put("v1/hlb/parse", data).subscribe((data) => {
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
            Constraints: [],
        };
        this.contraintList = [];
        var blist = this.constraintService.getText().trim().split("\n");
        blist.forEach((element) => {
            var text = element.trim();
            if (text != "") {
                data.Constraints.push(text);
                this.contraintList.push(text);
            }
        });
        this.stateservice.setConstraints(this.contraintList);
        this.http.put("v1/hlb/parse", data).subscribe((data) => {
            //console.log(data);
            //   this.extractInfo(data);
        });
    }
    extractInfo(data) {
        this.extractScenario(data.parsedScenario);
        this.storeBinding();
    }
    extractScenario(scenario) {
        //console.log(scenario);
        // this.bindingMap = new Map<String,any>();
        this.actorsList = [];
        this.bindingList = [];
        var trigger = [];
        scenario.forEach((element) => {
            this.extractActors(element[1] != null ? element[1] : []);
            if (element[0] != null) {
                element[0].map((x) => {
                    if (!trigger.includes(x)) {
                        trigger.push(x);
                    }
                });
            }
            if (element[2] != null)
                element[2].map((x) => {
                    if (!trigger.includes(x)) {
                        trigger.push(x);
                    }
                });
            if (element[3] != null)
                element[3].map((x) => {
                    if (!trigger.includes(x)) {
                        trigger.push(x);
                    }
                });
        });
        this.extractEvents(trigger);
        // this.loadBindings();
        this.changeDetection.detectChanges();
    }
    isEmpty(binding) {
        if (binding.value == undefined)
            return true;
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
        if (triggers != null) {
            triggers.forEach((element) => {
                //console.log(element);
                if (!this.bindingMap.has(element)) {
                    var t = { key: element, value: "" };
                    this.bindingMap.set(element, t);
                    this.bindingList.push(t);
                }
                else {
                    this.bindingList.push(this.bindingMap.get(element));
                }
            });
        }
        //   if(actions!=null)
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
        // if (this.behaviorService.getText().trim() === "") return;
        // var index = this.behaviorService.getText().length-2;
        // if (this.behaviorService.getText().charAt(index) == '\n')
        //     this.updateActors();
    }
    logChangeConstraints(event) {
        // if (this.constraintService.getText().trim() === "") return;
        // //console.log(this.constraintService.getText().charAt(this.constraintService.getText().length-1))
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
        data.forEach((element) => {
            ////console.log(element);
            this.insertActor(element);
        });
        var alist = [];
        this.actorsList.forEach((element) => {
            alist.push(element.text);
        });
        this.stateservice.setActors(alist);
    }
    insertActor(actor) {
        var t = this.actorsList.find(function (element) {
            return element.text === actor;
        });
        // //console.log(t);
        if (t == undefined)
            this.actorsList.push({ text: actor });
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
            data: this.bindingList,
        });
        dialogRef.afterClosed().subscribe((result) => {
            //console.log('The dialog was closed');
            this.generateNs();
        });
    }
    generateNs() {
        var data = {
            actors: [],
            behaviors: [],
            constraints: [],
            bindings: [],
        };
        if (this.actorsList.length == 0)
            return;
        if (this.behaviorList.length == 0)
            return;
        this.actorsList.forEach((element) => {
            data.actors.push(element.text);
        });
        var flag = false;
        this.behaviorList.forEach((element) => {
            data.behaviors.push(element);
        });
        this.contraintList.forEach((element) => {
            data.constraints.push(element.text);
        });
        this.bindingList.forEach((element) => {
            if (element.value == null || element.value.trim() == "") {
                flag = true;
                return;
            }
            data.bindings.push(element.key + " " + element.value);
        });
        if (flag)
            return;
        this.stateservice.enableLoader();
        this.http.put("v1/hlb/generateNs", data, null).subscribe((data) => {
            //console.log(data);
            this.stateservice.disableLoader();
            this.downLoadFile(data.script);
            this._snackBar.open("Successfully Downloaded.", "close", {
                duration: 2000,
            });
            // this.stateservice.setBindings(data.Bindings);
        }, (error) => {
            this.stateservice.disableLoader();
            this._snackBar.open(error, "close", {
                duration: 2000,
            });
        });
    }
    storeBinding() {
        // console.log(this.bindingList);
        var binding = [];
        this.bindingList.forEach((element) => {
            binding.push(element.key.trim() + " " + element.value.trim());
        });
        this.stateservice.setBindings(binding);
    }
    downLoadFile(data) {
        var blob = new Blob([data], { type: "text/plain" });
        //console.log(blob);
        // var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var fileName = "experiment.txt";
        if ("msSaveOrOpenBlob" in navigator) {
            navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
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
};
HlbComponent.ctorParameters = () => [
    { type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_8__["HttpService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] },
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_5__["StateService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
];
HlbComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "hlb",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./hlb.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlb/hlb.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./hlb.component.scss */ "./src/app/pages/hlbparser/hlb/hlb.component.scss")).default]
    })
], HlbComponent);

let BindingPopUp = class BindingPopUp {
    constructor(dialogRef, bindingList) {
        this.dialogRef = dialogRef;
        this.bindingList = bindingList;
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
BindingPopUp.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MAT_DIALOG_DATA"],] }] }
];
BindingPopUp = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "hlb-binding",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./hlb-binding.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlb/hlb-binding.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./hlb.component.scss */ "./src/app/pages/hlbparser/hlb/hlb.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MAT_DIALOG_DATA"]))
], BindingPopUp);



/***/ }),

/***/ "./src/app/pages/hlbparser/hlbparser-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/hlbparser/hlbparser-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: HLBParserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLBParserRoutingModule", function() { return HLBParserRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _hlpparser_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hlpparser.component */ "./src/app/pages/hlbparser/hlpparser.component.ts");
/* harmony import */ var src_app_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/@auth/auth.guard */ "./src/app/@auth/auth.guard.ts");





const routes = [
    {
        path: "create/:id",
        canActivateChild: [src_app_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]],
        component: _hlpparser_component__WEBPACK_IMPORTED_MODULE_3__["HLBParserComponent"]
    },
    {
        path: 'create',
        redirectTo: 'create/',
        pathMatch: 'full',
    },
];
let HLBParserRoutingModule = class HLBParserRoutingModule {
};
HLBParserRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], HLBParserRoutingModule);



/***/ }),

/***/ "./src/app/pages/hlbparser/hlpparser.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/hlbparser/hlpparser.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".tab {\n  overflow: hidden;\n}\n\n.mat-tab-label, .mat-tab-link {\n  font-size: 12px !important;\n}\n\n.mat-tab-label {\n  min-width: 125px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvaGxicGFyc2VyL2hscHBhcnNlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvaGxicGFyc2VyL2hscHBhcnNlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FDQ0o7O0FERUE7RUFDSSwwQkFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2hsYnBhcnNlci9obHBwYXJzZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFie1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5tYXQtdGFiLWxhYmVsLCAubWF0LXRhYi1saW5re1xuICAgIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xufVxuXG4ubWF0LXRhYi1sYWJlbHtcbiAgICBtaW4td2lkdGg6IDEyNXB4ICFpbXBvcnRhbnQ7XG59IiwiLnRhYiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5tYXQtdGFiLWxhYmVsLCAubWF0LXRhYi1saW5rIHtcbiAgZm9udC1zaXplOiAxMnB4ICFpbXBvcnRhbnQ7XG59XG5cbi5tYXQtdGFiLWxhYmVsIHtcbiAgbWluLXdpZHRoOiAxMjVweCAhaW1wb3J0YW50O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/hlbparser/hlpparser.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/hlbparser/hlpparser.component.ts ***!
  \********************************************************/
/*! exports provided: HLBParserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLBParserComponent", function() { return HLBParserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/@auth/auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../state-service.service */ "./src/app/state-service.service.ts");
/* harmony import */ var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/http-service.service */ "./src/app/http-service.service.ts");






let HLBParserComponent = class HLBParserComponent {
    constructor(route, router, http, state, auth) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.state = state;
        this.auth = auth;
        this.viewFlag = false;
        this.menuList = [
            {
                name: "Information",
                id: 1,
                html: "<experiment-info></experiment-info>",
            },
            {
                name: "HLB",
                id: 2,
                html: "<hlb></hlb>",
            }
        ];
        this.experimentId = -1;
        this.experimentControl = 4;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params["id"] != "") {
                var input = {
                    userId: this.auth.getCookie("userId"),
                    id: params["id"],
                };
                this.experimentId = params["id"];
                this.state.enableLoader();
                this.http
                    .post("api/v1/persist/experiment/control", input)
                    .subscribe((controlData) => {
                    if (controlData.code != undefined && controlData.code != null) {
                        this.state.setExperimentControl(controlData.code);
                        this.experimentControl = controlData.code;
                        console.log(this.experimentControl);
                        this.http
                            .post("api/v1/persist/getExperimentById", input)
                            .subscribe((data) => {
                            this.enableView();
                            this.state.setActors(data.actors);
                            this.state.setExperimentName(data.name);
                            this.state.setExperimentDescription(data.description);
                            this.state.setBehavior(data.behaviors);
                            this.state.setBindings(data.bindings);
                            this.state.setConstraints(data.constraints);
                            this.state.disableLoader();
                        });
                    }
                    else {
                        alert("Don't have control for this experiment");
                        this.router.navigate(['pages/dashboard']);
                    }
                });
                return "";
            }
            else {
                this.enableView();
            }
        });
    }
    enableView() {
        let menu = [{
                name: "NLP",
                id: 3,
                html: "<nlp></nlp>",
            },
            {
                name: "Behavior Dependency Graph",
                id: 4,
                html: "<p>In Progress.....</p>",
            },
            {
                name: "Upload",
                id: 5,
                html: "<upload></upload>",
            },
        ];
        if (this.experimentControl > 2) {
            menu.forEach(item => {
                this.menuList.push(item);
            });
        }
        this.viewFlag = true;
    }
    isViewEnable() { return this.viewFlag; }
};
HLBParserComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"] },
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_4__["StateService"] },
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
];
HLBParserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "hlbparser",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./hlpparser.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/hlpparser.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./hlpparser.component.scss */ "./src/app/pages/hlbparser/hlpparser.component.scss")).default]
    })
], HLBParserComponent);



/***/ }),

/***/ "./src/app/pages/hlbparser/hlpparser.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/hlbparser/hlpparser.module.ts ***!
  \*****************************************************/
/*! exports provided: HLBParserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLBParserModule", function() { return HLBParserModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm2015/tabs.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm2015/expansion.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm2015/input.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm2015/card.js");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm2015/drag-drop.js");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm2015/angular-fontawesome.js");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../state-service.service */ "./src/app/state-service.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var ngx_file_drop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-file-drop */ "./node_modules/ngx-file-drop/fesm2015/ngx-file-drop.js");
/* harmony import */ var _hlpparser_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./hlpparser.component */ "./src/app/pages/hlbparser/hlpparser.component.ts");
/* harmony import */ var _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @swimlane/ngx-graph */ "./node_modules/@swimlane/ngx-graph/fesm2015/swimlane-ngx-graph.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _hlbparser_routing_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./hlbparser-routing.module */ "./src/app/pages/hlbparser/hlbparser-routing.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./hlb/hlb.component */ "./src/app/pages/hlbparser/hlb/hlb.component.ts");
/* harmony import */ var _nlp_nlp_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./nlp/nlp.component */ "./src/app/pages/hlbparser/nlp/nlp.component.ts");
/* harmony import */ var _common_text_filter_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./common/text-filter.pipe */ "./src/app/pages/hlbparser/common/text-filter.pipe.ts");
/* harmony import */ var _upload_upload_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./upload/upload.component */ "./src/app/pages/hlbparser/upload/upload.component.ts");
/* harmony import */ var src_app_auth_auth_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/@auth/auth.module */ "./src/app/@auth/auth.module.ts");
/* harmony import */ var _dependency_graph_dependency_graph_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./dependency-graph/dependency-graph.component */ "./src/app/pages/hlbparser/dependency-graph/dependency-graph.component.ts");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm2015/radio.js");
/* harmony import */ var _experiment_info_info_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./experiment-info/info.component */ "./src/app/pages/hlbparser/experiment-info/info.component.ts");


























let HLBParserModule = class HLBParserModule {
};
HLBParserModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        exports: [_hlpparser_component__WEBPACK_IMPORTED_MODULE_13__["HLBParserComponent"]],
        declarations: [
            _hlpparser_component__WEBPACK_IMPORTED_MODULE_13__["HLBParserComponent"],
            _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__["HlbComponent"],
            _nlp_nlp_component__WEBPACK_IMPORTED_MODULE_19__["NlpComponent"],
            _dependency_graph_dependency_graph_component__WEBPACK_IMPORTED_MODULE_23__["DependencyGraphComponent"],
            _common_text_filter_pipe__WEBPACK_IMPORTED_MODULE_20__["TextFilterPipe"],
            _upload_upload_component__WEBPACK_IMPORTED_MODULE_21__["UploadComponent"],
            _upload_upload_component__WEBPACK_IMPORTED_MODULE_21__["FilePreviewComponent"],
            _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__["BindingPopUp"],
            _experiment_info_info_component__WEBPACK_IMPORTED_MODULE_25__["InfoComponent"],
            _experiment_info_info_component__WEBPACK_IMPORTED_MODULE_25__["AddUserPopUp"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_15__["CommonModule"],
            src_app_auth_auth_module__WEBPACK_IMPORTED_MODULE_22__["AuthModule"].forRoot(),
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTooltipModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_24__["MatRadioModule"],
            _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_14__["NgxGraphModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSnackBarModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__["FontAwesomeModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
            _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__["DragDropModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
            ngx_quill__WEBPACK_IMPORTED_MODULE_8__["QuillModule"].forRoot(),
            _hlbparser_routing_module__WEBPACK_IMPORTED_MODULE_16__["HLBParserRoutingModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
            ngx_file_drop__WEBPACK_IMPORTED_MODULE_12__["NgxFileDropModule"]
        ],
        entryComponents: [_upload_upload_component__WEBPACK_IMPORTED_MODULE_21__["FilePreviewComponent"], _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__["BindingPopUp"], _experiment_info_info_component__WEBPACK_IMPORTED_MODULE_25__["AddUserPopUp"]],
        providers: [_state_service_service__WEBPACK_IMPORTED_MODULE_10__["StateService"]],
        bootstrap: [_hlpparser_component__WEBPACK_IMPORTED_MODULE_13__["HLBParserComponent"]]
    })
], HLBParserModule);



/***/ }),

/***/ "./src/app/pages/hlbparser/nlp/nlp.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/hlbparser/nlp/nlp.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".behavior-list {\n  margin: 0.1em;\n  list-style: none;\n  padding: 0;\n}\n\n.behavior-box {\n  margin: 0.5em;\n  border: 1px solid #ccc;\n  padding: 0.5em;\n}\n\n.word-bubble {\n  border: 1px dotted black;\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.word-bubble-button {\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.float-left {\n  float: left;\n}\n\n.actions {\n  float: right;\n}\n\n.disabled {\n  pointer-events: none;\n  background-color: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvaGxicGFyc2VyL25scC9ubHAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2hsYnBhcnNlci9ubHAvbmxwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBQ0ksd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQ0Esc0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2hsYnBhcnNlci9ubHAvbmxwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJlaGF2aW9yLWxpc3R7XG4gICAgbWFyZ2luOi4xZW07XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4uYmVoYXZpb3ItYm94e1xuICAgIG1hcmdpbjogLjVlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIHBhZGRpbmc6IC41ZW07XG59XG5cbi53b3JkLWJ1YmJsZXtcbiAgICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIHBhZGRpbmc6IDAuNGVtO1xuICAgIG1hcmdpbjogMC4xZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuIFxufVxuLndvcmQtYnViYmxlLWJ1dHRvbntcbiAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgcGFkZGluZzogMC40ZW07XG4gICAgbWFyZ2luOiAwLjFlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gXG59XG4uZmxvYXQtbGVmdHtcbiAgICBmbG9hdDpsZWZ0O1xufVxuXG4uYWN0aW9uc3tcbiAgICBmbG9hdDpyaWdodDtcbn1cblxuLmRpc2FibGVke1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG4iLCIuYmVoYXZpb3ItbGlzdCB7XG4gIG1hcmdpbjogMC4xZW07XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5iZWhhdmlvci1ib3gge1xuICBtYXJnaW46IDAuNWVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAwLjVlbTtcbn1cblxuLndvcmQtYnViYmxlIHtcbiAgYm9yZGVyOiAxcHggZG90dGVkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAxZW07XG4gIHBhZGRpbmc6IDAuNGVtO1xuICBtYXJnaW46IDAuMWVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi53b3JkLWJ1YmJsZS1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAxZW07XG4gIHBhZGRpbmc6IDAuNGVtO1xuICBtYXJnaW46IDAuMWVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mbG9hdC1sZWZ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5hY3Rpb25zIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuXG4uZGlzYWJsZWQge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/hlbparser/nlp/nlp.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/hlbparser/nlp/nlp.component.ts ***!
  \******************************************************/
/*! exports provided: NlpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NlpComponent", function() { return NlpComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_editor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/editor-service */ "./src/app/pages/hlbparser/common/editor-service.ts");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../state-service.service */ "./src/app/state-service.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/http-service.service */ "./src/app/http-service.service.ts");







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
            text: text.trim(),
        };
        this.stateservice.enableLoader();
        this.http.put("v1/nlp/behavior", data, null).subscribe((data) => {
            console.log(data);
            this.stateservice.disableLoader();
            this.stateservice.setBehavior(data.behavior);
            this.stateservice.setActors(data.actors);
            this.stateservice.setConstraints(data.constraints);
            this._snackBar.open("Successfully Translated.", "close", {
                duration: 2000,
            });
            // this.stateservice.setBindings(data.Bindings);
        }, (error) => {
            this.stateservice.disableLoader();
            this._snackBar.open(error, "close", {
                duration: 2000,
            });
        });
    }
    updateWordList() {
        this.localWordList = [];
        var dict = new Map();
        this.behaviorList.forEach((element) => {
            //console.log(element);
            var wordlist = element.text.trim().split(/\s/);
            wordlist.forEach((element) => {
                if (element.trim() !== "") {
                    if (!dict.has(element.trim())) {
                        this.localWordList.push({ value: element.trim() });
                        dict.set(element.trim(), true);
                    }
                }
            });
        });
        this.wordlist = this.wordlist.concat(this.localWordList);
    }
};
NlpComponent.ctorParameters = () => [
    { type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"] },
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_4__["StateService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] }
];
NlpComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "nlp",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./nlp.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/nlp/nlp.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./nlp.component.scss */ "./src/app/pages/hlbparser/nlp/nlp.component.scss")).default]
    })
], NlpComponent);



/***/ }),

/***/ "./src/app/pages/hlbparser/upload/upload.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/hlbparser/upload/upload.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".pointer {\n  cursor: pointer;\n  padding: 0.2em;\n}\n\n.cdk-overlay-pane {\n  max-width: 80%;\n}\n\n.upload-name {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvaGxicGFyc2VyL3VwbG9hZC91cGxvYWQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2hsYnBhcnNlci91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGNBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9obGJwYXJzZXIvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb2ludGVye1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAuMmVtO1xufVxuXG4uY2RrLW92ZXJsYXktcGFuZXtcbiAgICBtYXgtd2lkdGg6IDgwJTtcbn1cblxuLnVwbG9hZC1uYW1le1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iLCIucG9pbnRlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMC4yZW07XG59XG5cbi5jZGstb3ZlcmxheS1wYW5lIHtcbiAgbWF4LXdpZHRoOiA4MCU7XG59XG5cbi51cGxvYWQtbmFtZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/hlbparser/upload/upload.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/hlbparser/upload/upload.component.ts ***!
  \************************************************************/
/*! exports provided: UploadComponent, FilePreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePreviewComponent", function() { return FilePreviewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../state-service.service */ "./src/app/state-service.service.ts");
/* harmony import */ var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/http-service.service */ "./src/app/http-service.service.ts");






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
            this.files.push(droppedFile);
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry;
                fileEntry.file((file) => {
                    this.filename = file.name;
                    // Here you can access the real file
                    var reader = new FileReader();
                    reader.onload = () => {
                        // console.log(reader.result);
                    };
                    reader.readAsText(file);
                    //  console.log(  );
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
            }
            else {
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
            duration: 2000,
        });
        this.files.splice(index, 1);
    }
    upload(item) {
        const fileEntry = item.fileEntry;
        this.state.enableLoader();
        fileEntry.file((file) => {
            const formData = new FormData();
            formData.append("file", file);
            this.http
                .put("v1/upload/dew", formData, { responseType: "blob" })
                .subscribe((data) => {
                this.state.disableLoader();
                if (data.behaviors != undefined) {
                    this.state.setActors(data.actors);
                    this.state.setBehavior(data.behaviors);
                    this.state.setBindings(data.bindings);
                    // this.state.setBindings(data.constraints);
                    this._snackBar.open("File name " + fileEntry.name + " is uploaded!", "Close", {
                        duration: 2000,
                    });
                }
                else {
                    this._snackBar.open("Error in uploading file name " + fileEntry.name, "Close", {
                        duration: 2000,
                    });
                }
            }, (error) => {
                this.state.disableLoader();
            });
        });
        //   alert(fileEntry.name+" is uploaded!");
    }
    preview(item) {
        const dialogRef = this.dialog.open(FilePreviewComponent, {
            data: item.fileEntry,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
    }
};
UploadComponent.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
    { type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"] },
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_4__["StateService"] }
];
UploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "upload",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./upload.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/upload/upload.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./upload.component.scss */ "./src/app/pages/hlbparser/upload/upload.component.scss")).default]
    })
], UploadComponent);

let FilePreviewComponent = class FilePreviewComponent {
    constructor(dialogRef, file) {
        this.dialogRef = dialogRef;
        this.file = file;
        var t = this;
        file.file((file) => {
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
FilePreviewComponent.ctorParameters = () => [
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
];
FilePreviewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "file-preview",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./file.preview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/hlbparser/upload/file.preview.component.html")).default,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]))
], FilePreviewComponent);



/***/ })

}]);
//# sourceMappingURL=default~hlbparser-hlpparser-module~pages-pages-module-es2015.js.map