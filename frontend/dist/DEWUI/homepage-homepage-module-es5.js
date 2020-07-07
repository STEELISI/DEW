(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["homepage-homepage-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/dashboard/dashboard.component.html":
  /*!***************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/dashboard/dashboard.component.html ***!
    \***************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHomepageDashboardDashboardComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<mat-toolbar color=\"primary\">\n  <nav class=\"navbar navbar-expand-lg navbar-light\">\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n      <ul class=\"navbar-nav mr-auto\">\n        <li class=\"nav-item dropdown\">\n          List of Experiment\n        </li>\n      </ul>\n    </div>\n  </nav>\n</mat-toolbar>\n<div class=\"main\">\n  <experiment></experiment>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/dashboard/experiments/experiment.component.html":
  /*!****************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/dashboard/experiments/experiment.component.html ***!
    \****************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHomepageDashboardExperimentsExperimentComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<form *ngIf=\"show\" [formGroup]=\"filterSelect\">\n  <div class=\"row\" style=\"margin: 0.5em;\">\n    <div class=\"col-md-2\">\n      <div style=\"padding: 11px;\">\n        <button class=\"btn btn-light\" (click)=\"create()\">Create</button>\n      </div>\n      <div style=\"padding-bottom: 10px;\">\n        <input\n          class=\"form-control\"\n          formControlName=\"search\"\n          placeholder=\"Search by...\"\n          name=\"search\"\n        />\n      </div>\n      <mat-card>\n        <label>Filter Access Level by:</label>\n        <ul style=\"list-style: none; padding: 0;\">\n          <li>\n            <label style=\"padding: 0.2em;\"\n              ><input\n                formControlName=\"accessLevel\"\n                type=\"radio\"\n                name=\"accessLevel\"\n                [value]=\"0\"\n                [checked]=\"true\"\n              />\n              <span style=\"padding: 0.2em;\">Show All</span></label\n            >\n          </li>\n          <li>\n            <label style=\"padding: 0.2em;\"\n              ><input\n                formControlName=\"accessLevel\"\n                type=\"radio\"\n                name=\"accessLevel\"\n                [value]=\"4\"\n              /><span style=\"padding: 0.2em;\">Admin</span></label\n            >\n          </li>\n          <li>\n            <label style=\"padding: 0.2em;\"\n              ><input\n                formControlName=\"accessLevel\"\n                type=\"radio\"\n                name=\"accessLevel\"\n                [value]=\"3\"\n              /><span style=\"padding: 0.2em;\">Developer</span></label\n            >\n          </li>\n          <li>\n            <label style=\"padding: 0.2em;\"\n              ><input\n                formControlName=\"accessLevel\"\n                type=\"radio\"\n                name=\"accessLevel\"\n                [value]=\"2\"\n              /><span style=\"padding: 0.2em;\">Spectalor</span></label\n            >\n          </li>\n        </ul>\n      </mat-card>\n    </div>\n    <div class=\"col-md-10\">\n      <div class=\"row table\" *ngIf=\"experiments.length != 0\">\n        <div class=\"col-md-12\">\n          <div\n            class=\"row table-row pointer\"\n            (click)=\"edit(item)\"\n            style=\"margin-top: 14px;\"\n            matTooltip=\"Edit {{ item.name }}\"\n            *ngFor=\"let item of filterExperiments | async; let i = index\"\n          >\n            <div class=\"col-md-12\">\n              <div class=\"header-experiment\">{{ item.name }}</div>\n              <span class=\"bubble\">\n                <strong\n                  matTooltip=\"{{\n                    item.accessLevel == 4\n                      ? 'Full Access'\n                      : item.accessLevel == 3\n                      ? 'Write only'\n                      : 'Read only'\n                  }}\"\n                  >{{\n                    item.accessLevel == 4\n                      ? \"Admin\"\n                      : item.accessLevel == 3\n                      ? \"Developer\"\n                      : \"Spectator\"\n                  }}</strong\n                >\n              </span>\n              <br />\n              <span><b>Created Date:</b> {{ item.created_date }}</span> |\n              <span><b>Updated Date:</b> {{ item.updated_date }}</span>\n            </div>\n            <hr />\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/error/error.component.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/error/error.component.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHomepageErrorErrorComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<h1 style=\"margin-top:10%\">Error 404</h1>";
    /***/
  },

  /***/
  "./src/app/homepage/dashboard/dashboard-routing.module.ts":
  /*!****************************************************************!*\
    !*** ./src/app/homepage/dashboard/dashboard-routing.module.ts ***!
    \****************************************************************/

  /*! exports provided: DashboardRoutingModule */

  /***/
  function srcAppHomepageDashboardDashboardRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function () {
      return DashboardRoutingModule;
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


    var _dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./dashboard.component */
    "./src/app/homepage/dashboard/dashboard.component.ts");

    const routes = [{
      path: "",
      // canActivateChild: [AuthGuard],
      component: _dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"]
    }];
    let DashboardRoutingModule = class DashboardRoutingModule {};
    DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })], DashboardRoutingModule);
    /***/
  },

  /***/
  "./src/app/homepage/dashboard/dashboard.component.scss":
  /*!*************************************************************!*\
    !*** ./src/app/homepage/dashboard/dashboard.component.scss ***!
    \*************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppHomepageDashboardDashboardComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".tab {\n  overflow: hidden;\n}\n\nmat-toolbar {\n  --default-height: 46px;\n  z-index: 50;\n}\n\nmat-toolbar[color=primary] {\n  position: fixed;\n  height: 45px;\n  color: black;\n  font-size: 14px;\n  background-color: #eee;\n  top: var(--default-height);\n}\n\n.main {\n  padding-left: 16px;\n  margin-top: 90px;\n  font-size: 12px;\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JhbWt1bWFyL2Rldy9ERVcvZnJvbnRlbmQvc3JjL2FwcC9ob21lcGFnZS9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ob21lcGFnZS9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVFO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0VBQ0EsMEJBQUE7QUNDSjs7QURFRTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2hvbWVwYWdlL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFie1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbm1hdC10b29sYmFyIHtcbiAgICAtLWRlZmF1bHQtaGVpZ2h0OiA0NnB4O1xuICAgIHotaW5kZXg6IDUwO1xuICB9XG5cbiAgbWF0LXRvb2xiYXJbY29sb3I9XCJwcmltYXJ5XCJdIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7IFxuICAgIGhlaWdodDogNDVweDtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgdG9wOnZhcigtLWRlZmF1bHQtaGVpZ2h0KTtcbiAgfVxuXG4gIC5tYWluIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7XG4gICAgbWFyZ2luLXRvcDogOTBweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgfSIsIi50YWIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5tYXQtdG9vbGJhciB7XG4gIC0tZGVmYXVsdC1oZWlnaHQ6IDQ2cHg7XG4gIHotaW5kZXg6IDUwO1xufVxuXG5tYXQtdG9vbGJhcltjb2xvcj1wcmltYXJ5XSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaGVpZ2h0OiA0NXB4O1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgdG9wOiB2YXIoLS1kZWZhdWx0LWhlaWdodCk7XG59XG5cbi5tYWluIHtcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xuICBtYXJnaW4tdG9wOiA5MHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/homepage/dashboard/dashboard.component.ts":
  /*!***********************************************************!*\
    !*** ./src/app/homepage/dashboard/dashboard.component.ts ***!
    \***********************************************************/

  /*! exports provided: DashboardComponent */

  /***/
  function srcAppHomepageDashboardDashboardComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardComponent", function () {
      return DashboardComponent;
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


    var _state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../state-service.service */
    "./src/app/state-service.service.ts");

    let DashboardComponent = class DashboardComponent {
      constructor(state) {
        this.state = state;
        this.menuList = [{
          name: "List of Experiment",
          id: 1
        }];
      }

      ngOnInit() {
        this.userDetails = this.state.getUserDetails() == null ? {} : this.state.getUserDetails();
      }

    };

    DashboardComponent.ctorParameters = () => [{
      type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"]
    }];

    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'dashboard',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./dashboard.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/dashboard/dashboard.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./dashboard.component.scss */
      "./src/app/homepage/dashboard/dashboard.component.scss")).default]
    })], DashboardComponent);
    /***/
  },

  /***/
  "./src/app/homepage/dashboard/dashboard.module.ts":
  /*!********************************************************!*\
    !*** ./src/app/homepage/dashboard/dashboard.module.ts ***!
    \********************************************************/

  /*! exports provided: DashboardModule */

  /***/
  function srcAppHomepageDashboardDashboardModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardModule", function () {
      return DashboardModule;
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


    var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @fortawesome/angular-fontawesome */
    "./node_modules/@fortawesome/angular-fontawesome/fesm2015/angular-fontawesome.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/material/radio */
    "./node_modules/@angular/material/esm2015/radio.js");
    /* harmony import */


    var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ./dashboard-routing.module */
    "./src/app/homepage/dashboard/dashboard-routing.module.ts");
    /* harmony import */


    var _dashboard_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./dashboard.component */
    "./src/app/homepage/dashboard/dashboard.component.ts");
    /* harmony import */


    var _state_service_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ../../state-service.service */
    "./src/app/state-service.service.ts");
    /* harmony import */


    var _experiments_experiment_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./experiments/experiment.component */
    "./src/app/homepage/dashboard/experiments/experiment.component.ts");

    let DashboardModule = class DashboardModule {};
    DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      exports: [_dashboard_component__WEBPACK_IMPORTED_MODULE_14__["DashboardComponent"]],
      declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_14__["DashboardComponent"], _experiments_experiment_component__WEBPACK_IMPORTED_MODULE_16__["ExperimentComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__["MatRadioModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSnackBarModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatTooltipModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__["DragDropModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSelectModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"], _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_13__["DashboardRoutingModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"]],
      providers: [_state_service_service__WEBPACK_IMPORTED_MODULE_15__["StateService"]],
      bootstrap: [_dashboard_component__WEBPACK_IMPORTED_MODULE_14__["DashboardComponent"]]
    })], DashboardModule);
    /***/
  },

  /***/
  "./src/app/homepage/dashboard/experiments/experiment.component.scss":
  /*!**************************************************************************!*\
    !*** ./src/app/homepage/dashboard/experiments/experiment.component.scss ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppHomepageDashboardExperimentsExperimentComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".tab {\n  overflow: hidden;\n}\n\n.pointer {\n  margin: 0.2em;\n  cursor: pointer;\n}\n\n.action_menu ul {\n  list-style-type: none;\n  padding-left: 2rem;\n  margin: 0;\n  border-bottom: 1px solid #ccc;\n  overflow: hidden;\n}\n\n.action_menu ul li {\n  float: left;\n}\n\nbutton {\n  width: 100%;\n}\n\n.action_menu ul li i {\n  display: block;\n  color: #eee;\n  text-align: center;\n  padding: 0.31rem;\n  text-decoration: none;\n}\n\n.action_menu ul li i:hover {\n  background-color: #ccc;\n}\n\n.table-row {\n  padding: 0.2em;\n  background-color: #f8f9fa;\n  border-radius: 10px;\n  box-shadow: 3px 0px 0px 2px #f8f9fa;\n}\n\n.bubble {\n  float: right;\n  margin: 1em;\n  border: 1px solid #2196F3;\n  padding: 0.6em;\n  border-radius: 14px;\n  width: 77px;\n  text-align: center;\n}\n\n.header-experiment {\n  font-size: large;\n  font-weight: bold;\n  padding-top: 0.3em;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JhbWt1bWFyL2Rldy9ERVcvZnJvbnRlbmQvc3JjL2FwcC9ob21lcGFnZS9kYXNoYm9hcmQvZXhwZXJpbWVudHMvZXhwZXJpbWVudC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZXBhZ2UvZGFzaGJvYXJkL2V4cGVyaW1lbnRzL2V4cGVyaW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtBQ0NKOztBRENBO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUNFSjs7QURDQTtFQUNJLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQkFBQTtBQ0VKOztBREFFO0VBQ0ksV0FBQTtBQ0dOOztBRERDO0VBQ0csV0FBQTtBQ0lKOztBRERFO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUNJTjs7QURERTtFQUNJLHNCQUFBO0FDSU47O0FEREk7RUFDSSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1DQUFBO0FDSVI7O0FEREk7RUFDSSxZQUFBO0VBQ0osV0FBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FDSUo7O0FEREk7RUFDSSxnQkFBQTtFQUNKLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUNJSiIsImZpbGUiOiJzcmMvYXBwL2hvbWVwYWdlL2Rhc2hib2FyZC9leHBlcmltZW50cy9leHBlcmltZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYntcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLnBvaW50ZXJ7XG4gICAgbWFyZ2luOiAuMmVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFjdGlvbl9tZW51IHVse1xuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDJyZW07XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbiAgLmFjdGlvbl9tZW51IHVsIGxpe1xuICAgICAgZmxvYXQ6IGxlZnQ7XG4gIH1cbiBidXR0b257XG4gICAgd2lkdGg6IDEwMCU7XG4gfVxuICBcbiAgLmFjdGlvbl9tZW51IHVsIGxpIGkge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBjb2xvcjogI2VlZTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IC4zMXJlbTtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICB9XG4gICAgXG4gIC5hY3Rpb25fbWVudSB1bCBsaSBpOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG4gICAgfVxuXG4gICAgLnRhYmxlLXJvdyB7XG4gICAgICAgIHBhZGRpbmc6IDAuMmVtO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICBib3gtc2hhZG93OiAzcHggMHB4IDBweCAycHggI2Y4ZjlmYTtcbiAgICBcbiAgICB9XG4gICAgLmJ1YmJsZXtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbjogMWVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICMyMTk2RjM7XG4gICAgcGFkZGluZzogLjZlbTtcbiAgICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICAgIHdpZHRoOiA3N3B4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gIFxuICAgIC5oZWFkZXItZXhwZXJpbWVudHtcbiAgICAgICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBwYWRkaW5nLXRvcDogLjNlbTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgfVxuICAgIiwiLnRhYiB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5wb2ludGVyIHtcbiAgbWFyZ2luOiAwLjJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWN0aW9uX21lbnUgdWwge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIHBhZGRpbmctbGVmdDogMnJlbTtcbiAgbWFyZ2luOiAwO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmFjdGlvbl9tZW51IHVsIGxpIHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbmJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYWN0aW9uX21lbnUgdWwgbGkgaSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogI2VlZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAwLjMxcmVtO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5hY3Rpb25fbWVudSB1bCBsaSBpOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbn1cblxuLnRhYmxlLXJvdyB7XG4gIHBhZGRpbmc6IDAuMmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3gtc2hhZG93OiAzcHggMHB4IDBweCAycHggI2Y4ZjlmYTtcbn1cblxuLmJ1YmJsZSB7XG4gIGZsb2F0OiByaWdodDtcbiAgbWFyZ2luOiAxZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyMTk2RjM7XG4gIHBhZGRpbmc6IDAuNmVtO1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICB3aWR0aDogNzdweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaGVhZGVyLWV4cGVyaW1lbnQge1xuICBmb250LXNpemU6IGxhcmdlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgcGFkZGluZy10b3A6IDAuM2VtO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/homepage/dashboard/experiments/experiment.component.ts":
  /*!************************************************************************!*\
    !*** ./src/app/homepage/dashboard/experiments/experiment.component.ts ***!
    \************************************************************************/

  /*! exports provided: ExperimentComponent */

  /***/
  function srcAppHomepageDashboardExperimentsExperimentComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ExperimentComponent", function () {
      return ExperimentComponent;
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


    var src_app_auth_init_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/@auth/init-user.service */
    "./src/app/@auth/init-user.service.ts");
    /* harmony import */


    var src_app_http_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/http-service.service */
    "./src/app/http-service.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");

    let ExperimentComponent = class ExperimentComponent {
      constructor(router, http, initUser) {
        this.router = router;
        this.http = http;
        this.initUser = initUser;
        this.show = false;
        this.filterSelect = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({
          accessLevel: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
          search: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('')
        });
        this.filteredLevels = [{
          name: 'Read',
          value: '2'
        }, {
          name: 'Write',
          value: '3'
        }, {
          name: 'Manage',
          value: '4'
        }];
        this.experiments = [];
        this.filterExperiments = [];
      }

      ngOnInit() {
        this.initUser.getUser().subscribe(user => {
          // console.log(user)
          if (user != null) {
            this.userInfo = user;
            this.load(user.userId);
            this.enableComponent();
          }
        });
        this.filterExperiments = this.filterSelect.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["startWith"])(""), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(value => this._filter(value, this.experiments)));
      }

      _filter(value, options) {
        console.log(value);
        if (value == 0) return options;else if (value.accessLevel == '') return options.filter(option => option.name.toLowerCase().includes(value.search.toLowerCase()) || option.description.toLowerCase().includes(value.search.toLowerCase()));else return options.filter(option => option.accessLevel >= value.accessLevel).filter(option => option.name.toLowerCase().includes(value.search.toLowerCase()) || option.description.toLowerCase().includes(value.search.toLowerCase()));
      }

      enableComponent() {
        this.show = true;
      }

      load(userId) {
        this.http.get("v1/pr/persist/getExperimentList", {
          withCredentials: true
        }).subscribe(data => {
          this.experiments = data;
        });
      }

      edit(experiments) {
        console.log(experiments);
        this.router.navigate(["p/e/c", experiments.experiment_id]);
      }

      create() {
        this.router.navigate(["p/e/c"]);
      }

      copy(item) {
        var params = {
          "id": item.experiment_id + ""
        };
        this.http.post("api/v1/pr/persist/experiment/copy", params, {
          withCredentials: true
        }).subscribe(data => {
          this.edit(data);
        });
      }

    };

    ExperimentComponent.ctorParameters = () => [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
    }, {
      type: src_app_http_service_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"]
    }, {
      type: src_app_auth_init_user_service__WEBPACK_IMPORTED_MODULE_3__["InitUserService"]
    }];

    ExperimentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'experiment',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./experiment.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/dashboard/experiments/experiment.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./experiment.component.scss */
      "./src/app/homepage/dashboard/experiments/experiment.component.scss")).default]
    })], ExperimentComponent);
    /***/
  },

  /***/
  "./src/app/homepage/error/error.component.ts":
  /*!***************************************************!*\
    !*** ./src/app/homepage/error/error.component.ts ***!
    \***************************************************/

  /*! exports provided: PageNotFound */

  /***/
  function srcAppHomepageErrorErrorComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PageNotFound", function () {
      return PageNotFound;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    let PageNotFound = class PageNotFound {};
    PageNotFound = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'error',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./error.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/homepage/error/error.component.html")).default
    })], PageNotFound);
    /***/
  },

  /***/
  "./src/app/homepage/homepage-routing.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/homepage/homepage-routing.module.ts ***!
    \*****************************************************/

  /*! exports provided: HomePageRoutingModule */

  /***/
  function srcAppHomepageHomepageRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function () {
      return HomePageRoutingModule;
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


    var _error_error_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./error/error.component */
    "./src/app/homepage/error/error.component.ts");
    /* harmony import */


    var _homepage_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./homepage.component */
    "./src/app/homepage/homepage.component.ts");

    const routes = [{
      path: '',
      component: _homepage_component__WEBPACK_IMPORTED_MODULE_4__["HomePageComponent"],
      children: [{
        path: '',
        loadChildren: () => Promise.resolve().then(__webpack_require__.bind(null,
        /*! ./dashboard/dashboard.module */
        "./src/app/homepage/dashboard/dashboard.module.ts")).then(m => m.DashboardModule)
      }, {
        path: '**',
        component: _error_error_component__WEBPACK_IMPORTED_MODULE_3__["PageNotFound"]
      }]
    }];
    let HomePageRoutingModule = class HomePageRoutingModule {};
    HomePageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], HomePageRoutingModule);
    /***/
  },

  /***/
  "./src/app/homepage/homepage.component.scss":
  /*!**************************************************!*\
    !*** ./src/app/homepage/homepage.component.scss ***!
    \**************************************************/

  /*! exports provided: default */

  /***/
  function srcAppHomepageHomepageComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".container {\n  margin: 0;\n}\n\n.loading {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n\n.loading-wheel {\n  width: 20px;\n  height: 20px;\n  margin-top: -40px;\n  margin-left: -40px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  border-width: 30px;\n  border-radius: 50%;\n  -webkit-animation: spin 1s linear infinite;\n}\n\n.style-2 .loading-wheel {\n  border-style: double;\n  border-color: #ccc transparent;\n}\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(-360deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3JhbWt1bWFyL2Rldy9ERVcvZnJvbnRlbmQvc3JjL2FwcC9ob21lcGFnZS9ob21lcGFnZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZXBhZ2UvaG9tZXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxTQUFBO0FDQ0o7O0FEQ0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtFQUNBLG9DQUFBO0FDRUo7O0FEQUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFFQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBRUEsa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0FDQ0o7O0FEQ0E7RUFDSSxvQkFBQTtFQUNBLDhCQUFBO0FDRUo7O0FEQUE7RUFDSTtJQUNJLDRCQUFBO0VDR047RURERTtJQUNJLGtDQUFBO0VDR047QUFDRiIsImZpbGUiOiJzcmMvYXBwL2hvbWVwYWdlL2hvbWVwYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lcntcbiAgICBtYXJnaW46IDA7XG59XG4ubG9hZGluZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgei1pbmRleDogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLC41KTtcbn1cbi5sb2FkaW5nLXdoZWVsIHtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgbWFyZ2luLXRvcDogLTQwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC00MHB4O1xuICAgIFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgXG4gICAgYm9yZGVyLXdpZHRoOiAzMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7XG59XG4uc3R5bGUtMiAubG9hZGluZy13aGVlbCB7XG4gICAgYm9yZGVyLXN0eWxlOiBkb3VibGU7XG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjIHRyYW5zcGFyZW50O1xufVxuQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4ge1xuICAgIDAlIHtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XG4gICAgfVxufSIsIi5jb250YWluZXIge1xuICBtYXJnaW46IDA7XG59XG5cbi5sb2FkaW5nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDE7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cblxuLmxvYWRpbmctd2hlZWwge1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBtYXJnaW4tdG9wOiAtNDBweDtcbiAgbWFyZ2luLWxlZnQ6IC00MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIGJvcmRlci13aWR0aDogMzBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbi5zdHlsZS0yIC5sb2FkaW5nLXdoZWVsIHtcbiAgYm9yZGVyLXN0eWxlOiBkb3VibGU7XG4gIGJvcmRlci1jb2xvcjogI2NjYyB0cmFuc3BhcmVudDtcbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4ge1xuICAwJSB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwKTtcbiAgfVxuICAxMDAlIHtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xuICB9XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/homepage/homepage.component.ts":
  /*!************************************************!*\
    !*** ./src/app/homepage/homepage.component.ts ***!
    \************************************************/

  /*! exports provided: HomePageComponent */

  /***/
  function srcAppHomepageHomepageComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageComponent", function () {
      return HomePageComponent;
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


    var _state_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../state-service.service */
    "./src/app/state-service.service.ts");

    let HomePageComponent = class HomePageComponent {
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

    HomePageComponent.ctorParameters = () => [{
      type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"]
    }];

    HomePageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-home-page",
      template: "\n  <fixed-layout>\n  <router-outlet></router-outlet>\n  \n  </fixed-layout>\n  <div *ngIf=\"loaderSwitch\" class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>\n  ",
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./homepage.component.scss */
      "./src/app/homepage/homepage.component.scss")).default]
    })], HomePageComponent);
    /***/
  },

  /***/
  "./src/app/homepage/homepage.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/homepage/homepage.module.ts ***!
    \*********************************************/

  /*! exports provided: HomePageModule */

  /***/
  function srcAppHomepageHomepageModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageModule", function () {
      return HomePageModule;
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


    var _homepage_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./homepage-routing.module */
    "./src/app/homepage/homepage-routing.module.ts");
    /* harmony import */


    var _homepage_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./homepage.component */
    "./src/app/homepage/homepage.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _core_core_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../@core/core.module */
    "./src/app/@core/core.module.ts");
    /* harmony import */


    var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./dashboard/dashboard.module */
    "./src/app/homepage/dashboard/dashboard.module.ts");
    /* harmony import */


    var _error_error_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./error/error.component */
    "./src/app/homepage/error/error.component.ts");

    let HomePageModule = class HomePageModule {};
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      exports: [_homepage_component__WEBPACK_IMPORTED_MODULE_3__["HomePageComponent"]],
      declarations: [_homepage_component__WEBPACK_IMPORTED_MODULE_3__["HomePageComponent"], _error_error_component__WEBPACK_IMPORTED_MODULE_7__["PageNotFound"]],
      imports: [_homepage_routing_module__WEBPACK_IMPORTED_MODULE_2__["HomePageRoutingModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _core_core_module__WEBPACK_IMPORTED_MODULE_5__["CoreModule"], _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_6__["DashboardModule"]]
    })], HomePageModule);
    /***/
  }
}]);
//# sourceMappingURL=homepage-homepage-module-es5.js.map