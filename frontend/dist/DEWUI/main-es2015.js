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

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/@auth/components/googleregistration/google-registration.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/@auth/components/googleregistration/google-registration.component.html ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\" *ngIf=\"alive\">\n  <div class=\"col-md-12\">\n    <p>Authenticating User...</p>\n  </div>\n</div>\n\n<div\n  class=\"row\"\n  *ngIf=\"!alive\"\n  style=\"margin: 5%; margin-left: 26%; margin-right: 26%;\"\n>\n  <div class=\"container\">\n    <div class=\"col-md-12\">\n      <mat-card>\n        <div class=\"row\" style=\"text-align: center;\">\n          <div class=\"col-md-12\">\n            <div class=\"navbar-header\">\n              <a class=\"navbar-brand\" href=\"#\">\n                <img\n                  src=\"./assets/isi_logo.gif\"\n                  class=\"img-thumbnail\"\n                  style=\"border: none; height: 35px;\"\n                  alt=\"\"\n                />\n              </a>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\" style=\"text-align: center;\">\n          <mat-form-field class=\"col-md-12\" appearance=\"outline\">\n            <mat-label>User Handle</mat-label>\n            <input\n              matInput\n              [(ngModel)]=\"userHandle\"\n              name=\"handle\"\n              pattern=\"[a-zA-Z0-9_]*\"\n              placeholder=\"Ex. @david_miller\"\n              (change)=\"checkHandle()\"\n            />\n            <mat-icon\n              matPrefix\n              class=\"fas fa-at pointer blue\"\n              (click)=\"enablePassword()\"\n            ></mat-icon>\n           \n           <mat-error>Pattern: combination of alphabet, number and underscore.</mat-error>\n           <mat-hint style=\"color:red\"*ngIf=\"isExist()\">User already Exists</mat-hint>\n          </mat-form-field>\n        </div>\n\n        <div class=\"row\" style=\"text-align: center;\">\n          <mat-form-field class=\"col-md-12\" appearance=\"outline\">\n            <mat-label>Email</mat-label>\n            <input matInput [(ngModel)]=\"emailId\" name=\"email\"  disabled />\n          </mat-form-field>\n        </div>\n        <div class=\"row\" style=\"text-align: center;\">\n          <mat-form-field class=\"col-md-12\" appearance=\"outline\">\n            <mat-label>Name</mat-label>\n            <input matInput [(ngModel)]=\"fullName\" name=\"name\" disabled />\n          </mat-form-field>\n        </div>\n        <div class=\"row\" style=\"text-align: center;\">\n          <div class=\"col-md-12\">\n            <button mat-stroked-button (click)=\"register()\" class=\"button\" [disabled]='!isEnable()'>\n              Register\n            </button>\n            <button mat-stroked-button (click)=\"cancel()\" class=\"button\">\n              Cancel\n            </button>\n          </div>\n        </div>\n      </mat-card>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/@auth/components/login/login.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/@auth/components/login/login.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row\" *ngIf=\"alive\">\n  <div class=\"col-md-12\">\n    <p>Authenticating User...</p>\n  </div>\n</div>\n\n<div\n  class=\"row\"\n  *ngIf=\"!alive\"\n  style=\"margin: 5%; margin-left: 26%; margin-right: 26%;\"\n>\n  <div class=\"container\">\n    <div class=\"col-md-12\">\n      <mat-card>\n       \n        <div class=\"row\" style=\"text-align: center;\">\n          <div class=\"col-md-12\"> <div class=\"navbar-header\">\n            \n            <a class=\"navbar-brand\" href=\"#\">\n              <img\n                src=\"./assets/isi_logo.gif\"\n                class=\"img-thumbnail\"\n                style=\"border:none;height: 35px;\"\n                alt=\"\"\n              />\n            </a>\n           \n            </div></div>\n        </div>\n        <div class=\"row\" style=\"text-align: center;\">\n          <mat-form-field class=\"col-md-12\">\n            <mat-label>Email</mat-label>\n            <input matInput [(ngModel)]=\"emailId\" name=\"email\" />\n            <mat-icon\n              matSuffix\n              *ngIf=\"emailId.length != 0 && isAlternateLoginEnable()\"\n              class=\"fas fa-angle-right pointer green\"\n              (click)=\"enablePassword()\"\n            ></mat-icon>\n          </mat-form-field>\n        </div>\n        <div\n          class=\"row\"\n          style=\"text-align: center;\"\n          *ngIf=\"isAlternateLoginEnable()\"\n        >\n          <div class=\"col-md-12\">\n            <p>or</p>\n            <button mat-stroked-button (click)=\"login()\">\n              Login using Google!\n            </button>\n          </div>\n        </div>\n        <div\n          class=\"row\"\n          *ngIf=\"!isAlternateLoginEnable()\"\n          style=\"text-align: center;\"\n        >\n          <mat-form-field class=\"col-md-12\">\n            <mat-label>Enter your password</mat-label>\n            <input\n              matInput\n              [type]=\"hide ? 'password' : 'text'\"\n              [(ngModel)]=\"password\"\n            />\n            <button\n              mat-icon-button\n              matSuffix\n              (click)=\"hide = !hide\"\n              [attr.aria-label]=\"'Hide password'\"\n              [attr.aria-pressed]=\"hide\"\n            >\n              <mat-icon>{{ hide ? \"visibility_off\" : \"visibility\" }}</mat-icon>\n            </button>\n            <button mat-icon-button matSuffix>\n              <mat-icon\n                *ngIf=\"password.length != 0\"\n                class=\"fas fa-angle-right pointer green\"\n                (click)=\"enablePassword()\"\n              ></mat-icon>\n            </button>\n          </mat-form-field>\n          <div class=\"col-md-12\">\n            <button mat-icon-button matSuffix>\n              <mat-icon\n                class=\"fas fa-angle-left pointer\"\n                (click)=\"disablePassword()\"\n              ></mat-icon>\n            </button>\n          </div>\n        </div>\n      </mat-card>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/@core/header/header.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/@core/header/header.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header\">\n  <nav class=\"navbar navbar-expand-lg static-top\" style=\"padding: 0;\">\n        <div class=\"container col-md-12\">\n          <div class=\"navbar-header\">\n            \n          <a class=\"navbar-brand\" href=\"#\">\n            <img\n              src=\"./assets/isi_logo.gif\"\n              class=\"img-thumbnail\"\n              style=\"border:none;height: 35px;\"\n              alt=\"\"\n            />\n          </a>\n         \n          </div>\n\n      \n          <button\n            class=\"navbar-toggler\"\n            type=\"button\"\n            data-toggle=\"collapse\"\n            data-target=\"#navbarResponsive\"\n            aria-controls=\"navbarResponsive\"\n            aria-expanded=\"false\"\n            aria-label=\"Toggle navigation\"\n          >\n            <span class=\"navbar-toggler-icon\"></span>\n          </button>\n\n          <div class=\"navbar-nav pointer\" [matMenuTriggerFor]=\"menu\">\n            <div class=\"profile\" *ngIf=\"!loggedIn\"></div>\n            <div class=\"profile_img\" *ngIf=\"loggedIn\"><img src=\"{{img}}\" width=\"40px\" height=\"40px\"></div>\n            <div class=\"username\"><span *ngIf=\"!loggedIn\">Login / Sign Up!</span><span *ngIf=\"loggedIn\">{{fullName}}</span></div>\n            <mat-menu #menu=\"matMenu\">\n              <button mat-menu-item (click)=\"loginWithGoogle()\" *ngIf=\"!loggedIn\">Login with Google</button>\n              <button mat-menu-item *ngIf=\"!loggedIn\">Sign Up</button>\n              <button mat-menu-item *ngIf=\"loggedIn\" (click)=\"logout()\">Logout</button>\n            </mat-menu>\n          </div>\n\n      \n    </div>\n    <!-- <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n        <ul class=\"navbar-nav ml-auto\">\n          <li class=\"nav-item active\">\n            <a class=\"nav-link\" href=\"#\">Home\n                  <span class=\"sr-only\">(current)</span>\n                </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">About</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">Services</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">Contact</a>\n          </li>\n        </ul>\n      </div> -->\n  </nav>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/@core/layout/layout.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/@core/layout/layout.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- \n<div class=\"row\" style=\"border-bottom: 1px solid #eee;\">\n  <div class=\"col-md-12\">\n    <header></header>\n \n  </div>\n\n</div>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n  <ng-content select=\"router-outlet\"></ng-content>\n</div>\n</div> -->\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <div class=\"wrapper\">\n      \n  <nav id=\"sidebar\" [ngClass]=\"{'active':menuFlag}\">\n  \n    <div class=\"sidebar-header\">\n      <i style=\"float:right\"  class=\"fas fa-times menu_pointer\"(click)=\" toggle()\"></i>\n     \n      <div class=\"navbar-nav pointer\" [matMenuTriggerFor]=\"menu\">\n        <div class=\"profile\" *ngIf=\"!loggedIn\"></div>\n        <div class=\"profile_img\" *ngIf=\"loggedIn\"><img src=\"{{img}}\" width=\"80px\" height=\"80px\">\n          <div class=\"username\"><span *ngIf=\"!loggedIn\">Login / Sign Up!</span><span *ngIf=\"loggedIn\">{{fullName}}<br><i>{{'@'+userHandle}}</i></span></div>\n        </div>\n        \n        <mat-menu #menu=\"matMenu\">\n          <button mat-menu-item (click)=\"loginWithGoogle()\" *ngIf=\"!loggedIn\">Login with Google</button>\n          <button mat-menu-item *ngIf=\"!loggedIn\">Sign Up</button>\n          <button mat-menu-item *ngIf=\"loggedIn\" (click)=\"logout()\">Logout</button>\n        </mat-menu>\n      </div>\n    </div>\n\n    <ul class=\"list-unstyled components\">\n        <!-- <li class=\"active\">\n            <a href=\"#homeSubmenu\" data-toggle=\"collapse\" aria-expanded=\"false\" class=\"dropdown-toggle\">Home</a>\n            <ul class=\"collapse list-unstyled\" id=\"homeSubmenu\">\n                <li>\n                    <a href=\"#\">Home 1</a>\n                </li>\n                <li>\n                    <a href=\"#\">Home 2</a>\n                </li>\n                <li>\n                    <a href=\"#\">Home 3</a>\n                </li>\n            </ul>\n        </li> -->\n        <li>\n            <a href=\"/pages/dashboard\">Dashboard</a>\n        </li>\n       \n    </ul>\n</nav>\n</div>\n<div id=\"content\" >\n  \n  <div class=\"row\" style=\"border-bottom: 1px solid #eee;\">\n    <div class=\"col-md-12\">\n   \n  <div class=\"header\">\n    <nav class=\"navbar navbar-expand-lg static-top\" style=\"padding: 0;\">\n          <div class=\"container col-md-12\"> \n   \n            <div class=\"navbar-header\">\n      <i  (click)=\" toggle()\" class=\"fas fa-bars menu_pointer\"></i>\n             \n            <a class=\"navbar-brand\" href=\"#\">\n              <img\n                src=\"./assets/isi_logo.gif\"\n                class=\"img-thumbnail\"\n                style=\"border:none;height: 35px;\"\n                alt=\"\"\n              />\n            </a>\n           \n            </div>\n  \n        \n            \n  \n      \n  \n        \n      </div>\n      \n    </nav>\n  </div>\n\n   \n</div>\n\n</div>\n<div class=\"row\" (click)=\"closeMenu()\">\n  <div class=\"col-md-12\">\n  <ng-content select=\"router-outlet\"></ng-content>\n</div>\n</div>\n</div>\n</div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>\n<div *ngIf=\"loaderSwitch\" class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>");

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

