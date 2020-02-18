(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/@core/header/header.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/@core/header/header.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header\">\n  <nav class=\"navbar navbar-expand-lg static-top\" style=\"padding: 0;\">\n    <div class=\"container\">\n      <a class=\"navbar-brand\" href=\"#\">\n            <img src=\"./assets/isi_logo.gif\" class=\"img-thumbnail\" style=\"border:none;height: 35px;\" alt=\"\" >\n          </a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n            <span class=\"navbar-toggler-icon\"></span>\n          </button>\n      \n      <!-- <div class=\"navbar-nav pointer\" [matMenuTriggerFor]=\"menu\">\n        <div class=\"profile\"></div>\n        <span class=\"username\">Login / Sign Up!</span>\n        <mat-menu #menu=\"matMenu\">\n          <button mat-menu-item>Login</button>\n          <button mat-menu-item>Sign Up</button>\n        </mat-menu>\n      </div> -->\n\n    </div>\n    <!-- <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n        <ul class=\"navbar-nav ml-auto\">\n          <li class=\"nav-item active\">\n            <a class=\"nav-link\" href=\"#\">Home\n                  <span class=\"sr-only\">(current)</span>\n                </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">About</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">Services</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">Contact</a>\n          </li>\n        </ul>\n      </div> -->\n    \n  </nav>\n\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/@core/layout/layout.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/@core/layout/layout.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div class=\"row\" style=\"border-bottom: 1px solid #eee;\">\n  <div class=\"col-md-12\">\n    <header></header>\n \n  </div>\n\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n  <ng-content select=\"router-outlet\"></ng-content>\n</div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-pages></app-pages>\n<div *ngIf=\"loaderSwitch\" class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <mat-tab-group>\n    <mat-tab *ngFor=\"let x of menuList\" label=\"{{ x.name }}\">\n   <div *ngIf=\"x.id ==1\" class=\"tab\">\n        <hlb></hlb>\n      </div>\n\n      <div *ngIf=\"x.id ==2\" class=\"tab\">\n        <nlp></nlp>\n      </div>\n\n      <div *ngIf=\"x.id ==3\" class=\"tab\">\n        <dependency-graph></dependency-graph>\n      </div> \n\n      <div *ngIf=\"x.id ==4\" class=\"tab\">\n        <upload></upload>\n      </div> \n      \n    </mat-tab>\n  </mat-tab-group> \n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dependency-graph/dependency-graph.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dependency-graph/dependency-graph.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\">\n  <div class=\"col-md-12\" style=\"background-color: grey;\"> \n  <ngx-graph\n  class=\"chart-container\"\n  [view]=\"[500, 700]\"\n  [links]=\"[\n    {\n      id: 'a',\n      source: 'first',\n      target: 'second',\n      label: 'is parent of'\n    },{\n      id: 'b',\n      source: 'first',\n      target: 'third',\n      label: 'is parent of'\n    },{\n      id: 'c',\n      source: 'fourth',\n      target: 'first',\n      label: 'is parent of'\n    },{\n      id: 'd',\n      source: 'fourth',\n      target: 'third',\n      label: 'is parent of'\n    }\n    ,{\n      id: 'e',\n      source: 'fourth',\n      target: 'second',\n      label: 'is parent of'\n    }\n    ,{\n      id: 'f',\n      source: 'fourth',\n      target: 'fifth',\n      label: 'is parent of'\n    }\n  ]\"\n  [nodes]=\"[\n    {\n      id: 'first',\n      label: 'A'\n    }, {\n      id: 'second',\n      label: 'B'\n    }, {\n      id: 'third',\n      label: 'C'\n    }\n    , {\n      id: 'fourth',\n      label: 'D'\n    }\n    , {\n      id: 'fifth',\n      label: 'E'\n    }\n    , {\n      id: 'six',\n      label: 'F'\n    }\n  ]\"\n>\n\n</ngx-graph>\n</div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/hlb/hlb-binding.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/hlb/hlb-binding.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <h1 mat-dialog-title>Hi {{data.name}}</h1>\n<div mat-dialog-content>\n  <p>What's your favorite animal?</p>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"data.animal\">\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n  <button mat-button [mat-dialog-close]=\"data.animal\" cdkFocusInitial>Ok</button>\n</div> -->\n\n\n<div mat-dialog-content>\n<div class=\"row\" style=\"margin: .5em;\">\n    <div class=\"col-md-12\">\n    \n              \n        <div style=\"text-align: center;\">  Bindings</div> \n        \n          <hr>\n          <div *ngIf=\"bindingList.length==0\" style=\"font-size: .8em;text-align: center;\">\n            <span ><i>No Bindings Needed</i></span>\n          </div>\n            <div *ngIf=\"bindingList.length!=0\">\n          <ul  class=\"behavior-list \" >\n            <li class=\"binding-box\" *ngFor=\"let item of bindingList;let index=index\" ><div>\n            \n              <mat-form-field style=\"width:100%\">\n                <input matInput placeholder=\"{{item.key+' represents: '}}\" [(ngModel)]=\"item.value\">\n              </mat-form-field>\n\n              <span>\n              </span>\n             \n            </div>\n              </li>\n        </ul>\n        </div>\n\n        \n\n      </div>\n      </div></div>\n\n      <div mat-dialog-actions>\n        <button mat-button (click)=\"onNoClick()\">Back</button>\n        <button mat-button [mat-dialog-close]=\"bindingList\" cdkFocusInitial>Download</button>\n      </div> ");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/hlb/hlb.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/hlb/hlb.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n <div class=\"row\">\n<div class=\"col-md-9\">\n\n  \n    <div class=\"row\" style=\"margin: .5em;\">\n        <div class=\"col-md-12\" style=\"padding: 0;\">\n            <mat-card> \n               \n                 <div style=\"text-align: center;\">  Behavior</div> \n               <hr>\n               <div class=\"row\">\n               <div class=\"col-md-12\" (click)=\"selectTextBox(2)\">\n                  <div style=\"margin: .6em;\" [hidden]=\"!isEnable(2)\">\n                      <span>Suggestions:</span>\n                     \n                      <button type=\"button\" class=\"btn btn-outline-primary word-bubble-button\" *ngFor=\"let word of behaviorWordList | textfilter:behaviorTextFilter \"  (click)=\"insertValue(word.value)\" [disabled]=\"word.flag\">{{word.value}}</button>\n                      <button type=\"button\" *ngIf=\"suggestionMessage!=null\" class=\"btn btn-outline-primary word-bubble-button\" [disabled]=\"true\">{{suggestionMessage}}</button>\n                      \n                      \n                   </div>\n                <div class=\"flex-container\" (blur)=\"onBlurMethod()\" >\n                    \n                      <quill-editor \n                     \n                      [styles]=\"{height: '400px',border:'1px dashed grey'}\"\n                      [modules]=\"{  counter: { container: '#editor1'} ,toolbar: false }\"\n                      [(ngModel)]=\"behaviorText\" \n                      (onContentChanged)=\"logChangeBehavior($event);\"\n                      (onEditorCreated)=\"created($event,2)\"></quill-editor>\n                    </div>\n                     \n                  \n                  </div>\n                  </div>\n                 \n            </mat-card>\n   \n        </div>\n      </div> \n      <div class=\"row\" style=\"margin: .5em;\">\n          <div class=\"col-md-12\" style=\"padding: 0;\">\n              <mat-card> \n                \n                <div style=\"text-align: center;\">  Constraints</div> \n                \n                  <hr>\n                  <div class=\"row\">\n                  <div class=\"col-md-12\" (click)=\"selectTextBox(3)\">\n                    <div style=\"margin: .6em;\" [hidden]=\"!isEnable(3)\">\n                       <span>Suggestions:</span>\n                       <button type=\"button\" class=\"btn btn-outline-primary word-bubble-button\" *ngFor=\"let word of constraintWordList | textfilter:constraintTextFilter\"  (click)=\"insertValueInConstraint(word.value)\">{{word.value}}</button>\n                           \n                \n                    </div>\n                      <div class=\"flex-container\">\n                    \n                          <quill-editor \n                         \n                          [styles]=\"{height: '400px',border:'1px dashed grey'}\"\n                          [modules]=\"{  counter: { container: '#editor1'} ,toolbar: false }\"\n                          [(ngModel)]=\"constraints\" \n                          (onContentChanged)=\"logChangeConstraints($event);\"\n                          (onEditorCreated)=\"created($event,3)\"></quill-editor>\n                        </div>\n                      </div>\n                      </div>\n              </mat-card>\n          </div>\n        </div>\n         <div class=\"row\" style=\"margin: .5em;\">\n          <div class=\"col-md-12\" style=\"padding: 0;\">\n            <mat-card> \n                    \n              <div style=\"text-align: center;\">  Bindings</div> \n              \n                <hr>\n                <div *ngIf=\"bindingList.length==0\" style=\"font-size: .8em;text-align: center;\">\n                  <span ><i>No Bindings Needed</i></span>\n                </div>\n                  <div *ngIf=\"bindingList.length!=0\">\n                <ul  class=\"behavior-list \" >\n                  <li class=\"binding-box\" *ngFor=\"let item of bindingList;let index=index\" ><div>\n                  \n                    <mat-form-field style=\"width:100%\">\n                      <input matInput placeholder=\"{{item.key+' represents: '}}\" [(ngModel)]=\"item.value\">\n                    </mat-form-field>\n      \n                    <span>\n                    </span>\n                   \n                  </div>\n                    </li>\n              </ul>\n              </div>\n      \n              \n            </mat-card> \n            </div>\n            </div> \n   \n\n \n  </div>\n<div class=\"col-md-3\" style=\"margin: 0;\">\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n        \n      <div style=\"text-align: center;padding: 1em;\">     \n         <button mat-stroked-button (click)=\"addBindings()\" >Generate Ns File</button>\n    </div>\n    </div>\n    </div>\n  \n  <div class=\"row\" style=\"margin-top: .1em;\n  margin-bottom: .1em;\">\n    <div class=\"col-md-12\" style=\"padding: 0;\">\n\n      <mat-card>  \n        <div style=\"text-align: center;\">Actors\n         </div>\n\n        \n        <hr>\n        <div *ngIf=\"actorsList.length==0\" style=\"font-size: .8em;text-align: center;\">\n          <span ><i>No Actors</i></span>\n        </div>\n          <div *ngIf=\"actorsList.length!=0\" style=\"  height: auto;\n          display: flow-root;\n          padding: 0;\">\n        \n\n      <div *ngFor=\"let item of actorsList;let index=index\" class=\"binding-word-bubble\" style=\"  border: 1px solid black;\">\n          \n        <span>\n        {{item.text}} </span>\n       \n        </div>\n      </div>\n      </mat-card>\n\n    </div>\n  </div>\n\n  <div class=\"row\" style=\"margin-top: .1em;\n  margin-bottom: .1em;\">\n    <div class=\"col-md-12\" style=\"padding: 0;\">\n\n      <mat-card>  \n        <div style=\"text-align: center;\">Bindings Needed\n\n        \n         </div>\n\n        \n        <hr>\n        <div *ngIf=\"bindingList.length==0\" style=\"font-size: .8em;text-align: center;\">\n          <span ><i>No Bindings Needed.</i></span>\n        </div>\n        \n          <div *ngIf=\"bindingList.length!=0\" style=\"  height: auto;\n          display: flow-root;\n          padding: 0;\">\n        \n          <div *ngFor=\"let item of bindingList;let index=index\" class=\"binding-word-bubble\" >\n          \n            <span>\n            {{item.key}} </span>\n            <i class=\"fas fa-exclamation-circle\" style=\"color: red;\" *ngIf=\"isEmpty(item)\"></i>\n            <i class=\"fa fa-check-circle\" style=\"color: green;\"  *ngIf=\"!isEmpty(item)\" ></i>\n           \n            </div>\n      \n      </div>\n      </mat-card>\n\n    </div>\n  </div>\n  </div>\n</div> \n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/nlp/nlp.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/nlp/nlp.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n    <div class=\"row\">\n      <div class=\"col-md-12\" style=\"padding: 2em;\">\n        <!-- <div style=\"margin: .6em;\" >\n          <span>Suggestions:</span>\n          <button\n            type=\"button\"\n            class=\"btn btn-outline-primary word-bubble-button\"\n            *ngFor=\"let word of wordlist\"\n            (click)=\"insertValue(word.value)\"\n          >\n            {{ word.value }}\n          </button>\n        </div> -->\n        <div class=\"flex-container\">\n          <quill-editor\n            [styles]=\"{ height: '100px' }\"\n            [modules]=\"{ counter: { container: '#editor1' }, toolbar: false }\"\n            [(ngModel)]=\"nlpText\"\n            (onContentChanged)=\"logChange($event, 1)\"\n            (onEditorCreated)=\"created($event)\"\n          ></quill-editor>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-12\">\n    \n        <div style=\"float:right\">\n          <button mat-stroked-button  (click)=\"save()\">Generate HLB</button>\n        \n      </div>\n    </div>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/upload/file.preview.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/upload/file.preview.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<h2 mat-dialog-title>Content of {{file.name}}:</h2>\n<mat-dialog-content class=\"mat-typography\">\n  <div [innerHTML]=\"fileContent\"></div>\n  \n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n    <button mat-button [mat-dialog-close]=\"false\">close</button>\n    <button mat-button [mat-dialog-close]=\"true\" cdkFocusInitial>upload</button>\n  </mat-dialog-actions>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/upload/upload.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/upload/upload.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n    <div class=\"row\">\n      <div class=\"col-md-12\" >\n  <ngx-file-drop dropZoneLabel=\"Drop files here\" (onFileDrop)=\"dropped($event)\" \n  (onFileOver)=\"fileOver($event)\" (onFileLeave)=\"fileLeave($event)\">\n      <ng-template accept=\"ns\" multiple=\"false\" ngx-file-drop-content-tmp let-openFileSelector=\"openFileSelector\">\n        <div > Drag & drop a file. or Click on \n        <span (click)=\"openFileSelector()\" style=\"cursor: pointer;\"><u>Browse Files</u></span> to upload.\n        </div>\n      \n      </ng-template>\n  </ngx-file-drop>\n</div>\n</div>\n<br>\n<div class=\"row\" >\n  <div class=\"col-md-12\">\n    <table class=\"table\">\n      <thead class=\"upload-name\">\n          <tr >\n            <th style=\"min-width:150px\">Sr.</th>\n              <th style=\"min-width:150px\">Name</th>\n              <th style=\"min-width:150px\"></th>\n          </tr>\n      </thead>\n      <tbody class=\"upload-name\"  *ngIf=\"files.length!=0\">\n          <tr *ngFor=\"let item of files; let i=index\" >\n            <td>{{i+1}}</td>\n              <td><strong>{{ item.relativePath }}</strong></td>\n              <td>\n                <i class=\"fas fa-eye pointer\" (click)=\"preview(item)\"></i>\n                <i class=\"fas fa-upload pointer\" (click)=\"upload(item)\"></i>\n                <i class=\"far fa-trash-alt pointer\" (click)=\"delete(i)\"></i></td>\n\n          </tr>\n      </tbody>\n      <tbody class=\"upload-name\"  *ngIf=\"files.length==0\">\n        <tr >\n          <td colspan=\"3\" ><span ><i>No file found.</i> </span></td>\n            \n\n        </tr>\n    </tbody>\n \n  </table>\n    </div>\n</div>\n\n");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/@authentication/auth.guard.ts":
/*!***********************************************!*\
  !*** ./src/app/@authentication/auth.guard.ts ***!
  \***********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.service */ "./src/app/@authentication/auth.service.ts");
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */





let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canLoad(route, segments) {
        return this.authService.authenticated.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(logged => {
            console.log("inside canActivateChild");
            if (logged) {
                this.router.navigate(['/protected']);
                return false;
            }
            return true;
        }));
    }
    canActivateChild(childRoute, state) {
        return this.authService.authenticated.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(logged => {
            console.log("inside canActivateChild");
            if (logged) {
                this.router.navigate(['/protected']);
                return false;
            }
            return true;
        }));
    }
    canActivate() {
        return this.authService.authenticated.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(logged => {
            console.log("inside canActivate");
            if (logged) {
                this.router.navigate(['/protected']);
                return false;
            }
            return true;
        }));
    }
};
AuthGuard.ctorParameters = () => [
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AuthGuard);



/***/ }),

/***/ "./src/app/@authentication/auth.module.ts":
/*!************************************************!*\
  !*** ./src/app/@authentication/auth.module.ts ***!
  \************************************************/
/*! exports provided: AuthModule, RootAuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RootAuthModule", function() { return RootAuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.guard */ "./src/app/@authentication/auth.guard.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.service */ "./src/app/@authentication/auth.service.ts");






let AuthModule = class AuthModule {
    static forRoot() {
        return {
            ngModule: RootAuthModule,
            providers: [
                _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
                _auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]
            ]
        };
    }
};
AuthModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]]
    })
], AuthModule);

