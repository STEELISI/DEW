(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["experiment-experiment-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/experiment/error/error.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/experiment/error/error.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Error</h1>");

/***/ }),

/***/ "./src/app/experiment/error/error.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/experiment/error/error.component.ts ***!
  \*****************************************************/
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
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./error.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/experiment/error/error.component.html")).default
    })
], PageNotFound);



/***/ }),

/***/ "./src/app/experiment/experiment-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/experiment/experiment-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ExperimentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperimentRoutingModule", function() { return ExperimentRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _experiment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./experiment.component */ "./src/app/experiment/experiment.component.ts");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error/error.component */ "./src/app/experiment/error/error.component.ts");





const routes = [{
        path: '',
        component: _experiment_component__WEBPACK_IMPORTED_MODULE_3__["ExperimentComponent"],
        children: [
            {
                path: 'e',
                loadChildren: () => Promise.all(/*! import() | hlbparser-hlpparser-module */[__webpack_require__.e("default~experiment-experiment-module~hlbparser-hlpparser-module"), __webpack_require__.e("default~hlbparser-hlpparser-module~pages-pages-module"), __webpack_require__.e("default~hlbparser-hlpparser-module~public-public-module")]).then(__webpack_require__.bind(null, /*! ./hlbparser/hlpparser.module */ "./src/app/experiment/hlbparser/hlpparser.module.ts"))
                    .then(m => m.HLBParserModule),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: _error_error_component__WEBPACK_IMPORTED_MODULE_4__["PageNotFound"],
            },
        ],
    }];
let ExperimentRoutingModule = class ExperimentRoutingModule {
};
ExperimentRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ExperimentRoutingModule);



/***/ }),

/***/ "./src/app/experiment/experiment.component.scss":
/*!******************************************************!*\
  !*** ./src/app/experiment/experiment.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".container {\n  margin: 0;\n}\n\n.loading {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n\n.loading-wheel {\n  width: 20px;\n  height: 20px;\n  margin-top: -40px;\n  margin-left: -40px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  border-width: 30px;\n  border-radius: 50%;\n  -webkit-animation: spin 1s linear infinite;\n}\n\n.style-2 .loading-wheel {\n  border-style: double;\n  border-color: #ccc transparent;\n}\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(-360deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvZXhwZXJpbWVudC9leHBlcmltZW50LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9leHBlcmltZW50L2V4cGVyaW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxTQUFBO0FDQ0o7O0FEQ0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtFQUNBLG9DQUFBO0FDRUo7O0FEQUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFFQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBRUEsa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0FDQ0o7O0FEQ0E7RUFDSSxvQkFBQTtFQUNBLDhCQUFBO0FDRUo7O0FEQUE7RUFDSTtJQUNJLDRCQUFBO0VDR047RURERTtJQUNJLGtDQUFBO0VDR047QUFDRiIsImZpbGUiOiJzcmMvYXBwL2V4cGVyaW1lbnQvZXhwZXJpbWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXJ7XG4gICAgbWFyZ2luOiAwO1xufVxuLmxvYWRpbmcge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHotaW5kZXg6IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwuNSk7XG59XG4ubG9hZGluZy13aGVlbCB7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIG1hcmdpbi10b3A6IC00MHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAtNDBweDtcbiAgICBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIFxuICAgIGJvcmRlci13aWR0aDogMzBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xufVxuLnN0eWxlLTIgLmxvYWRpbmctd2hlZWwge1xuICAgIGJvcmRlci1zdHlsZTogZG91YmxlO1xuICAgIGJvcmRlci1jb2xvcjogI2NjYyB0cmFuc3BhcmVudDtcbn1cbkAtd2Via2l0LWtleWZyYW1lcyBzcGluIHtcbiAgICAwJSB7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xuICAgIH1cbn0iLCIuY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4ubG9hZGluZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5sb2FkaW5nLXdoZWVsIHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgbWFyZ2luLXRvcDogLTQwcHg7XG4gIG1hcmdpbi1sZWZ0OiAtNDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICBib3JkZXItd2lkdGg6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgLXdlYmtpdC1hbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xufVxuXG4uc3R5bGUtMiAubG9hZGluZy13aGVlbCB7XG4gIGJvcmRlci1zdHlsZTogZG91YmxlO1xuICBib3JkZXItY29sb3I6ICNjY2MgdHJhbnNwYXJlbnQ7XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBzcGluIHtcbiAgMCUge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gIH1cbiAgMTAwJSB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcbiAgfVxufSJdfQ== */");

/***/ }),

/***/ "./src/app/experiment/experiment.component.ts":
/*!****************************************************!*\
  !*** ./src/app/experiment/experiment.component.ts ***!
  \****************************************************/
/*! exports provided: ExperimentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperimentComponent", function() { return ExperimentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state-service.service */ "./src/app/state-service.service.ts");



let ExperimentComponent = class ExperimentComponent {
    constructor(state) {
        this.state = state;
        this.alive = true;
        this.loaderSwitch = false;
    }
    ngOnInit() {
        this.state.isLoaderEnabled().subscribe(loader => {
            this.loaderSwitch = loader;
        });
    }
};
ExperimentComponent.ctorParameters = () => [
    { type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"] }
];
ExperimentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-experiment",
        template: `
  <fixed-layout>
  <router-outlet></router-outlet>
  
  </fixed-layout>
  <div *ngIf="loaderSwitch" class="loading style-2"><div class="loading-wheel"></div></div>
  `,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./experiment.component.scss */ "./src/app/experiment/experiment.component.scss")).default]
    })
], ExperimentComponent);



/***/ }),

/***/ "./src/app/experiment/experiment.module.ts":
/*!*************************************************!*\
  !*** ./src/app/experiment/experiment.module.ts ***!
  \*************************************************/
/*! exports provided: ExperimentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperimentModule", function() { return ExperimentModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _experiment_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./experiment-routing.module */ "./src/app/experiment/experiment-routing.module.ts");
/* harmony import */ var _experiment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./experiment.component */ "./src/app/experiment/experiment.component.ts");
/* harmony import */ var _hlbparser_hlpparser_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hlbparser/hlpparser.module */ "./src/app/experiment/hlbparser/hlpparser.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../@core/core.module */ "./src/app/@core/core.module.ts");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./error/error.component */ "./src/app/experiment/error/error.component.ts");









let ExperimentModule = class ExperimentModule {
};
ExperimentModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        exports: [_experiment_component__WEBPACK_IMPORTED_MODULE_3__["ExperimentComponent"]],
        declarations: [
            _experiment_component__WEBPACK_IMPORTED_MODULE_3__["ExperimentComponent"],
            _error_error_component__WEBPACK_IMPORTED_MODULE_8__["PageNotFound"]
        ],
        imports: [
            _experiment_routing_module__WEBPACK_IMPORTED_MODULE_2__["ExperimentRoutingModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
            _core_core_module__WEBPACK_IMPORTED_MODULE_7__["CoreModule"],
            ngx_quill__WEBPACK_IMPORTED_MODULE_6__["QuillModule"].forRoot(),
            _hlbparser_hlpparser_module__WEBPACK_IMPORTED_MODULE_4__["HLBParserModule"],
        ]
    })
], ExperimentModule);



/***/ })

}]);
//# sourceMappingURL=experiment-experiment-module-es2015.js.map