/***/ "./src/app/@auth/auth-routing.module.ts":
/*!**********************************************!*\
  !*** ./src/app/@auth/auth-routing.module.ts ***!
  \**********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/@auth/components/login/login.component.ts");
/* harmony import */ var _components_googlecallback_google_oauth2_callback_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/googlecallback/google-oauth2-callback.component */ "./src/app/@auth/components/googlecallback/google-oauth2-callback.component.ts");
/* harmony import */ var _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/logout/logout.component */ "./src/app/@auth/components/logout/logout.component.ts");
/* harmony import */ var _components_googleregistration_google_registration_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/googleregistration/google-registration.component */ "./src/app/@auth/components/googleregistration/google-registration.component.ts");







const routes = [
    {
        path: "",
        pathMatch: 'full',
        redirectTo: 'login'
        // component: LoginComponent
    },
    {
        path: "login",
        component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    },
    {
        path: "googleoauth2callback",
        component: _components_googlecallback_google_oauth2_callback_component__WEBPACK_IMPORTED_MODULE_4__["GoogleOAuth2CallbackComponent"]
    }, {
        path: "registerwithgoogle/:id",
        component: _components_googleregistration_google_registration_component__WEBPACK_IMPORTED_MODULE_6__["GoogleRegistrationComponent"]
    }, {
        path: "logout",
        component: _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_5__["LogoutComponent"]
    }
];
let AuthRoutingModule = class AuthRoutingModule {
};
AuthRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], AuthRoutingModule);