let RootAuthModule = class RootAuthModule {
};
RootAuthModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [AuthModule]
    })
], RootAuthModule);



/***/ }),

/***/ "./src/app/@authentication/auth.service.ts":
/*!*************************************************!*\
  !*** ./src/app/@authentication/auth.service.ts ***!
  \*************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



let AuthService = class AuthService {
    constructor() {
        this.authenticated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
    }
    isAuthenticated() {
        return false;
    }
};
AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], AuthService);



/***/ }),

/***/ "./src/app/@core/core.module.ts":
/*!**************************************!*\
  !*** ./src/app/@core/core.module.ts ***!
  \**************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header.component */ "./src/app/@core/header/header.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _layout_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout/layout.component */ "./src/app/@core/layout/layout.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");







const COMPONENTS = [
    _header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"],
    _layout_layout_component__WEBPACK_IMPORTED_MODULE_4__["LayoutComponent"]
];
let CoreModule = class CoreModule {
};
CoreModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            ...COMPONENTS
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatMenuModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]
        ], exports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], ...COMPONENTS],
    })
], CoreModule);



/***/ }),

/***/ "./src/app/@core/header/header.component.scss":
/*!****************************************************!*\
  !*** ./src/app/@core/header/header.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".container {\n  margin: 0;\n}\n\n.profilePhoto {\n  vertical-align: middle;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n}\n\n.profile {\n  background: url('profilephoto.svg');\n  vertical-align: middle;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background-color: white;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.username {\n  vertical-align: middle;\n  color: #eee;\n  padding: 0.8em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvQGNvcmUvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvQGNvcmUvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFNBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksbUNBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFFQSx1QkFBQTtBQ0FKOztBREdBO0VBQ0ksZUFBQTtBQ0FKOztBREdBO0VBQ0ksc0JBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvQGNvcmUvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXJ7XG4gICAgbWFyZ2luOiAwO1xufVxuXG4ucHJvZmlsZVBob3Rve1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgd2lkdGg6IDUwcHg7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuLnByb2ZpbGV7XG4gICAgYmFja2dyb3VuZDogdXJsKFwiYXNzZXRzL3Byb2ZpbGVwaG90by5zdmdcIik7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB3aWR0aDogNTBweDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5wb2ludGVye1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnVzZXJuYW1le1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgY29sb3I6I2VlZTtcbiAgICBwYWRkaW5nOiAwLjhlbTtcbn0iLCIuY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4ucHJvZmlsZVBob3RvIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuXG4ucHJvZmlsZSB7XG4gIGJhY2tncm91bmQ6IHVybChcImFzc2V0cy9wcm9maWxlcGhvdG8uc3ZnXCIpO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4ucG9pbnRlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnVzZXJuYW1lIHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgY29sb3I6ICNlZWU7XG4gIHBhZGRpbmc6IDAuOGVtO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/@core/header/header.component.ts":
/*!**************************************************!*\
  !*** ./src/app/@core/header/header.component.ts ***!
  \**************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let HeaderComponent = class HeaderComponent {
};
HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'header',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/@core/header/header.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./header.component.scss */ "./src/app/@core/header/header.component.scss")).default]
    })
], HeaderComponent);



/***/ }),

/***/ "./src/app/@core/layout/layout.component.scss":
/*!****************************************************!*\
  !*** ./src/app/@core/layout/layout.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".container {\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvQGNvcmUvbGF5b3V0L2xheW91dC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvQGNvcmUvbGF5b3V0L2xheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFNBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL0Bjb3JlL2xheW91dC9sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVye1xuICAgIG1hcmdpbjogMDtcbn0iLCIuY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/@core/layout/layout.component.ts":
/*!**************************************************!*\
  !*** ./src/app/@core/layout/layout.component.ts ***!
  \**************************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let LayoutComponent = class LayoutComponent {
};
LayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'layout',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./layout.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/@core/layout/layout.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./layout.component.scss */ "./src/app/@core/layout/layout.component.scss")).default]
    })
], LayoutComponent);



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _authentication_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./@authentication/auth.guard */ "./src/app/@authentication/auth.guard.ts");
/* harmony import */ var _pages_pages_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/pages.component */ "./src/app/pages/pages.component.ts");





