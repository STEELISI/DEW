(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-pages-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesDashboardDashboardComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n  <mat-tab-group>\n    <mat-tab *ngFor=\"let x of menuList\" label=\"{{ x.name }}\">\n      <div *ngIf=\"x.id == 1\" class=\"tab\">\n        <experiment></experiment>\n        </div>\n    </mat-tab>\n  </mat-tab-group> \n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/experiments/experiment.component.html":
  /*!*************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/experiments/experiment.component.html ***!
    \*************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesDashboardExperimentsExperimentComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<form class=\"row\" *ngIf=\"show\" [formGroup]=\"filterSelect\" >\n  <div class=\"row\" style=\"margin: 2em;\">\n    <div class=\"col-md-12\">\n      <mat-card>\n        <div>\n          <label style=\"float: left; padding: 3px;\">Filter Access Level by:</label>\n          <select\n            class=\"form-control\"\n            formControlName=\"select\"\n            style=\"width: 150px; float: left; height: 25px;\"\n      \n          >\n            <option value=\"\" selected>Show All</option>\n            <option value=\"4\">Admin</option>\n            <option value=\"3\">Developer</option>\n            <option value=\"2\">Spectator</option>\n          </select>\n        </div>\n        <div style=\"float:right;width: 250px;height: 25px;\">\n        \n          \n            <input\n            class=\"form-control\"\n            style=\"height: 25px;\"\n            formControlName=\"search\"\n              placeholder=\"Search by...\"\n              name=\"search\"\n              \n            />\n          \n           \n          \n        </div>\n        <table class=\"table\">\n          <thead>\n            <tr>\n              <th style=\"min-width: 80px;\">Exp. Id</th>\n              <th style=\"min-width: 150px;\">Experiment Name</th>\n              <th style=\"min-width: 150px;\">Experiment Description</th>\n              <th style=\"min-width: 150px;\">Last Created Date</th>\n              <th style=\"min-width: 150px;\">Last Updated Date</th>\n              <th style=\"min-width: 150px;\">Access Level</th>\n              <th>\n                <button\n                  mat-button\n                  matTooltip=\"Create a new experiment.\"\n                  style=\"margin: 0; width: 20px; height: 20px; line-height: 0;\"\n                >\n                  <i (click)=\"create()\" class=\"fas fa-plus\"></i>\n                </button>\n              </th>\n            </tr>\n          </thead>\n          <tbody *ngIf=\"experiments.length != 0\">\n            <tr *ngFor=\"let item of filterExperiments | async; let i = index\">\n              <td>{{ item.experiment_id }}</td>\n              <td>\n                <strong>{{ item.name }}</strong>\n              </td>\n              <td>\n                <strong>{{ item.description }}</strong>\n              </td>\n              <td>\n                <strong>{{ item.created_date }}</strong>\n              </td>\n              <td>\n                <strong>{{ item.updated_date }}</strong>\n              </td>\n              <td>\n                <strong\n                  matTooltip=\"{{\n                    item.accessLevel == 4\n                      ? 'Full Access'\n                      : item.accessLevel == 3\n                      ? 'Write only'\n                      : 'Read only'\n                  }}\"\n                  >{{\n                    item.accessLevel == 4\n                      ? \"Admin\"\n                      : item.accessLevel == 3\n                      ? \"Developer\"\n                      : \"Spectator\"\n                  }}</strong\n                >\n              </td>\n              <td>\n                <i\n                  class=\"fas fa-copy pointer\"\n                  (click)=\"copy(item)\"\n                  matTooltip=\"Copy experiment.\"\n                ></i>\n                <i\n                  class=\"fas fa-edit pointer\"\n                  (click)=\"edit(item)\"\n                  matTooltip=\"Edit experiment.\"\n                ></i>\n                <!-- <i class=\"far fa-trash-alt pointer\" (click)=\"delete(item)\"></i>-->\n              </td>\n            </tr>\n          </tbody>\n          <tbody class=\"upload-name\" *ngIf=\"experiments.length == 0\">\n            <tr>\n              <td colspan=\"3\">\n                <span><i>No saved experiments.</i> </span>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </mat-card>\n    </div>\n  </div>\n</form>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/error/error.component.html":
  /*!****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/error/error.component.html ***!
    \****************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesErrorErrorComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<h1>Error</h1>";
    /***/
  },

  /***/
  "./src/app/pages/dashboard/dashboard-routing.module.ts":
  /*!*************************************************************!*\
    !*** ./src/app/pages/dashboard/dashboard-routing.module.ts ***!
    \*************************************************************/

  /*! exports provided: DashboardRoutingModule */

  /***/
  function srcAppPagesDashboardDashboardRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
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
    "./src/app/pages/dashboard/dashboard.component.ts");

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
  "./src/app/pages/dashboard/dashboard.component.scss":
  /*!**********************************************************!*\
    !*** ./src/app/pages/dashboard/dashboard.component.scss ***!
    \**********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesDashboardDashboardComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".tab {\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYntcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufSIsIi50YWIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/pages/dashboard/dashboard.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
    \********************************************************/

  /*! exports provided: DashboardComponent */

  /***/
  function srcAppPagesDashboardDashboardComponentTs(module, __webpack_exports__, __webpack_require__) {
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
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/dashboard.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./dashboard.component.scss */
      "./src/app/pages/dashboard/dashboard.component.scss")).default]
    })], DashboardComponent);
    /***/
  },

  /***/
  "./src/app/pages/dashboard/dashboard.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/pages/dashboard/dashboard.module.ts ***!
    \*****************************************************/

  /*! exports provided: DashboardModule */

  /***/
  function srcAppPagesDashboardDashboardModuleTs(module, __webpack_exports__, __webpack_require__) {
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
    "./src/app/pages/dashboard/dashboard-routing.module.ts");
    /* harmony import */


    var _dashboard_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./dashboard.component */
    "./src/app/pages/dashboard/dashboard.component.ts");
    /* harmony import */


    var _state_service_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ../../state-service.service */
    "./src/app/state-service.service.ts");
    /* harmony import */


    var _experiments_experiment_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./experiments/experiment.component */
    "./src/app/pages/dashboard/experiments/experiment.component.ts");

    let DashboardModule = class DashboardModule {};
    DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      exports: [_dashboard_component__WEBPACK_IMPORTED_MODULE_14__["DashboardComponent"]],
      declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_14__["DashboardComponent"], _experiments_experiment_component__WEBPACK_IMPORTED_MODULE_16__["ExperimentComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__["MatRadioModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSnackBarModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatTooltipModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_7__["DragDropModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSelectModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"], _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_13__["DashboardRoutingModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"]],
      providers: [_state_service_service__WEBPACK_IMPORTED_MODULE_15__["StateService"]],
      bootstrap: [_dashboard_component__WEBPACK_IMPORTED_MODULE_14__["DashboardComponent"]]
    })], DashboardModule);
    /***/
  },

  /***/
  "./src/app/pages/dashboard/experiments/experiment.component.scss":
  /*!***********************************************************************!*\
    !*** ./src/app/pages/dashboard/experiments/experiment.component.scss ***!
    \***********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesDashboardExperimentsExperimentComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".tab {\n  overflow: hidden;\n}\n\n.pointer {\n  margin: 0.2em;\n  cursor: pointer;\n}\n\n.action_menu ul {\n  list-style-type: none;\n  padding-left: 2rem;\n  margin: 0;\n  border-bottom: 1px solid #ccc;\n  overflow: hidden;\n}\n\n.action_menu ul li {\n  float: left;\n}\n\n.action_menu ul li i {\n  display: block;\n  color: black;\n  text-align: center;\n  padding: 0.31rem;\n  text-decoration: none;\n}\n\n.action_menu ul li i:hover {\n  background-color: #ccc;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2V4cGVyaW1lbnRzL2V4cGVyaW1lbnQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Rhc2hib2FyZC9leHBlcmltZW50cy9leHBlcmltZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7QUNDSjs7QURDQTtFQUNJLGFBQUE7RUFDQSxlQUFBO0FDRUo7O0FEQ0E7RUFDSSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7QUNFSjs7QURBRTtFQUNJLFdBQUE7QUNHTjs7QURBRTtFQUNJLGNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FDR047O0FEQUU7RUFDSSxzQkFBQTtBQ0dOIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2V4cGVyaW1lbnRzL2V4cGVyaW1lbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFie1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG4ucG9pbnRlcntcbiAgICBtYXJnaW46IC4yZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYWN0aW9uX21lbnUgdWx7XG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIHBhZGRpbmctbGVmdDogMnJlbTtcbiAgICBtYXJnaW46IDA7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuICAuYWN0aW9uX21lbnUgdWwgbGl7XG4gICAgICBmbG9hdDogbGVmdDtcbiAgfVxuICBcbiAgLmFjdGlvbl9tZW51IHVsIGxpIGkge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBjb2xvcjogYmxhY2s7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAuMzFyZW07XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgfVxuICAgIFxuICAuYWN0aW9uX21lbnUgdWwgbGkgaTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICAgIH1cbiAgXG4gICAiLCIudGFiIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnBvaW50ZXIge1xuICBtYXJnaW46IDAuMmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5hY3Rpb25fbWVudSB1bCB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgcGFkZGluZy1sZWZ0OiAycmVtO1xuICBtYXJnaW46IDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uYWN0aW9uX21lbnUgdWwgbGkge1xuICBmbG9hdDogbGVmdDtcbn1cblxuLmFjdGlvbl9tZW51IHVsIGxpIGkge1xuICBkaXNwbGF5OiBibG9jaztcbiAgY29sb3I6IGJsYWNrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAuMzFyZW07XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuLmFjdGlvbl9tZW51IHVsIGxpIGk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/pages/dashboard/experiments/experiment.component.ts":
  /*!*********************************************************************!*\
    !*** ./src/app/pages/dashboard/experiments/experiment.component.ts ***!
    \*********************************************************************/

  /*! exports provided: ExperimentComponent */

  /***/
  function srcAppPagesDashboardExperimentsExperimentComponentTs(module, __webpack_exports__, __webpack_require__) {
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
          select: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
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
        if (value == '') return options;else if (value.select == '') return options.filter(option => option.name.toLowerCase().includes(value.search.toLowerCase()) || option.description.toLowerCase().includes(value.search.toLowerCase()));else return options.filter(option => option.accessLevel == value.select).filter(option => option.name.toLowerCase().includes(value.search.toLowerCase()) || option.description.toLowerCase().includes(value.search.toLowerCase()));
      }

      enableComponent() {
        this.show = true;
      }

      load(userId) {
        this.http.get("v1/persist/getExperimentList/" + userId).subscribe(data => {
          this.experiments = data;
        });
      }

      edit(experiments) {
        console.log(experiments);
        this.router.navigate(["pages/hlbparser/create", experiments.experiment_id]);
      }

      create() {
        this.router.navigate(["pages/hlbparser/create"]);
      }

      copy(item) {
        var params = {
          "userId": this.userInfo.userId,
          "id": item.experiment_id + ""
        };
        this.http.post("api/v1/persist/experiment/copy", params).subscribe(data => {
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
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/dashboard/experiments/experiment.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./experiment.component.scss */
      "./src/app/pages/dashboard/experiments/experiment.component.scss")).default]
    })], ExperimentComponent);
    /***/
  },

  /***/
  "./src/app/pages/error/error.component.ts":
  /*!************************************************!*\
    !*** ./src/app/pages/error/error.component.ts ***!
    \************************************************/

  /*! exports provided: PageNotFound */

  /***/
  function srcAppPagesErrorErrorComponentTs(module, __webpack_exports__, __webpack_require__) {
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
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/error/error.component.html")).default
    })], PageNotFound);
    /***/
  },

  /***/
  "./src/app/pages/pages-routing.module.ts":
  /*!***********************************************!*\
    !*** ./src/app/pages/pages-routing.module.ts ***!
    \***********************************************/

  /*! exports provided: PagesRoutingModule */

  /***/
  function srcAppPagesPagesRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagesRoutingModule", function () {
      return PagesRoutingModule;
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


    var _pages_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./pages.component */
    "./src/app/pages/pages.component.ts");
    /* harmony import */


    var _error_error_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./error/error.component */
    "./src/app/pages/error/error.component.ts");

    const routes = [{
      path: '',
      component: _pages_component__WEBPACK_IMPORTED_MODULE_3__["PagesComponent"],
      //canActivate: [AuthGuard],
      children: [{
        path: 'dashboard',
        loadChildren: () => Promise.resolve().then(__webpack_require__.bind(null,
        /*! ./dashboard/dashboard.module */
        "./src/app/pages/dashboard/dashboard.module.ts")).then(m => m.DashboardModule)
      }, {
        path: 'hlbparser',
        loadChildren: () => Promise.all(
        /*! import() | hlbparser-hlpparser-module */
        [__webpack_require__.e("default~hlbparser-hlpparser-module~pages-pages-module"), __webpack_require__.e("default~hlbparser-hlpparser-module~public-public-module")]).then(__webpack_require__.bind(null,
        /*! ./hlbparser/hlpparser.module */
        "./src/app/pages/hlbparser/hlpparser.module.ts")).then(m => m.HLBParserModule)
      }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: '**',
        component: _error_error_component__WEBPACK_IMPORTED_MODULE_4__["PageNotFound"]
      }]
    }];
    let PagesRoutingModule = class PagesRoutingModule {};
    PagesRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], PagesRoutingModule);
    /***/
  },

  /***/
  "./src/app/pages/pages.component.scss":
  /*!********************************************!*\
    !*** ./src/app/pages/pages.component.scss ***!
    \********************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesPagesComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".container {\n  margin: 0;\n}\n\n.loading {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n\n.loading-wheel {\n  width: 20px;\n  height: 20px;\n  margin-top: -40px;\n  margin-left: -40px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  border-width: 30px;\n  border-radius: 50%;\n  -webkit-animation: spin 1s linear infinite;\n}\n\n.style-2 .loading-wheel {\n  border-style: double;\n  border-color: #ccc transparent;\n}\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(-360deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9TaGFiYmlyL3Byb2plY3RzL0RFV19VSS9zcmMvc3RlZWwvV0VCLUFQUExJQ0FUSU9OL2Zyb250ZW5kL3NyYy9hcHAvcGFnZXMvcGFnZXMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3BhZ2VzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksU0FBQTtBQ0NKOztBRENBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7RUFDQSxvQ0FBQTtBQ0VKOztBREFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBRUEsa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUVBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQ0FBQTtBQ0NKOztBRENBO0VBQ0ksb0JBQUE7RUFDQSw4QkFBQTtBQ0VKOztBREFBO0VBQ0k7SUFDSSw0QkFBQTtFQ0dOO0VEREU7SUFDSSxrQ0FBQTtFQ0dOO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9wYWdlcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXJ7XG4gICAgbWFyZ2luOiAwO1xufVxuLmxvYWRpbmcge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHotaW5kZXg6IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwuNSk7XG59XG4ubG9hZGluZy13aGVlbCB7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIG1hcmdpbi10b3A6IC00MHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAtNDBweDtcbiAgICBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIFxuICAgIGJvcmRlci13aWR0aDogMzBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xufVxuLnN0eWxlLTIgLmxvYWRpbmctd2hlZWwge1xuICAgIGJvcmRlci1zdHlsZTogZG91YmxlO1xuICAgIGJvcmRlci1jb2xvcjogI2NjYyB0cmFuc3BhcmVudDtcbn1cbkAtd2Via2l0LWtleWZyYW1lcyBzcGluIHtcbiAgICAwJSB7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xuICAgIH1cbn0iLCIuY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwO1xufVxuXG4ubG9hZGluZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5sb2FkaW5nLXdoZWVsIHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgbWFyZ2luLXRvcDogLTQwcHg7XG4gIG1hcmdpbi1sZWZ0OiAtNDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICBib3JkZXItd2lkdGg6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgLXdlYmtpdC1hbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO1xufVxuXG4uc3R5bGUtMiAubG9hZGluZy13aGVlbCB7XG4gIGJvcmRlci1zdHlsZTogZG91YmxlO1xuICBib3JkZXItY29sb3I6ICNjY2MgdHJhbnNwYXJlbnQ7XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBzcGluIHtcbiAgMCUge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XG4gIH1cbiAgMTAwJSB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcbiAgfVxufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/pages/pages.component.ts":
  /*!******************************************!*\
    !*** ./src/app/pages/pages.component.ts ***!
    \******************************************/

  /*! exports provided: PagesComponent */

  /***/
  function srcAppPagesPagesComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagesComponent", function () {
      return PagesComponent;
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

    let PagesComponent = class PagesComponent {
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

    PagesComponent.ctorParameters = () => [{
      type: _state_service_service__WEBPACK_IMPORTED_MODULE_2__["StateService"]
    }];

    PagesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: "app-pages",
      template: "\n  <layout>\n  <router-outlet></router-outlet>\n  \n  </layout>\n  <div *ngIf=\"loaderSwitch\" class=\"loading style-2\"><div class=\"loading-wheel\"></div></div>\n  ",
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./pages.component.scss */
      "./src/app/pages/pages.component.scss")).default]
    })], PagesComponent);
    /***/
  },

  /***/
  "./src/app/pages/pages.module.ts":
  /*!***************************************!*\
    !*** ./src/app/pages/pages.module.ts ***!
    \***************************************/

  /*! exports provided: PagesModule */

  /***/
  function srcAppPagesPagesModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagesModule", function () {
      return PagesModule;
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


    var _pages_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./pages-routing.module */
    "./src/app/pages/pages-routing.module.ts");
    /* harmony import */


    var _pages_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./pages.component */
    "./src/app/pages/pages.component.ts");
    /* harmony import */


    var _hlbparser_hlpparser_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./hlbparser/hlpparser.module */
    "./src/app/pages/hlbparser/hlpparser.module.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var ngx_quill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-quill */
    "./node_modules/ngx-quill/fesm2015/ngx-quill.js");
    /* harmony import */


    var _core_core_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../@core/core.module */
    "./src/app/@core/core.module.ts");
    /* harmony import */


    var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./dashboard/dashboard.module */
    "./src/app/pages/dashboard/dashboard.module.ts");
    /* harmony import */


    var _error_error_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./error/error.component */
    "./src/app/pages/error/error.component.ts");

    let PagesModule = class PagesModule {};
    PagesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      exports: [_pages_component__WEBPACK_IMPORTED_MODULE_3__["PagesComponent"]],
      declarations: [_pages_component__WEBPACK_IMPORTED_MODULE_3__["PagesComponent"], _error_error_component__WEBPACK_IMPORTED_MODULE_9__["PageNotFound"]],
      imports: [_pages_routing_module__WEBPACK_IMPORTED_MODULE_2__["PagesRoutingModule"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _core_core_module__WEBPACK_IMPORTED_MODULE_7__["CoreModule"], _hlbparser_hlpparser_module__WEBPACK_IMPORTED_MODULE_4__["HLBParserModule"], _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_8__["DashboardModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_6__["QuillModule"].forRoot()]
    })], PagesModule);
    /***/
  }
}]);
//# sourceMappingURL=pages-pages-module-es5.js.map