/***/ }),

/***/ "./src/app/@auth/auth.component.scss":
/*!*******************************************!*\
  !*** ./src/app/@auth/auth.component.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0BhdXRoL2F1dGguY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/@auth/auth.component.ts":
/*!*****************************************!*\
  !*** ./src/app/@auth/auth.component.ts ***!
  \*****************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AuthComponent = class AuthComponent {
};
AuthComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'auth',
        template: `

              <router-outlet></router-outlet>
        
  `,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./auth.component.scss */ "./src/app/@auth/auth.component.scss")).default]
    })
], AuthComponent);



/***/ }),

/***/ "./src/app/@auth/auth.guard.ts":
/*!*************************************!*\
  !*** ./src/app/@auth/auth.guard.ts ***!
  \*************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state-service.service */ "./src/app/state-service.service.ts");
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */






let AuthGuard = class AuthGuard {
    // canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    //   return this.authService.authenticated.pipe(map(logged => {
    //     console.log("inside canActivateChild");
    //       if(logged) {
    //         this.router.navigate(['/protected']);
    //         return false;
    //       }
    //       return true;
    //     })
    //     )
    // }
    // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    //   return this.authService.authenticated.pipe(map(logged => {
    //     console.log("inside canActivateChild");
    //       if(logged) {
    //         this.router.navigate(['/protected']);
    //         return false;
    //       }
    //       return true;
    //     })
    //     )
    // }
    constructor(authService, router, state) {
        this.authService = authService;
        this.router = router;
        this.state = state;
    }
    canActivate() {
        return this.authService.isAuthenticated().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(logged => {
            console.log("inside canActivate");
            console.log(logged);
            if (!logged) {
                this.router.navigate(['auth/login']);
                return false;
            }
            return true;
        }));
    }
};
AuthGuard.ctorParameters = () => [
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_5__["StateService"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AuthGuard);



/***/ }),

/***/ "./src/app/@auth/auth.module.ts":
/*!**************************************!*\
  !*** ./src/app/@auth/auth.module.ts ***!
  \**************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.guard */ "./src/app/@auth/auth.guard.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.component */ "./src/app/@auth/auth.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/@auth/components/login/login.component.ts");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../@core/core.module */ "./src/app/@core/core.module.ts");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/@auth/auth-routing.module.ts");
/* harmony import */ var _components_googlecallback_google_oauth2_callback_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/googlecallback/google-oauth2-callback.component */ "./src/app/@auth/components/googlecallback/google-oauth2-callback.component.ts");
/* harmony import */ var _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/logout/logout.component */ "./src/app/@auth/components/logout/logout.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _components_googleregistration_google_registration_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/googleregistration/google-registration.component */ "./src/app/@auth/components/googleregistration/google-registration.component.ts");
var AuthModule_1;














let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot() {
        return {
            ngModule: AuthModule_1,
            providers: [_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"], _auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]],
        };
    }
};
AuthModule = AuthModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        exports: [_auth_component__WEBPACK_IMPORTED_MODULE_6__["AuthComponent"]],
        declarations: [
            _auth_component__WEBPACK_IMPORTED_MODULE_6__["AuthComponent"],
            _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
            _components_googlecallback_google_oauth2_callback_component__WEBPACK_IMPORTED_MODULE_10__["GoogleOAuth2CallbackComponent"],
            _components_logout_logout_component__WEBPACK_IMPORTED_MODULE_11__["LogoutComponent"],
            _components_googleregistration_google_registration_component__WEBPACK_IMPORTED_MODULE_13__["GoogleRegistrationComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _core_core_module__WEBPACK_IMPORTED_MODULE_8__["CoreModule"],
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_9__["AuthRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatCardModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"]
        ]
    })
], AuthModule);



/***/ }),

/***/ "./src/app/@auth/auth.service.ts":
/*!***************************************!*\
  !*** ./src/app/@auth/auth.service.ts ***!
  \***************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../http-service.service */ "./src/app/http-service.service.ts");




let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.login = false;
        this.isAuthenticate = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
    }
    startSession(id) {
        var param = {
            token: id
        };
        return this.http.post('/api/v1/user/validateUser/', param);
    }
    authenticate(arg0) {
        // //console.log(window.location.hash.substr(1));
        var params = {};
        window.location.hash.substr(1).split('&').map(hk => {
            let temp = hk.split('=');
            params[temp[0]] = temp[1];
        });
        // //console.log(params);
        this.token = params["access_token"];
        this.expiry = Number(params["expires_in"]);
        return this.startSession(params["access_token"]);
    }
    enableAuthentication() {
        this.isAuthenticate.next(true);
        this.setCookie("token", this.token, this.expiry);
    }
    getToken() {
        return this.token;
    }
    onAuthenticationChange() {
        throw new Error("Method not implemented.");
    }
    isAuthenticated() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.checkAuthentication());
    }
    checkAuthentication() {
        //console.log("check");
        if (!this.isAuthenticate.value) {
            var token = this.getCookie("token");
            //console.log(token);
            if (token != "") {
                this.isAuthenticate.next(true);
                this.token = token;
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    setCookie(key, value, seconds) {
        //console.log(key+"::"+value);
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
    }
    getCookie(key) {
        var name = key + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    loginWithGoogle() {
        // var redirect = 'http://dew.isi.edu/auth/googleoauth2callback';
        var redirect = 'http://localhost:4200/auth/googleoauth2callback';
        var client_id = '926607687771-0lll564e4sbjo4davt10fufmhuehgl1s.apps.googleusercontent.com';
        var url = [];
        //  var apuUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        var apiurl = "https://accounts.google.com/o/oauth2/auth";
        url.push(apiurl);
        url.push("?redirect_uri=" + encodeURIComponent(redirect));
        url.push("&response_type=token");
        url.push("&scope=email%20profile%20openid%20" + encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile") + "&fetch_basic_profile=true");
        url.push("&client_id=" + client_id);
        // url.push("&ss_domain=https%3A%2F%2Fdevelopers-dot-devsite-v2-prod.appspot.com&gsiwebsdk=2");
        //console.log(url.join(""));
        window.location.href = url.join("");
    }
    logout() {
        //console.log("logout");
        this.isAuthenticate.next(false);
        this.login = false;
        this.token = "";
        this.setCookie("token", "", 0);
        this.setCookie("emailId", "", 0);
        this.setCookie("fullName", "", 0);
        this.setCookie("givenName", "", 0);
        this.setCookie("lastName", "", 0);
        this.setCookie("img", "", 0);
        this.setCookie("userHandle", "", 0);
    }
};
AuthService.ctorParameters = () => [
    { type: _http_service_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] }
];
AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], AuthService);



/***/ }),