const routes = [
    // {
    //   path: 'pages',
    //  canLoad:[AuthGuard],
    //   loadChildren: () => import('../app/pages/pages.module')
    //     .then(m => m.PagesModule),
    // },
    {
        path: 'pages',
        canLoad: [_authentication_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]],
        component: _pages_pages_component__WEBPACK_IMPORTED_MODULE_4__["PagesComponent"]
    },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
];
const config = {
    useHash: false,
};
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, config)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".loading {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n\n.loading-wheel {\n  width: 20px;\n  height: 20px;\n  margin-top: -40px;\n  margin-left: -40px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  border-width: 30px;\n  border-radius: 50%;\n  -webkit-animation: spin 1s linear infinite;\n}\n\n.style-2 .loading-wheel {\n  border-style: double;\n  border-color: #ccc transparent;\n}\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(-360deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtFQUNBLG9DQUFBO0FDQ0o7O0FEQ0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFFQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBRUEsa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0FDQUo7O0FERUE7RUFDSSxvQkFBQTtFQUNBLDhCQUFBO0FDQ0o7O0FEQ0E7RUFDSTtJQUNJLDRCQUFBO0VDRU47RURBRTtJQUNJLGtDQUFBO0VDRU47QUFDRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2FkaW5nIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICB6LWluZGV4OiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsLjUpO1xufVxuLmxvYWRpbmctd2hlZWwge1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBtYXJnaW4tdG9wOiAtNDBweDtcbiAgICBtYXJnaW4tbGVmdDogLTQwcHg7XG4gICAgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBcbiAgICBib3JkZXItd2lkdGg6IDMwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcbn1cbi5zdHlsZS0yIC5sb2FkaW5nLXdoZWVsIHtcbiAgICBib3JkZXItc3R5bGU6IGRvdWJsZTtcbiAgICBib3JkZXItY29sb3I6ICNjY2MgdHJhbnNwYXJlbnQ7XG59XG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7XG4gICAgMCUge1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcbiAgICB9XG59IiwiLmxvYWRpbmcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4ubG9hZGluZy13aGVlbCB7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xuICBtYXJnaW4tbGVmdDogLTQwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgYm9yZGVyLXdpZHRoOiAzMHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcbn1cblxuLnN0eWxlLTIgLmxvYWRpbmctd2hlZWwge1xuICBib3JkZXItc3R5bGU6IGRvdWJsZTtcbiAgYm9yZGVyLWNvbG9yOiAjY2NjIHRyYW5zcGFyZW50O1xufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xuICB9XG4gIDEwMCUge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XG4gIH1cbn0iXX0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _pages_dashboard_common_state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/dashboard/common/state-service.service */ "./src/app/pages/dashboard/common/state-service.service.ts");



let AppComponent = class AppComponent {
    constructor(state) {
        this.state = state;
        this.loaderSwitch = false;
        this.title = "DEWUI";
    }
    ngOnInit() {
        this.state.isLoaderEnabled().subscribe(loader => {
            this.loaderSwitch = loader;
        });
        // this.route.navigate(['/pages/dashboard']);
    }
};
AppComponent.ctorParameters = () => [
    { type: _pages_dashboard_common_state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-root",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pages_pages_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/pages.module */ "./src/app/pages/pages.module.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _pages_dashboard_common_http_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/dashboard/common/http-service.service */ "./src/app/pages/dashboard/common/http-service.service.ts");
/* harmony import */ var _authentication_auth_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./@authentication/auth.module */ "./src/app/@authentication/auth.module.ts");










let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
        ],
        imports: [
            _authentication_auth_module__WEBPACK_IMPORTED_MODULE_9__["AuthModule"].forRoot(),
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _pages_pages_module__WEBPACK_IMPORTED_MODULE_5__["PagesModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
        ],
        providers: [_pages_dashboard_common_http_service_service__WEBPACK_IMPORTED_MODULE_8__["HttpService"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/pages/dashboard/common/editor-service.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/common/editor-service.ts ***!
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
            else
                setTimeout(function () { instance.pressedTab(); }, 50);
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

/***/ "./src/app/pages/dashboard/common/http-service.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/dashboard/common/http-service.service.ts ***!
  \****************************************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */




let HttpService = class HttpService {
    constructor(http) {
        this.http = http;
    }
    get apiUrl() {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
    }
    get(endpoint, options, flag = false) {
        return this.http.get(`${this.apiUrl}/${endpoint}`, options);
    }
    post(endpoint, data, options) {
        return this.http.post(`${endpoint}`, data, options);
    }
    put(endpoint, data, options) {
        return this.http.put(`${this.apiUrl}/${endpoint}`, data);
    }
    patch(endpoint, data, options) {
        return this.http.patch(`${endpoint}`, data, options);
    }
    delete(endpoint, options) {
        return this.http.delete(`${endpoint}`);
    }
};
HttpService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
HttpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], HttpService);



/***/ }),

/***/ "./src/app/pages/dashboard/common/state-service.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/dashboard/common/state-service.service.ts ***!
  \*****************************************************************/
/*! exports provided: StateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateService", function() { return StateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



let StateService = class StateService {
    constructor() {
        this.loaderSwitch = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.actors = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.behavior = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.constraints = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.bindings = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
    }
    enableLoader() { this.loaderSwitch.next(true); }
    disableLoader() { this.loaderSwitch.next(false); }
    isLoaderEnabled() { return this.loaderSwitch.asObservable(); }
    getBindings() {
        return this.bindings.asObservable();
    }
    getActors() {
        return this.actors.asObservable();
    }
    setCurrentBehaviorWord(word) {
        this.currentBehaviorWord = word;
    }
    getCurrentBehaviorWord() {
        return this.currentBehaviorWord;
    }
    setCurrentConstraintWord(word) {
        this.currentConstraintWord = word;
    }
    getCurrentConstraintWord() {
        return this.currentConstraintWord;
    }
    getBehavior() {
        return this.behavior.asObservable();
    }
    getConstraints() {
        return this.constraints.asObservable();
    }
    setBindings(Bindings) {
        this.bindings.next(Bindings);
    }
    setActors(data) {
        this.actors.next(data);
    }
    setBehavior(data) {
        this.behavior.next(data);
    }
    setConstraints(data) {
        this.constraints.next(data);
    }
};
StateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], StateService);



/***/ }),

/***/ "./src/app/pages/dashboard/common/text-filter.pipe.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/dashboard/common/text-filter.pipe.ts ***!
  \************************************************************/
/*! exports provided: TextFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFilterPipe", function() { return TextFilterPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state-service.service */ "./src/app/pages/dashboard/common/state-service.service.ts");



let TextFilterPipe = class TextFilterPipe {
    constructor(state) {
        this.state = state;
    }
    transform(items, filter1) {
        var filter = filter1.text;
        var option = filter1.name;
        if (!items || !filter) {
            if (items.length > 0) {
                if (option == "behavior")
                    this.state.setCurrentBehaviorWord(items[0].value);
                else if (option == "constraint")
                    this.state.setCurrentConstraintWord(items[0].value);
            }
            else {
                if (option == "behavior")
                    this.state.setCurrentBehaviorWord("");
                else if (option == "constraint")
                    this.state.setCurrentConstraintWord("");
            }
            if (items.length >= 3)
                return items.splice(0, 3);
            else
                return items;
        }
        if (filter.trim() === "") {
            if (items.length > 0) {
                if (option == "behavior")
                    this.state.setCurrentBehaviorWord(items[0].value);
                else if (option == "constraint")
                    this.state.setCurrentConstraintWord(items[0].value);
            }
            else {
                if (option == "behavior")
                    this.state.setCurrentBehaviorWord("");
                else if (option == "constraint")
                    this.state.setCurrentConstraintWord("");
            }
            if (items.length >= 3)
                return items.splice(0, 3);
            else
                return items;
        }
        else {
            var filterList = items.filter((item) => item.value
                .trim()
                .toLowerCase()
                .indexOf(filter.trim().toLowerCase()) > -1);
            if (filterList.length > 0) {
                if (option == "behavior")
                    this.state.setCurrentBehaviorWord(filterList[0].value);
                else if (option == "constraint")
                    this.state.setCurrentConstraintWord(filterList[0].value);
            }
            else {
                if (option == "behavior")
                    this.state.setCurrentBehaviorWord("");
                else if (option == "constraint")
                    this.state.setCurrentConstraintWord("");
            }
            if (filterList.length >= 3)
                return filterList.splice(0, 3);
            else
                return filterList;
        }
    }
};
TextFilterPipe.ctorParameters = () => [
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"] }
];
TextFilterPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: "textfilter",
        pure: false
    })
], TextFilterPipe);



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var src_app_authentication_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/@authentication/auth.guard */ "./src/app/@authentication/auth.guard.ts");





