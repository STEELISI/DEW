(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["public-public-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/public/error/error.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/public/error/error.component.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1> Public Error</h1>");

/***/ }),

/***/ "./src/app/public/error/error.component.ts":
/*!*************************************************!*\
  !*** ./src/app/public/error/error.component.ts ***!
  \*************************************************/
/*! exports provided: PageNotFound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFound", function() { return PageNotFound; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PageNotFound = class PageNotFound {
};
PageNotFound = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'error',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./error.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/public/error/error.component.html")).default
    })
], PageNotFound);



/***/ }),

/***/ "./src/app/public/public-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/public/public-routing.module.ts ***!
  \*************************************************/
/*! exports provided: PublicRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicRoutingModule", function() { return PublicRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _public_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./public.component */ "./src/app/public/public.component.ts");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error/error.component */ "./src/app/public/error/error.component.ts");





const routes = [{
        path: '',
        component: _public_component__WEBPACK_IMPORTED_MODULE_3__["PublicComponent"],
        children: [
            {
                path: 'hlb',
                loadChildren: () => Promise.all(/*! import() | hlbparser-hlpparser-module */[__webpack_require__.e("default~experiment-experiment-module~hlbparser-hlpparser-module"), __webpack_require__.e("default~hlbparser-hlpparser-module~pages-pages-module"), __webpack_require__.e("default~hlbparser-hlpparser-module~public-public-module")]).then(__webpack_require__.bind(null, /*! ./hlbparser/hlpparser.module */ "./src/app/public/hlbparser/hlpparser.module.ts"))
                    .then(m => m.PublicHLBParserModule),
            },
            {
                path: '**',
                component: _error_error_component__WEBPACK_IMPORTED_MODULE_4__["PageNotFound"],
            },
        ],
    }];
let PublicRoutingModule = class PublicRoutingModule {
};
PublicRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PublicRoutingModule);



/***/ }),

/***/ "./src/app/public/public.component.scss":
/*!**********************************************!*\
  !*** ./src/app/public/public.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".container {\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcHVibGljL3B1YmxpYy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcHVibGljL3B1YmxpYy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFNBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3B1YmxpYy9wdWJsaWMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVye1xuICAgIG1hcmdpbjogMDtcbn0iLCIuY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/public/public.component.ts":
/*!********************************************!*\
  !*** ./src/app/public/public.component.ts ***!
  \********************************************/
/*! exports provided: PublicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicComponent", function() { return PublicComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PublicComponent = class PublicComponent {
    constructor() {
        this.alive = true;
    }
};
PublicComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-public",
        template: `
 <layout>
  <router-outlet></router-outlet>
  </layout>
 
  `,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./public.component.scss */ "./src/app/public/public.component.scss")).default]
    })
], PublicComponent);



/***/ }),

/***/ "./src/app/public/public.module.ts":
/*!*****************************************!*\
  !*** ./src/app/public/public.module.ts ***!
  \*****************************************/
/*! exports provided: PublicModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicModule", function() { return PublicModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _public_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./public-routing.module */ "./src/app/public/public-routing.module.ts");
/* harmony import */ var _public_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./public.component */ "./src/app/public/public.component.ts");
/* harmony import */ var _hlbparser_hlpparser_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hlbparser/hlpparser.module */ "./src/app/public/hlbparser/hlpparser.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../@core/core.module */ "./src/app/@core/core.module.ts");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./error/error.component */ "./src/app/public/error/error.component.ts");









let PublicModule = class PublicModule {
};
PublicModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        exports: [_public_component__WEBPACK_IMPORTED_MODULE_3__["PublicComponent"]],
        declarations: [
            _public_component__WEBPACK_IMPORTED_MODULE_3__["PublicComponent"],
            _error_error_component__WEBPACK_IMPORTED_MODULE_8__["PageNotFound"]
        ],
        imports: [
            _public_routing_module__WEBPACK_IMPORTED_MODULE_2__["PublicRoutingModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
            _core_core_module__WEBPACK_IMPORTED_MODULE_7__["CoreModule"],
            _hlbparser_hlpparser_module__WEBPACK_IMPORTED_MODULE_4__["PublicHLBParserModule"],
            ngx_quill__WEBPACK_IMPORTED_MODULE_6__["QuillModule"].forRoot(),
        ]
    })
], PublicModule);



/***/ })

}]);
//# sourceMappingURL=public-public-module-es2015.js.map