/***/ "./src/app/@auth/components/googlecallback/google-oauth2-callback.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/@auth/components/googlecallback/google-oauth2-callback.component.scss ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0BhdXRoL2NvbXBvbmVudHMvZ29vZ2xlY2FsbGJhY2svZ29vZ2xlLW9hdXRoMi1jYWxsYmFjay5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/@auth/components/googlecallback/google-oauth2-callback.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/@auth/components/googlecallback/google-oauth2-callback.component.ts ***!
  \*************************************************************************************/
/*! exports provided: GoogleOAuth2CallbackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleOAuth2CallbackComponent", function() { return GoogleOAuth2CallbackComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var _init_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../init-user.service */ "./src/app/@auth/init-user.service.ts");






let GoogleOAuth2CallbackComponent = class GoogleOAuth2CallbackComponent {
    constructor(authService, router, initUserService) {
        this.authService = authService;
        this.router = router;
        this.initUserService = initUserService;
        this.alive = true;
        this.name = '';
        this.authService.authenticate('google')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeWhile"])(() => this.alive))
            .subscribe((authResult) => {
            console.log(authResult);
            if (authResult.navigateTo == undefined) {
                this.authService.enableAuthentication();
                this.router.navigate(['pages/dashboard']);
            }
            else
                this.router.navigate(['auth/registerwithgoogle', this.authService.getToken()]);
            // }
        });
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
GoogleOAuth2CallbackComponent.ctorParameters = () => [
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _init_user_service__WEBPACK_IMPORTED_MODULE_5__["InitUserService"] }
];
GoogleOAuth2CallbackComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'google-oauth2-callback',
        template: `
  <div>
    <div>Signing in.....</div>
  </div>
`,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./google-oauth2-callback.component.scss */ "./src/app/@auth/components/googlecallback/google-oauth2-callback.component.scss")).default]
    })
], GoogleOAuth2CallbackComponent);



/***/ }),

/***/ "./src/app/@auth/components/googleregistration/google-registration.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/@auth/components/googleregistration/google-registration.component.scss ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".blue {\n  color: blue;\n  margin-right: 0.4rem;\n}\n\n.button {\n  float: right;\n  margin: 0.2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvQGF1dGgvY29tcG9uZW50cy9nb29nbGVyZWdpc3RyYXRpb24vZ29vZ2xlLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvQGF1dGgvY29tcG9uZW50cy9nb29nbGVyZWdpc3RyYXRpb24vZ29vZ2xlLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxvQkFBQTtBQ0NKOztBRENBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7QUNFSiIsImZpbGUiOiJzcmMvYXBwL0BhdXRoL2NvbXBvbmVudHMvZ29vZ2xlcmVnaXN0cmF0aW9uL2dvb2dsZS1yZWdpc3RyYXRpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmx1ZXtcbiAgICBjb2xvcjpibHVlO1xuICAgIG1hcmdpbi1yaWdodDogLjRyZW07XG59XG4uYnV0dG9ue1xuICAgIGZsb2F0OnJpZ2h0O1xuICAgIG1hcmdpbjouMnJlbTtcbn0iLCIuYmx1ZSB7XG4gIGNvbG9yOiBibHVlO1xuICBtYXJnaW4tcmlnaHQ6IDAuNHJlbTtcbn1cblxuLmJ1dHRvbiB7XG4gIGZsb2F0OiByaWdodDtcbiAgbWFyZ2luOiAwLjJyZW07XG59Il19 */");

/***/ }),

/***/ "./src/app/@auth/components/googleregistration/google-registration.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/@auth/components/googleregistration/google-registration.component.ts ***!
  \**************************************************************************************/
/*! exports provided: GoogleRegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleRegistrationComponent", function() { return GoogleRegistrationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _init_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../init-user.service */ "./src/app/@auth/init-user.service.ts");

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */



let GoogleRegistrationComponent = class GoogleRegistrationComponent {
    constructor(router, route, userService, changeDetection) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.changeDetection = changeDetection;
        this.alive = true;
        this.emailId = "";
        this.fullName = "";
        this.userHandle = "";
        this.active = false;
        this.userHandleExist = false;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params["id"] != "") {
                console.log(params["id"]);
                this.token = params["id"];
                return this.userService.getUserDetailForRegistration(params["id"]).then(data => {
                    this.fullName = data.fullName;
                    this.emailId = data.emailId;
                    this.enableUI();
                });
            }
        });
        return null;
    }
    enableUI() {
        this.alive = false;
        console.log(this.alive);
        this.changeDetection.detectChanges();
    }
    cancel() {
        this.router.navigate(['auth/login']);
    }
    register() {
        if (this.validate()) {
            var params = {
                handle: this.userHandle,
                token: this.token
            };
            this.userService.registerUser(params).subscribe(flag => {
                if (flag)
                    this.router.navigate(['pages/dashboard']);
                else {
                    alert("Error: Please try again");
                    this.router.navigate(['auth/login']);
                }
            });
            //this.state.enableLoader();
        }
    }
    isExist() { return this.userHandleExist; }
    validate() {
        let pattern = /^[a-zA-Z0-9_]+$/i;
        return pattern.test(this.userHandle);
    }
    checkHandle() {
        if (this.validate()) {
            var params = {
                handle: this.userHandle
            };
            //this.state.enableLoader();
            this.userService.checkHandle(params).subscribe(data => {
                //this.state.disableLoader();
                this.active = data.valid;
                this.userHandleExist = !data.valid;
            });
        }
        else {
            this.active = false;
        }
    }
    isEnable() {
        return this.active;
    }
};
GoogleRegistrationComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _init_user_service__WEBPACK_IMPORTED_MODULE_3__["InitUserService"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
];
GoogleRegistrationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "google-registration",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./google-registration.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/@auth/components/googleregistration/google-registration.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./google-registration.component.scss */ "./src/app/@auth/components/googleregistration/google-registration.component.scss")).default]
    })
], GoogleRegistrationComponent);



/***/ }),