const routes = [
    {
        path: "",
        canActivateChild: [src_app_authentication_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]],
        component: _dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"]
    }
];
let DashboardRoutingModule = class DashboardRoutingModule {
};
DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], DashboardRoutingModule);



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".tab {\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYntcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufSIsIi50YWIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let DashboardComponent = class DashboardComponent {
    constructor() {
        this.menuList = [
            {
                name: "HLB",
                id: 1,
                html: "<hlb></hlb>"
            },
            {
                name: "NLP",
                id: 2,
                html: "<nlp></nlp>"
            },
            {
                name: "Behavior Dependency Graph",
                id: 3,
                html: "<p>In Progress.....</p>"
            }, {
                name: "Upload",
                id: 4,
                html: "<upload></upload>"
            }
        ];
    }
};
DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'dashboard',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/pages/dashboard/dashboard.component.scss")).default]
    })
], DashboardComponent);



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
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
/* harmony import */ var _common_state_service_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common/state-service.service */ "./src/app/pages/dashboard/common/state-service.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var ngx_file_drop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-file-drop */ "./node_modules/ngx-file-drop/fesm2015/ngx-file-drop.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @swimlane/ngx-graph */ "./node_modules/@swimlane/ngx-graph/fesm2015/swimlane-ngx-graph.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/pages/dashboard/dashboard-routing.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./hlb/hlb.component */ "./src/app/pages/dashboard/hlb/hlb.component.ts");
/* harmony import */ var _nlp_nlp_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./nlp/nlp.component */ "./src/app/pages/dashboard/nlp/nlp.component.ts");
/* harmony import */ var _common_text_filter_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./common/text-filter.pipe */ "./src/app/pages/dashboard/common/text-filter.pipe.ts");
/* harmony import */ var _upload_upload_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./upload/upload.component */ "./src/app/pages/dashboard/upload/upload.component.ts");
/* harmony import */ var src_app_authentication_auth_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/@authentication/auth.module */ "./src/app/@authentication/auth.module.ts");
/* harmony import */ var _dependency_graph_dependency_graph_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./dependency-graph/dependency-graph.component */ "./src/app/pages/dashboard/dependency-graph/dependency-graph.component.ts");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm2015/radio.js");

























let DashboardModule = class DashboardModule {
};
DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        exports: [_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["DashboardComponent"]],
        declarations: [
            _dashboard_component__WEBPACK_IMPORTED_MODULE_13__["DashboardComponent"],
            _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__["HlbComponent"],
            _nlp_nlp_component__WEBPACK_IMPORTED_MODULE_19__["NlpComponent"],
            _dependency_graph_dependency_graph_component__WEBPACK_IMPORTED_MODULE_23__["DependencyGraphComponent"],
            _common_text_filter_pipe__WEBPACK_IMPORTED_MODULE_20__["TextFilterPipe"],
            _upload_upload_component__WEBPACK_IMPORTED_MODULE_21__["UploadComponent"],
            _upload_upload_component__WEBPACK_IMPORTED_MODULE_21__["FilePreviewComponent"],
            _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__["BindingPopUp"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_15__["CommonModule"],
            src_app_authentication_auth_module__WEBPACK_IMPORTED_MODULE_22__["AuthModule"].forRoot(),
            _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterModule"],
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
            _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_16__["DashboardRoutingModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
            ngx_file_drop__WEBPACK_IMPORTED_MODULE_12__["NgxFileDropModule"]
        ],
        entryComponents: [_upload_upload_component__WEBPACK_IMPORTED_MODULE_21__["FilePreviewComponent"], _hlb_hlb_component__WEBPACK_IMPORTED_MODULE_18__["BindingPopUp"]],
        providers: [_common_state_service_service__WEBPACK_IMPORTED_MODULE_10__["StateService"]],
        bootstrap: [_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["DashboardComponent"]]
    })
], DashboardModule);



/***/ }),

/***/ "./src/app/pages/dashboard/dependency-graph/dependency-graph.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/dashboard/dependency-graph/dependency-graph.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".chart-container {\n  width: 100%;\n  height: 100%;\n  background-color: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2RlcGVuZGVuY3ktZ3JhcGgvZGVwZW5kZW5jeS1ncmFwaC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2RlcGVuZGVuY3ktZ3JhcGgvZGVwZW5kZW5jeS1ncmFwaC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC9kZXBlbmRlbmN5LWdyYXBoL2RlcGVuZGVuY3ktZ3JhcGguY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2hhcnQtY29udGFpbmVye1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufSIsIi5jaGFydC1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/dashboard/dependency-graph/dependency-graph.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/pages/dashboard/dependency-graph/dependency-graph.component.ts ***!
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
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./dependency-graph.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dependency-graph/dependency-graph.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./dependency-graph.component.scss */ "./src/app/pages/dashboard/dependency-graph/dependency-graph.component.scss")).default]
    })
], DependencyGraphComponent);



/***/ }),