/***/ "./src/app/@auth/components/login/login.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/@auth/components/login/login.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#customBtn {\n  display: inline-block;\n  background: white;\n  color: #444;\n  width: 190px;\n  border-radius: 5px;\n  border: thin solid #888;\n  box-shadow: 1px 1px 1px grey;\n  white-space: nowrap;\n}\n\n#customBtn:hover {\n  cursor: pointer;\n}\n\nspan.label {\n  font-family: serif;\n  font-weight: normal;\n}\n\nspan.icon {\n  background: url(\"/assets/g-normal.png\") transparent 5px 50% no-repeat;\n  display: inline-block;\n  vertical-align: middle;\n  width: 42px;\n  height: 42px;\n}\n\nspan.buttonText {\n  display: inline-block;\n  vertical-align: middle;\n  padding-left: 42px;\n  padding-right: 42px;\n  font-size: 14px;\n  font-weight: bold;\n  /* Use the Roboto font that is loaded in the <head> */\n  font-family: \"Roboto\", sans-serif;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.green {\n  color: green;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvQGF1dGgvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvQGF1dGgvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSw0QkFBQTtFQUNBLG1CQUFBO0FDQ0o7O0FEQ0U7RUFDRSxlQUFBO0FDRUo7O0FEQUU7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FDR0o7O0FEREU7RUFDRSxxRUFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ0lKOztBREZFO0VBQ0UscUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxxREFBQTtFQUNBLGlDQUFBO0FDS0o7O0FESEU7RUFDRSxlQUFBO0FDTUo7O0FESEU7RUFDRSxZQUFBO0FDTUoiLCJmaWxlIjoic3JjL2FwcC9AYXV0aC9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2N1c3RvbUJ0biB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGNvbG9yOiAjNDQ0O1xuICAgIHdpZHRoOiAxOTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYm9yZGVyOiB0aGluIHNvbGlkICM4ODg7XG4gICAgYm94LXNoYWRvdzogMXB4IDFweCAxcHggZ3JleTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG4gICNjdXN0b21CdG46aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuICBzcGFuLmxhYmVsIHtcbiAgICBmb250LWZhbWlseTogc2VyaWY7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgfVxuICBzcGFuLmljb24ge1xuICAgIGJhY2tncm91bmQ6IHVybCgnL2Fzc2V0cy9nLW5vcm1hbC5wbmcnKSB0cmFuc3BhcmVudCA1cHggNTAlIG5vLXJlcGVhdDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB3aWR0aDogNDJweDtcbiAgICBoZWlnaHQ6IDQycHg7XG4gIH1cbiAgc3Bhbi5idXR0b25UZXh0IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDQycHg7XG4gICAgcGFkZGluZy1yaWdodDogNDJweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgLyogVXNlIHRoZSBSb2JvdG8gZm9udCB0aGF0IGlzIGxvYWRlZCBpbiB0aGUgPGhlYWQ+ICovXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xuICB9XG4gIC5wb2ludGVye1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5ncmVlbntcbiAgICBjb2xvcjogZ3JlZW47O1xuICB9IiwiI2N1c3RvbUJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiAjNDQ0O1xuICB3aWR0aDogMTkwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyOiB0aGluIHNvbGlkICM4ODg7XG4gIGJveC1zaGFkb3c6IDFweCAxcHggMXB4IGdyZXk7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbiNjdXN0b21CdG46aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbnNwYW4ubGFiZWwge1xuICBmb250LWZhbWlseTogc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbnNwYW4uaWNvbiB7XG4gIGJhY2tncm91bmQ6IHVybChcIi9hc3NldHMvZy1ub3JtYWwucG5nXCIpIHRyYW5zcGFyZW50IDVweCA1MCUgbm8tcmVwZWF0O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdpZHRoOiA0MnB4O1xuICBoZWlnaHQ6IDQycHg7XG59XG5cbnNwYW4uYnV0dG9uVGV4dCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgcGFkZGluZy1sZWZ0OiA0MnB4O1xuICBwYWRkaW5nLXJpZ2h0OiA0MnB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAvKiBVc2UgdGhlIFJvYm90byBmb250IHRoYXQgaXMgbG9hZGVkIGluIHRoZSA8aGVhZD4gKi9cbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5wb2ludGVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZ3JlZW4ge1xuICBjb2xvcjogZ3JlZW47XG59Il19 */");

/***/ }),

/***/ "./src/app/@auth/components/login/login.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/@auth/components/login/login.component.ts ***!
  \***********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auth.service */ "./src/app/@auth/auth.service.ts");

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */




let LoginComponent = class LoginComponent {
    constructor(cd, fb, router, authService) {
        this.cd = cd;
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.alive = true;
        this.emailId = "";
        this.password = "";
        this.hide = true;
        this.showAlternatelogin = true;
    }
    ngOnInit() {
        if (this.authService.checkAuthentication()) {
            this.router.navigate(['pages/dashboard']);
        }
        else {
            this.alive = false;
        }
    }
    login() {
        this.authService.loginWithGoogle();
    }
    enablePassword() {
        this.showAlternatelogin = false;
    }
    disablePassword() {
        this.showAlternatelogin = true;
    }
    isAlternateLoginEnable() {
        return this.showAlternatelogin;
    }
};
LoginComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'login',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/@auth/components/login/login.component.html")).default,
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.scss */ "./src/app/@auth/components/login/login.component.scss")).default]
    })
], LoginComponent);



/***/ }),

/***/ "./src/app/@auth/components/logout/logout.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/@auth/components/logout/logout.component.ts ***!
  \*************************************************************/
/*! exports provided: LogoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutComponent", function() { return LogoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth.service */ "./src/app/@auth/auth.service.ts");

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */


let LogoutComponent = class LogoutComponent {
    constructor(authService) {
        this.authService = authService;
        this.alive = true;
        authService.logout();
    }
};
LogoutComponent.ctorParameters = () => [
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }
];
LogoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'logout',
        template: '<p> logout Successfully</p>',
        //styleUrls:['login.component.scss'],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
    })
], LogoutComponent);



/***/ }),

/***/ "./src/app/@auth/init-user.service.ts":
/*!********************************************!*\
  !*** ./src/app/@auth/init-user.service.ts ***!
  \********************************************/
/*! exports provided: InitUserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitUserService", function() { return InitUserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../http-service.service */ "./src/app/http-service.service.ts");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state-service.service */ "./src/app/state-service.service.ts");