/***/ "./src/app/pages/dashboard/hlb/hlb.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/hlb/hlb.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".behavior-list {\n  margin: 0.1em;\n  list-style: none;\n  padding: 0;\n}\n\n.behavior-box {\n  margin: 0.5em;\n  border: 1px solid #ccc;\n  padding: 0.5em;\n}\n\n.binding-box {\n  margin: 0.5em;\n  border-bottom: 1px solid #ccc;\n  padding: 0.5em;\n}\n\n.word-bubble {\n  border: 1px dotted black;\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.binding-word-bubble {\n  border: 1px solid black;\n  float: left;\n  margin: 2px;\n  border-radius: 8px;\n  padding: 3px;\n}\n\n.word-bubble-button {\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n}\n\n.float-left {\n  float: left;\n}\n\n.actions {\n  float: right;\n  cursor: pointer;\n  display: none;\n}\n\n.behavior-list:hover .actions {\n  display: block;\n}\n\n.disabled {\n  pointer-events: none;\n}\n\n.grabbable {\n  cursor: move;\n  /* fallback if grab cursor is unsupported */\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n/* (Optional) Apply a \"closed-hand\" cursor during drag operation. */\n\n.grabbable:active {\n  cursor: grabbing;\n  cursor: -webkit-grabbing;\n}\n\n.mat-radio-button ~ .mat-radio-button {\n  margin-left: 16px;\n}\n\n.padding-left-right {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.button-padding {\n  margin-left: 0.1em;\n}\n\n.expand {\n  float: right;\n  cursor: pointer;\n}\n\n.hide {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2hsYi9obGIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC9obGIvaGxiLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUNBLDZCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBQ0ksd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREdBO0VBQ0ksdUJBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0FKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0FDQ0o7O0FERUE7RUFDSSxvQkFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUFjLDJDQUFBO0VBQ2QsWUFBQTtFQUVBLG9CQUFBO0FDRUo7O0FEQ0MsbUVBQUE7O0FBQ0Q7RUFDSSxnQkFBQTtFQUVBLHdCQUFBO0FDRUo7O0FEQ0E7RUFDSSxpQkFBQTtBQ0VKOztBRENFO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQ0VOOztBREVFO0VBQ0ksa0JBQUE7QUNDTjs7QURFRTtFQUNJLFlBQUE7RUFDQSxlQUFBO0FDQ047O0FERUU7RUFDSSxhQUFBO0FDQ04iLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kYXNoYm9hcmQvaGxiL2hsYi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iZWhhdmlvci1saXN0e1xuICAgIG1hcmdpbjouMWVtO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbn1cblxuLmJlaGF2aW9yLWJveHtcbiAgICBtYXJnaW46IC41ZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBwYWRkaW5nOiAuNWVtO1xufVxuXG4uYmluZGluZy1ib3h7XG4gICAgbWFyZ2luOiAuNWVtO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICAgIHBhZGRpbmc6IC41ZW07XG59XG5cbi53b3JkLWJ1YmJsZXtcbiAgICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIHBhZGRpbmc6IDAuNGVtO1xuICAgIG1hcmdpbjogMC4xZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuIFxufVxuXG4uYmluZGluZy13b3JkLWJ1YmJsZXtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgICBmbG9hdDogbGVmdDtcbiAgICBtYXJnaW46IDJweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgcGFkZGluZzogM3B4O1xufVxuLndvcmQtYnViYmxlLWJ1dHRvbntcbiAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgcGFkZGluZzogMC40ZW07XG4gICAgbWFyZ2luOiAwLjFlbTtcbiBcbn1cbi5mbG9hdC1sZWZ0e1xuICAgIGZsb2F0OmxlZnQ7XG59XG5cbi5hY3Rpb25ze1xuICAgIGZsb2F0OnJpZ2h0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4uYmVoYXZpb3ItbGlzdDpob3ZlciAuYWN0aW9uc3tcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmRpc2FibGVke1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyAgIFxufVxuXG4uZ3JhYmJhYmxlIHtcbiAgICBjdXJzb3I6IG1vdmU7IC8qIGZhbGxiYWNrIGlmIGdyYWIgY3Vyc29yIGlzIHVuc3VwcG9ydGVkICovXG4gICAgY3Vyc29yOiBncmFiO1xuICAgIGN1cnNvcjogLW1vei1ncmFiO1xuICAgIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xufVxuXG4gLyogKE9wdGlvbmFsKSBBcHBseSBhIFwiY2xvc2VkLWhhbmRcIiBjdXJzb3IgZHVyaW5nIGRyYWcgb3BlcmF0aW9uLiAqL1xuLmdyYWJiYWJsZTphY3RpdmUge1xuICAgIGN1cnNvcjogZ3JhYmJpbmc7XG4gICAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xuICAgIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcbn1cblxuLm1hdC1yYWRpby1idXR0b24gfiAubWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgbWFyZ2luLWxlZnQ6IDE2cHg7XG4gIH1cblxuICAucGFkZGluZy1sZWZ0LXJpZ2h0e1xuICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG4gIH1cblxuIFxuICAuYnV0dG9uLXBhZGRpbmd7XG4gICAgICBtYXJnaW4tbGVmdDogLjFlbTtcbiAgfVxuXG4gIC5leHBhbmR7XG4gICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAuaGlkZXtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gIH0iLCIuYmVoYXZpb3ItbGlzdCB7XG4gIG1hcmdpbjogMC4xZW07XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5iZWhhdmlvci1ib3gge1xuICBtYXJnaW46IDAuNWVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAwLjVlbTtcbn1cblxuLmJpbmRpbmctYm94IHtcbiAgbWFyZ2luOiAwLjVlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmc6IDAuNWVtO1xufVxuXG4ud29yZC1idWJibGUge1xuICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgcGFkZGluZzogMC40ZW07XG4gIG1hcmdpbjogMC4xZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmJpbmRpbmctd29yZC1idWJibGUge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgZmxvYXQ6IGxlZnQ7XG4gIG1hcmdpbjogMnB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDNweDtcbn1cblxuLndvcmQtYnViYmxlLWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgcGFkZGluZzogMC40ZW07XG4gIG1hcmdpbjogMC4xZW07XG59XG5cbi5mbG9hdC1sZWZ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5hY3Rpb25zIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5iZWhhdmlvci1saXN0OmhvdmVyIC5hY3Rpb25zIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5kaXNhYmxlZCB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4uZ3JhYmJhYmxlIHtcbiAgY3Vyc29yOiBtb3ZlO1xuICAvKiBmYWxsYmFjayBpZiBncmFiIGN1cnNvciBpcyB1bnN1cHBvcnRlZCAqL1xuICBjdXJzb3I6IGdyYWI7XG4gIGN1cnNvcjogLW1vei1ncmFiO1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYjtcbn1cblxuLyogKE9wdGlvbmFsKSBBcHBseSBhIFwiY2xvc2VkLWhhbmRcIiBjdXJzb3IgZHVyaW5nIGRyYWcgb3BlcmF0aW9uLiAqL1xuLmdyYWJiYWJsZTphY3RpdmUge1xuICBjdXJzb3I6IGdyYWJiaW5nO1xuICBjdXJzb3I6IC1tb3otZ3JhYmJpbmc7XG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiYmluZztcbn1cblxuLm1hdC1yYWRpby1idXR0b24gfiAubWF0LXJhZGlvLWJ1dHRvbiB7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuXG4ucGFkZGluZy1sZWZ0LXJpZ2h0IHtcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcbn1cblxuLmJ1dHRvbi1wYWRkaW5nIHtcbiAgbWFyZ2luLWxlZnQ6IDAuMWVtO1xufVxuXG4uZXhwYW5kIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oaWRlIHtcbiAgZGlzcGxheTogbm9uZTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/dashboard/hlb/hlb.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/dashboard/hlb/hlb.component.ts ***!
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
/* harmony import */ var _common_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/editor-service */ "./src/app/pages/dashboard/common/editor-service.ts");
/* harmony import */ var _common_state_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/state-service.service */ "./src/app/pages/dashboard/common/state-service.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm2015/dialog.js");
/* harmony import */ var _common_http_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/http-service.service */ "./src/app/pages/dashboard/common/http-service.service.ts");









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
    ngOnInit() {
        this.bindingMap = new Map();
        this.behaviorList = [];
        const instance = this;
        this.stateservice.getBehavior().subscribe(data => {
            if (data != null) {
                //console.log(data);
                var text = '';
                data.forEach(element => {
                    text += element + '<br>';
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
                    var list = element.trim().split(' ');
                    // //console.log(list);
                    var key = list[0];
                    ////console.log(key);
                    var value = list.splice(1);
                    ////console.log(value);
                    value = value.join(" ");
                    //  if (!this.bindingMap.has(key)){
                    var t = { key: key, value: value };
                    this.bindingMap.set(key, t);
                    this.bindingList.push(t);
                    //}
                });
                //console.log(this.bindingMap);
            }
        });
        this.stateservice.getActors().subscribe(data => {
            // //console.log(data);
            if (data != null) {
                instance.actorsList = [];
                data.forEach(element => {
                    this.actorsList.push({ text: element });
                });
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
                    if (data && instance.behaviorService.isTextChanged())
                        this.updateActors();
                });
                this.behaviorService.isEnterPressed().subscribe(flag => {
                    if (flag && instance.behaviorService.isTextChanged()) {
                        if (this.behaviorService.getText().trim() === "")
                            return;
                        var index = this.behaviorService.getText().length - 2;
                        if (this.behaviorService.getText().charAt(index) == '\n')
                            this.updateActors();
                    }
                });
                this.behaviorService.isTabPressed().subscribe(flag => {
                    if (flag) {
                        //console.log("inside istab");
                        if (this.stateservice.getCurrentBehaviorWord().trim() != '')
                            this.insertValue(this.stateservice.getCurrentBehaviorWord(), true);
                        //this.behaviorService
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
                        if (constraints != '') {
                            var constraintsList = constraints.split("\n");
                            params.constraints = constraintsList;
                        }
                        this.behaviorTextFilter.text = '';
                        this.http.put("v1/hlb/suggestions", params).subscribe(data => {
                            var list = [];
                            data.suggestions.forEach(element => {
                                list.push({ value: element, flag: false });
                            });
                            if (data.suggestion_text.trim() != '')
                                this.suggestionMessage = data.suggestion_text;
                            else
                                this.suggestionMessage = null;
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
                    if (data && instance.constraintService.isTextChanged())
                        this.updateActorsConstraint();
                });
                this.constraintService.isEnterPressed().subscribe(flag => {
                    if (flag && instance.constraintService.isTextChanged()) {
                        if (this.constraintService.getText().trim() === "")
                            return;
                        var index = this.constraintService.getText().length - 2;
                        if (this.constraintService.getText().charAt(index) == '\n')
                            this.updateActorsConstraint();
                    }
                });
                this.constraintService.isTabPressed().subscribe(flag => {
                    if (flag) {
                        if (this.stateservice.getCurrentConstraintWord().trim() != '')
                            this.insertValueInConstraint(this.stateservice.getCurrentConstraintWord(), true);
                        //this.behaviorService
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
                        if (behaviors != '') {
                            var behaviorsList = behaviors.split("\n");
                            params.behaviors = behaviorsList;
                        }
                        this.constraintTextFilter.text = '';
                        this.http.put("v1/hlb/suggestions", params).subscribe(data => {
                            var list = [];
                            data.suggestions.forEach(element => {
                                list.push({ value: element, flag: false });
                            });
                            if (data.suggestion_text.trim() != '')
                                this.suggestionMessage = data.suggestion_text;
                            else
                                this.suggestionMessage = null;
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
        var blist = this.behaviorService.getText().trim().split('\n');
        blist.forEach(element => {
            var text = element.trim();
            if (text != '') {
                data.Scenario.push(text);
                this.behaviorList.push(text);
            }
        });
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
            Constraints: []
        };
        //  this.behaviorList=[];
        var blist = this.constraintService.getText().trim().split('\n');
        blist.forEach(element => {
            var text = element.trim();
            if (text != '') {
                data.Constraints.push(text);
                // this.behaviorList.push(text);
            }
        });
        this.http.put("v1/hlb/parse", data).subscribe((data) => {
            //console.log(data);
            this.extractInfo(data);
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
        scenario.forEach(element => {
            this.extractActors(element[1] != null ? element[1] : []);
            this.extractEvents(element[0], element[2], element[3]);
        });
        // this.loadBindings();
        this.changeDetection.detectChanges();
    }
    isEmpty(binding) {
        if (binding.value == undefined)
            return true;
        return binding.value.trim() == '';
    }
    loadBindings() {
        this.bindingMap.forEach((value, key) => {
            this.bindingList.push(key);
        });
    }
    extractEvents(triggers, actions, emitters) {
        //console.log(this.bindingMap);
        if (triggers != null)
            triggers.forEach(element => {
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
        if (actions != null)
            actions.forEach(element => {
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
        if (emitters != null)
            emitters.forEach(element => {
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
        // //console.log(this.bindingMap);
    }
    logChangeBehavior(event) {
        if (this.behaviorService.getText().trim() === "")
            return;
        // var index = this.behaviorService.getText().length-2;
        // if (this.behaviorService.getText().charAt(index) == '\n')
        //     this.updateActors();
    }
    logChangeConstraints(event) {
        if (this.constraintService.getText().trim() === "")
            return;
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
    isEnable(id) { return this.textBoxId == id; }
    ;
    extractActors(data) {
        data.forEach(element => {
            ////console.log(element);
            this.insertActor(element);
        });
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
            width: '70%',
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
        if (this.actorsList.length == 0)
            return;
        if (this.behaviorList.length == 0)
            return;
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
            if (element.value == null || element.value.trim() == '') {
                flag = true;
                return;
            }
            data.bindings.push(element.key + " " + element.value);
        });
        if (flag)
            return;
        this.stateservice.enableLoader();
        this.http
            .put("v1/hlb/generateNs", data, null)
            .subscribe(data => {
            //console.log(data);
            this.stateservice.disableLoader();
            this.downLoadFile(data.script);
            this._snackBar.open("Successfully Downloaded.", "close", {
                duration: 2000,
            });
            // this.stateservice.setBindings(data.Bindings);
        }, error => {
            this.stateservice.disableLoader();
            this._snackBar.open(error, "close", {
                duration: 2000,
            });
        });
    }
    downLoadFile(data) {
        var blob = new Blob([data], { type: "text/plain" });
        //console.log(blob);
        // var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var fileName = "experiment.txt";
        if ('msSaveOrOpenBlob' in navigator) {
            navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
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
};
HlbComponent.ctorParameters = () => [
    { type: _common_http_service_service__WEBPACK_IMPORTED_MODULE_8__["HttpService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] },
    { type: _common_state_service_service__WEBPACK_IMPORTED_MODULE_5__["StateService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
];
HlbComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'hlb',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./hlb.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/hlb/hlb.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./hlb.component.scss */ "./src/app/pages/dashboard/hlb/hlb.component.scss")).default]
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
        selector: 'hlb-binding',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./hlb-binding.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/hlb/hlb-binding.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./hlb.component.scss */ "./src/app/pages/dashboard/hlb/hlb.component.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MAT_DIALOG_DATA"]))
], BindingPopUp);



/***/ }),

/***/ "./src/app/pages/dashboard/nlp/nlp.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/nlp/nlp.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".behavior-list {\n  margin: 0.1em;\n  list-style: none;\n  padding: 0;\n}\n\n.behavior-box {\n  margin: 0.5em;\n  border: 1px solid #ccc;\n  padding: 0.5em;\n}\n\n.word-bubble {\n  border: 1px dotted black;\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.word-bubble-button {\n  border-radius: 1em;\n  padding: 0.4em;\n  margin: 0.1em;\n  cursor: pointer;\n}\n\n.float-left {\n  float: left;\n}\n\n.actions {\n  float: right;\n}\n\n.disabled {\n  pointer-events: none;\n  background-color: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL25scC9ubHAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC9ubHAvbmxwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQ0NKOztBREVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBQ0ksd0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7QUNDSjs7QURFQTtFQUNJLG9CQUFBO0VBQ0Esc0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC9ubHAvbmxwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJlaGF2aW9yLWxpc3R7XG4gICAgbWFyZ2luOi4xZW07XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4uYmVoYXZpb3ItYm94e1xuICAgIG1hcmdpbjogLjVlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIHBhZGRpbmc6IC41ZW07XG59XG5cbi53b3JkLWJ1YmJsZXtcbiAgICBib3JkZXI6IDFweCBkb3R0ZWQgYmxhY2s7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIHBhZGRpbmc6IDAuNGVtO1xuICAgIG1hcmdpbjogMC4xZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuIFxufVxuLndvcmQtYnViYmxlLWJ1dHRvbntcbiAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgcGFkZGluZzogMC40ZW07XG4gICAgbWFyZ2luOiAwLjFlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gXG59XG4uZmxvYXQtbGVmdHtcbiAgICBmbG9hdDpsZWZ0O1xufVxuXG4uYWN0aW9uc3tcbiAgICBmbG9hdDpyaWdodDtcbn1cblxuLmRpc2FibGVke1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG4iLCIuYmVoYXZpb3ItbGlzdCB7XG4gIG1hcmdpbjogMC4xZW07XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5iZWhhdmlvci1ib3gge1xuICBtYXJnaW46IDAuNWVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAwLjVlbTtcbn1cblxuLndvcmQtYnViYmxlIHtcbiAgYm9yZGVyOiAxcHggZG90dGVkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiAxZW07XG4gIHBhZGRpbmc6IDAuNGVtO1xuICBtYXJnaW46IDAuMWVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi53b3JkLWJ1YmJsZS1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAxZW07XG4gIHBhZGRpbmc6IDAuNGVtO1xuICBtYXJnaW46IDAuMWVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mbG9hdC1sZWZ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbi5hY3Rpb25zIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuXG4uZGlzYWJsZWQge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/dashboard/nlp/nlp.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/dashboard/nlp/nlp.component.ts ***!
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
/* harmony import */ var _common_editor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/editor-service */ "./src/app/pages/dashboard/common/editor-service.ts");
/* harmony import */ var _common_http_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/http-service.service */ "./src/app/pages/dashboard/common/http-service.service.ts");
/* harmony import */ var _common_state_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/state-service.service */ "./src/app/pages/dashboard/common/state-service.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");







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
        this.http
            .put("v1/nlp/behavior", data, null)
            .subscribe(data => {
            console.log(data);
            this.stateservice.disableLoader();
            this.stateservice.setBehavior(data.behavior);
            this.stateservice.setActors(data.actors);
            this.stateservice.setConstraints(data.constraints);
            this._snackBar.open("Successfully Translated.", "close", {
                duration: 2000,
            });
            // this.stateservice.setBindings(data.Bindings);
        }, error => {
            this.stateservice.disableLoader();
            this._snackBar.open(error, "close", {
                duration: 2000,
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
    { type: _common_http_service_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _common_state_service_service__WEBPACK_IMPORTED_MODULE_5__["StateService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"] }
];
NlpComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "nlp",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./nlp.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/nlp/nlp.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./nlp.component.scss */ "./src/app/pages/dashboard/nlp/nlp.component.scss")).default]
    })
], NlpComponent);



/***/ }),

/***/ "./src/app/pages/dashboard/upload/upload.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/dashboard/upload/upload.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".pointer {\n  cursor: pointer;\n  padding: 0.2em;\n}\n\n.cdk-overlay-pane {\n  max-width: 80%;\n}\n\n.upload-name {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL3VwbG9hZC91cGxvYWQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGNBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7QUNDSjs7QURFQTtFQUNJLGtCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kYXNoYm9hcmQvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb2ludGVye1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAuMmVtO1xufVxuXG4uY2RrLW92ZXJsYXktcGFuZXtcbiAgICBtYXgtd2lkdGg6IDgwJTtcbn1cblxuLnVwbG9hZC1uYW1le1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iLCIucG9pbnRlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMC4yZW07XG59XG5cbi5jZGstb3ZlcmxheS1wYW5lIHtcbiAgbWF4LXdpZHRoOiA4MCU7XG59XG5cbi51cGxvYWQtbmFtZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/dashboard/upload/upload.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/dashboard/upload/upload.component.ts ***!
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
/* harmony import */ var _common_http_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/http-service.service */ "./src/app/pages/dashboard/common/http-service.service.ts");
/* harmony import */ var _common_state_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/state-service.service */ "./src/app/pages/dashboard/common/state-service.service.ts");






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
            formData.append('file', file);
            this.http.put('v1/upload/dew', formData, { responseType: 'blob' })
                .subscribe(data => {
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
            }, error => {
                this.state.disableLoader();
            });
        });
        //   alert(fileEntry.name+" is uploaded!");
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
UploadComponent.ctorParameters = () => [
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
    { type: _common_http_service_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _common_state_service_service__WEBPACK_IMPORTED_MODULE_5__["StateService"] }
];
UploadComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "upload",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./upload.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/upload/upload.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./upload.component.scss */ "./src/app/pages/dashboard/upload/upload.component.scss")).default]
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
        selector: 'file-preview',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./file.preview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/upload/file.preview.component.html")).default,
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]))
], FilePreviewComponent);



/***/ }),

/***/ "./src/app/pages/pages-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/pages-routing.module.ts ***!
  \***********************************************/
/*! exports provided: PagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesRoutingModule", function() { return PagesRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _authentication_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../@authentication/auth.guard */ "./src/app/@authentication/auth.guard.ts");




const routes = [{
        path: '',
        // component: PagesComponent,
        canActivate: [_authentication_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./dashboard/dashboard.module */ "./src/app/pages/dashboard/dashboard.module.ts"))
                    .then(m => m.DashboardModule),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
        ],
    }];
let PagesRoutingModule = class PagesRoutingModule {
};
PagesRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PagesRoutingModule);



/***/ }),

/***/ "./src/app/pages/pages.component.scss":
/*!********************************************!*\
  !*** ./src/app/pages/pages.component.scss ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".container {\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvcGFnZXMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3BhZ2VzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksU0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvcGFnZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVye1xuICAgIG1hcmdpbjogMDtcbn0iLCIuY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/pages.component.ts":
/*!******************************************!*\
  !*** ./src/app/pages/pages.component.ts ***!
  \******************************************/
/*! exports provided: PagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesComponent", function() { return PagesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PagesComponent = class PagesComponent {
    constructor() {
        this.alive = true;
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
PagesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-pages",
        template: `
  <layout>
  <router-outlet></router-outlet>
  
  </layout>
  `,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./pages.component.scss */ "./src/app/pages/pages.component.scss")).default]
    })
], PagesComponent);