let InitUserService = class InitUserService {
    constructor(http, authService, state) {
        this.http = http;
        this.authService = authService;
        this.state = state;
        this.login = false;
        this.user = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
    }
    getUser() {
        return this.user.asObservable();
    }
    getUserDetailForRegistration(id) {
        return new Promise((resolve, reject) => {
            var param = {
                token: id,
            };
            this.http
                .post("/api/v1/user/getgoogleuserinfo/", param)
                .subscribe((data) => {
                // console.log(data);
                resolve(data);
            });
        });
    }
    initCurrentUser() {
        var fullName = this.authService.getCookie("fullName");
        var emailId = this.authService.getCookie("emailId");
        var img = this.authService.getCookie("img");
        var givenName = this.authService.getCookie("givenName");
        var lastName = this.authService.getCookie("lastName");
        var userId = this.authService.getCookie("userId");
        var userHandle = this.authService.getCookie("userHandle");
        var result = {
            fullName: fullName,
            emailId: emailId,
            img: img,
            givenName: givenName,
            lastName: lastName,
            userId: userId,
            userHandle: userHandle
        };
        if (fullName == undefined ||
            fullName == null ||
            fullName == "" ||
            userHandle == undefined ||
            userHandle == null ||
            userHandle == "" ||
            emailId == undefined ||
            emailId == null ||
            emailId == "" ||
            givenName == undefined ||
            givenName == null ||
            givenName == "" ||
            lastName == undefined ||
            lastName == null ||
            lastName == "" ||
            userId == undefined ||
            userId == null ||
            userId == "" ||
            img == undefined ||
            img == null ||
            img == "") {
            var param = {
                token: this.authService.getToken(),
            };
            this.state.enableLoader();
            this.http.post("/api/v1/user/getuserinfo/", param).subscribe((data) => {
                console.log(data);
                this.authService.setCookie("emailId", data.emailId, 3599);
                this.authService.setCookie("givenName", data.givenName, 3599);
                this.authService.setCookie("lastName", data.lastName, 3599);
                this.authService.setCookie("img", data.img, 3599);
                this.authService.setCookie("fullName", data.fullName, 3599);
                this.authService.setCookie("userId", data.userId, 3599);
                this.authService.setCookie("userHandle", data.userHandle, 3599);
                this.state.disableLoader();
                this.user.next(data);
            });
        }
        else {
            this.user.next(result);
        }
    }
    registerUser(params) {
        var t = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.http.post("api/v1/user/registerUser/", params).subscribe(data => {
            if (data.message != undefined && data.message != null) {
                this.authService.setCookie("token", params.token, 3599);
                t.next(true);
            }
            else {
                t.next(false);
            }
            this.state.disableLoader();
        });
        return t;
    }
    checkHandle(params) {
        var t = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.state.enableLoader();
        this.http.post("api/v1/user/validateUserHandle/", params).subscribe(data => {
            t.next(data);
            this.state.disableLoader();
        });
        return t;
    }
};
InitUserService.ctorParameters = () => [
    { type: _http_service_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"] },
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_5__["StateService"] }
];
InitUserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: "root",
    })
], InitUserService);



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
        ], exports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], ...COMPONENTS]
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
/* harmony default export */ __webpack_exports__["default"] = (".container {\n  margin: 0;\n}\n\n.profilePhoto {\n  vertical-align: middle;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n}\n\n.profile {\n  background: url('profilephoto.svg');\n  vertical-align: middle;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  margin: 4px;\n}\n\n.profile_img img {\n  vertical-align: middle;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  margin: 4px;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.username {\n  vertical-align: middle;\n  padding: 0.8em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvQGNvcmUvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvQGNvcmUvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFNBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksbUNBQUE7RUFFQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFFQSxXQUFBO0FDREo7O0FESUE7RUFFSSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFFQSxXQUFBO0FDSEo7O0FETUE7RUFDSSxlQUFBO0FDSEo7O0FETUE7RUFDSSxzQkFBQTtFQUVBLGNBQUE7QUNKSiIsImZpbGUiOiJzcmMvYXBwL0Bjb3JlL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVye1xuICAgIG1hcmdpbjogMDtcbn1cblxuLnByb2ZpbGVQaG90b3tcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbi5wcm9maWxle1xuICAgIGJhY2tncm91bmQ6IHVybChcImFzc2V0cy9wcm9maWxlcGhvdG8uc3ZnXCIpO1xuICAgXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB3aWR0aDogNDBweDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBcbiAgICBtYXJnaW46IDRweDtcbn1cblxuLnByb2ZpbGVfaW1nIGltZ3tcbiAgXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB3aWR0aDogNDBweDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBcbiAgICBtYXJnaW46IDRweDtcbn1cblxuLnBvaW50ZXJ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udXNlcm5hbWV7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgLy8gIGNvbG9yOiNlZWU7XG4gICAgcGFkZGluZzogMC44ZW07XG59IiwiLmNvbnRhaW5lciB7XG4gIG1hcmdpbjogMDtcbn1cblxuLnByb2ZpbGVQaG90byB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuLnByb2ZpbGUge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCJhc3NldHMvcHJvZmlsZXBob3RvLnN2Z1wiKTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBtYXJnaW46IDRweDtcbn1cblxuLnByb2ZpbGVfaW1nIGltZyB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luOiA0cHg7XG59XG5cbi5wb2ludGVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udXNlcm5hbWUge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBwYWRkaW5nOiAwLjhlbTtcbn0iXX0= */");

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
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/@auth/auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var src_app_auth_init_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/@auth/init-user.service */ "./src/app/@auth/init-user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let HeaderComponent = class HeaderComponent {
    constructor(authService, initUserService, route) {
        this.authService = authService;
        this.initUserService = initUserService;
        this.route = route;
        this.loggedIn = false;
    }
    ngOnInit() {
        this.initUserService.getUser().subscribe(user => {
            console.log(user);
            if (user != null) {
                this.userName = user.givenName;
                this.fullName = user.fullName;
                this.img = user.img;
            }
        });
        this.authService.isAuthenticated().subscribe(loggedin => {
            console.log();
            this.loggedIn = loggedin;
            if (loggedin) {
                this.initUserService.initCurrentUser();
            }
        });
    }
    loginWithGoogle() {
        this.authService.loginWithGoogle();
    }
    logout() {
        console.log("logout");
        // this.authService.logout();
        window.location.href = "/auth/logout";
        //  window.location.reload();
    }
};
HeaderComponent.ctorParameters = () => [
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: src_app_auth_init_user_service__WEBPACK_IMPORTED_MODULE_3__["InitUserService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
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
/* harmony default export */ __webpack_exports__["default"] = ("a, a:hover, a:focus {\n  color: inherit;\n  text-decoration: none;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n\n#sidebar {\n  width: 250px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  z-index: 999;\n  background: #7386D5;\n  color: #fff;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  margin-left: -250px;\n}\n\n#sidebar.active {\n  margin-left: 0;\n}\n\n#sidebar .sidebar-header {\n  padding: 20px;\n  background: #6d7fcc;\n}\n\n#sidebar ul.components {\n  border-bottom: 1px solid #47748b;\n}\n\n#sidebar ul p {\n  color: #fff;\n  padding: 10px;\n}\n\n#sidebar ul li a {\n  padding: 10px;\n  font-size: 1.1em;\n  display: block;\n}\n\n#sidebar ul li a:hover {\n  color: #7386D5;\n  background: #fff;\n}\n\n#sidebar ul li.active > a, a[aria-expanded=true] {\n  color: #fff;\n  background: #6d7fcc;\n}\n\nul ul a {\n  font-size: 0.9em !important;\n  padding-left: 30px !important;\n  background: #6d7fcc;\n}\n\n.container {\n  margin: 0;\n}\n\n.profilePhoto {\n  vertical-align: middle;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n}\n\n.profile {\n  background: url('profilephoto.svg');\n  vertical-align: middle;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  margin: 4px;\n}\n\n.profile_img img {\n  vertical-align: middle;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  margin: 4px;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.username {\n  vertical-align: middle;\n}\n\n.menu_pointer {\n  margin: 0.3rem;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvQGNvcmUvbGF5b3V0L2xheW91dC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvQGNvcmUvbGF5b3V0L2xheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxxQkFBQTtFQUNBLDRCQUFBO0VBQUEsb0JBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7RUFDQSxlQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLDRCQUFBO0VBQUEsb0JBQUE7RUFDQSxtQkFBQTtBQ0NKOztBRENBO0VBQ0ksY0FBQTtBQ0VKOztBREFBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FDR0o7O0FEQUE7RUFFSSxnQ0FBQTtBQ0VKOztBRENBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7QUNFSjs7QURDQTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUNFSjs7QURBQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtBQ0dKOztBREFBO0VBQ0ksV0FBQTtFQUNBLG1CQUFBO0FDR0o7O0FEREE7RUFDSSwyQkFBQTtFQUNBLDZCQUFBO0VBQ0EsbUJBQUE7QUNJSjs7QUREQTtFQUNJLFNBQUE7QUNJSjs7QUREQTtFQUNJLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0lKOztBRERBO0VBQ0ksbUNBQUE7RUFFQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFFQSxXQUFBO0FDRUo7O0FEQ0E7RUFFSSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFFQSxXQUFBO0FDQUo7O0FER0E7RUFDSSxlQUFBO0FDQUo7O0FER0E7RUFDSSxzQkFBQTtBQ0FKOztBRElBO0VBQ0ksY0FBQTtFQUNBLGVBQUE7QUNESiIsImZpbGUiOiJzcmMvYXBwL0Bjb3JlL2xheW91dC9sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhLCBhOmhvdmVyLCBhOmZvY3VzIHtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG59XG5cbiNzaWRlYmFyIHtcbiAgICB3aWR0aDogMjUwcHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgei1pbmRleDogOTk5O1xuICAgIGJhY2tncm91bmQ6ICM3Mzg2RDU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gICAgbWFyZ2luLWxlZnQ6LTI1MHB4O1xufVxuI3NpZGViYXIuYWN0aXZle1xuICAgIG1hcmdpbi1sZWZ0OjA7XG59XG4jc2lkZWJhciAuc2lkZWJhci1oZWFkZXIge1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgYmFja2dyb3VuZDogIzZkN2ZjYztcbn1cblxuI3NpZGViYXIgdWwuY29tcG9uZW50cyB7XG4gICBcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzQ3NzQ4Yjtcbn1cblxuI3NpZGViYXIgdWwgcCB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgcGFkZGluZzogMTBweDtcbn1cblxuI3NpZGViYXIgdWwgbGkgYSB7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBmb250LXNpemU6IDEuMWVtO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuI3NpZGViYXIgdWwgbGkgYTpob3ZlciB7XG4gICAgY29sb3I6ICM3Mzg2RDU7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbn1cblxuI3NpZGViYXIgdWwgbGkuYWN0aXZlID4gYSwgYVthcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXSB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYmFja2dyb3VuZDogIzZkN2ZjYztcbn1cbnVsIHVsIGEge1xuICAgIGZvbnQtc2l6ZTogMC45ZW0gIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHggIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kOiAjNmQ3ZmNjO1xufVxuXG4uY29udGFpbmVye1xuICAgIG1hcmdpbjogMDtcbn1cblxuLnByb2ZpbGVQaG90b3tcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbi5wcm9maWxle1xuICAgIGJhY2tncm91bmQ6IHVybChcImFzc2V0cy9wcm9maWxlcGhvdG8uc3ZnXCIpO1xuICAgXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB3aWR0aDogNDBweDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBcbiAgICBtYXJnaW46IDRweDtcbn1cblxuLnByb2ZpbGVfaW1nIGltZ3tcbiAgXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB3aWR0aDogODBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBcbiAgICBtYXJnaW46IDRweDtcbn1cblxuLnBvaW50ZXJ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udXNlcm5hbWV7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgLy8gIGNvbG9yOiNlZWU7XG4gICBcbn1cbi5tZW51X3BvaW50ZXJ7XG4gICAgbWFyZ2luOiAuM3JlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbn0iLCJhLCBhOmhvdmVyLCBhOmZvY3VzIHtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG59XG5cbiNzaWRlYmFyIHtcbiAgd2lkdGg6IDI1MHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgei1pbmRleDogOTk5O1xuICBiYWNrZ3JvdW5kOiAjNzM4NkQ1O1xuICBjb2xvcjogI2ZmZjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gIG1hcmdpbi1sZWZ0OiAtMjUwcHg7XG59XG5cbiNzaWRlYmFyLmFjdGl2ZSB7XG4gIG1hcmdpbi1sZWZ0OiAwO1xufVxuXG4jc2lkZWJhciAuc2lkZWJhci1oZWFkZXIge1xuICBwYWRkaW5nOiAyMHB4O1xuICBiYWNrZ3JvdW5kOiAjNmQ3ZmNjO1xufVxuXG4jc2lkZWJhciB1bC5jb21wb25lbnRzIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM0Nzc0OGI7XG59XG5cbiNzaWRlYmFyIHVsIHAge1xuICBjb2xvcjogI2ZmZjtcbiAgcGFkZGluZzogMTBweDtcbn1cblxuI3NpZGViYXIgdWwgbGkgYSB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMS4xZW07XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4jc2lkZWJhciB1bCBsaSBhOmhvdmVyIHtcbiAgY29sb3I6ICM3Mzg2RDU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG59XG5cbiNzaWRlYmFyIHVsIGxpLmFjdGl2ZSA+IGEsIGFbYXJpYS1leHBhbmRlZD10cnVlXSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiAjNmQ3ZmNjO1xufVxuXG51bCB1bCBhIHtcbiAgZm9udC1zaXplOiAwLjllbSAhaW1wb3J0YW50O1xuICBwYWRkaW5nLWxlZnQ6IDMwcHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogIzZkN2ZjYztcbn1cblxuLmNvbnRhaW5lciB7XG4gIG1hcmdpbjogMDtcbn1cblxuLnByb2ZpbGVQaG90byB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuLnByb2ZpbGUge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCJhc3NldHMvcHJvZmlsZXBob3RvLnN2Z1wiKTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBtYXJnaW46IDRweDtcbn1cblxuLnByb2ZpbGVfaW1nIGltZyB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHdpZHRoOiA4MHB4O1xuICBoZWlnaHQ6IDgwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luOiA0cHg7XG59XG5cbi5wb2ludGVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udXNlcm5hbWUge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4ubWVudV9wb2ludGVyIHtcbiAgbWFyZ2luOiAwLjNyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn0iXX0= */");

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
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/@auth/auth.service */ "./src/app/@auth/auth.service.ts");
/* harmony import */ var src_app_auth_init_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/@auth/init-user.service */ "./src/app/@auth/init-user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let LayoutComponent = class LayoutComponent {
    constructor(authService, initUserService, route) {
        this.authService = authService;
        this.initUserService = initUserService;
        this.route = route;
        this.loggedIn = false;
        this.menuFlag = false;
    }
    ngOnInit() {
        this.initUserService.getUser().subscribe(user => {
            console.log(user);
            if (user != null) {
                this.userName = user.givenName;
                this.fullName = user.fullName;
                this.img = user.img;
                this.userHandle = user.userHandle;
            }
        });
        this.authService.isAuthenticated().subscribe(loggedin => {
            console.log();
            this.loggedIn = loggedin;
            if (loggedin) {
                this.initUserService.initCurrentUser();
            }
        });
    }
    loginWithGoogle() {
        this.authService.loginWithGoogle();
    }
    closeMenu() {
        this.menuFlag = false;
    }
    logout() {
        console.log("logout");
        // this.authService.logout();
        window.location.href = "/auth/logout";
        //  window.location.reload();
    }
    toggle() {
        this.menuFlag = !this.menuFlag;
    }
};
LayoutComponent.ctorParameters = () => [
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: src_app_auth_init_user_service__WEBPACK_IMPORTED_MODULE_3__["InitUserService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
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
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./@auth/auth.guard */ "./src/app/@auth/auth.guard.ts");




const routes = [
    {
        path: 'pages',
        canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]],
        loadChildren: () => Promise.all(/*! import() | pages-pages-module */[__webpack_require__.e("default~pages-pages-module~public-public-module"), __webpack_require__.e("default~hlbparser-hlpparser-module~pages-pages-module"), __webpack_require__.e("pages-pages-module")]).then(__webpack_require__.bind(null, /*! ./pages/pages.module */ "./src/app/pages/pages.module.ts"))
            .then(m => m.PagesModule),
    },
    {
        path: 'public',
        loadChildren: () => Promise.all(/*! import() | public-public-module */[__webpack_require__.e("default~pages-pages-module~public-public-module"), __webpack_require__.e("default~hlbparser-hlpparser-module~public-public-module"), __webpack_require__.e("public-public-module")]).then(__webpack_require__.bind(null, /*! ./public/public.module */ "./src/app/public/public.module.ts"))
            .then(m => m.PublicModule),
    }, {
        path: 'auth',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./@auth/auth.module */ "./src/app/@auth/auth.module.ts"))
            .then(m => m.AuthModule),
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
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state-service.service */ "./src/app/state-service.service.ts");



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
    }
};
AppComponent.ctorParameters = () => [
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"] }
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
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./http-service.service */ "./src/app/http-service.service.ts");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./@auth/auth.module */ "./src/app/@auth/auth.module.ts");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state-service.service */ "./src/app/state-service.service.ts");











let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
        ],
        imports: [
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_9__["AuthModule"].forRoot(),
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
            // PagesModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]
        ],
        providers: [_http_service_service__WEBPACK_IMPORTED_MODULE_8__["HttpService"], _state_service_service__WEBPACK_IMPORTED_MODULE_10__["StateService"]
            // AppService,
            // {
            //   provide: APP_INITIALIZER,
            //   useFactory: (ds: AppService) => function() {return ds.load()},
            //   deps: [AppService],
            //   multi: true
            // }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/http-service.service.ts":
/*!*****************************************!*\
  !*** ./src/app/http-service.service.ts ***!
  \*****************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
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
        return this.http.delete(`${this.apiUrl}/${endpoint}`, options);
    }
};
HttpService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
HttpService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], HttpService);



/***/ }),

/***/ "./src/app/state-service.service.ts":
/*!******************************************!*\
  !*** ./src/app/state-service.service.ts ***!
  \******************************************/
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
        this.experimentName = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]("");
        this.experimentDescription = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]("");
        this.tokenList = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]("");
    }
    getTokenLevel() { return this.tokenLevel; }
    setTokenLevel(tokenLevel) { this.tokenLevel = tokenLevel; }
    setTokenList(data) {
        this.tokenList.next(data);
    }
    getTokenList() {
        return this.tokenList.asObservable();
    }
    enableLoader() {
        this.loaderSwitch.next(true);
    }
    disableLoader() {
        this.loaderSwitch.next(false);
    }
    isLoaderEnabled() {
        return this.loaderSwitch.asObservable();
    }
    getExperimentName() {
        return this.experimentName.asObservable();
    }
    getExperimentDescription() {
        return this.experimentDescription.asObservable();
    }
    getUserDetails() {
        return this.userDetails;
    }
    setUserDetails(user) {
        this.userDetails = user;
    }
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
    setExperimentName(data) {
        this.experimentName.next(data);
    }
    setExperimentDescription(data) {
        this.experimentDescription.next(data);
    }
};
StateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], StateService);



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