/***/ }),

/***/ "./src/app/pages/pages.module.ts":
/*!***************************************!*\
  !*** ./src/app/pages/pages.module.ts ***!
  \***************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _pages_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages-routing.module */ "./src/app/pages/pages-routing.module.ts");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard/dashboard.module */ "./src/app/pages/dashboard/dashboard.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../@core/core.module */ "./src/app/@core/core.module.ts");
/* harmony import */ var _authentication_auth_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../@authentication/auth.module */ "./src/app/@authentication/auth.module.ts");









let PagesModule = class PagesModule {
};
PagesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        exports: [_pages_component__WEBPACK_IMPORTED_MODULE_3__["PagesComponent"]],
        declarations: [
            _pages_component__WEBPACK_IMPORTED_MODULE_3__["PagesComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
            _core_core_module__WEBPACK_IMPORTED_MODULE_7__["CoreModule"],
            _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_4__["DashboardModule"],
            _pages_routing_module__WEBPACK_IMPORTED_MODULE_2__["PagesRoutingModule"],
            ngx_quill__WEBPACK_IMPORTED_MODULE_6__["QuillModule"].forRoot(),
            _authentication_auth_module__WEBPACK_IMPORTED_MODULE_8__["AuthModule"].forRoot()
        ]
    })
], PagesModule);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false,
    apiUrl: '/api',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Shabbir/projects/DEW_UI/src/steel/WEB-APPLICATION/frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map