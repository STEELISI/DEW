import {Component, Inject, OnInit} from '@angular/core';
import {HttpService} from 'src/app/http-service.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-deterlab',
    templateUrl: './deterlab-view.component.html',
    styleUrls: ['./deterlab-view.component.scss']
})

export class DeterLabViewComponent implements OnInit {
    userId;
    userNameObj = {username: '', created_date: '', id: null};
    showWarning = false;
    showLinkWindow = false;
    showCreateWindow = false;
    projName = '';
    expName = '';
    isValidProjName = false;
    isValidExpName = false;
    experimentId;
    showSwap = false;
    experimentStatus = '';
    // experimentName = '';
    alertType = '';
    showAlert = false;
    alertMsg = '';
    statusMessages = [];
    activityMessages = [];
    activateSwap = true;
    userCreatedDate;
    userNamesList = [];

    constructor(private http: HttpService, 
        private route: Router
        ,private _snackBar: MatSnackBar,
        public dialog: MatDialog) {
    }

    ngOnInit() {
        const url = this.route.url.split('/');
        if (!parseInt(url[url.length - 1], 10)) {
            this.showWarning = true;
            return;
        }
        this.experimentId = url[url.length - 1];
        this.http.get('v1/pr/profile/accounts/deterLab/get', {withCredentials: true}).subscribe(data => {
            if (data.length > 0) {
                this.userNamesList = data;
                this.userId = data[0].id.toString();
                this.userNameObj = data[0];
            } else {
                this.showWarning = true;
                return;
            }
            let params = new HttpParams().append('eid', this.experimentId);
            params = params.append('account_id', this.userId);
            this.getProjectMapping(params);
            this.getExperimentStatus(params);
            this.getExperimentActivity(params);
        });
        this.projName = '';
        this.expName = '';
    }

    getRefreshedStatus() {
        let params = new HttpParams().append('eid', this.experimentId);
        params = params.append('account_id', this.userId);
        this.getExperimentStatus(params);
        this.getExperimentActivity(params);
    }

    getProjectMapping(params) {
        this.http.get('v1/pr/deter/project', {params, withCredentials: true})
            .subscribe(data1 => {
                this.showSwap = data1.error === undefined;
                if (!data1.error) {
                    this.projName = data1.project_name;
                    this.expName = data1.experiment_name;
                }
            });
    }

    getExperimentStatus(params) {
        this.http.get('v1/pr/deter/project/getstatus', {params, withCredentials: true})
            .subscribe(data2 => {
                if (data2.error) {
                    this.showSwap = false;
                    this.statusMessages = [data2.error];
                } else if (data2.content === 'No information available.') {
                    // this.experimentName = 'In transition';
                    this.experimentStatus = 'In transition';
                    this.statusMessages = [];
                    this.activityMessages = [];
                } else {
                    this.statusMessages =  data2.content.split('\n');
                    this.experimentStatus = this.statusMessages[1].replace(' ', '').split(':')[1].trim();
                    if (this.experimentStatus === 'active') {
                        this.activateSwap = false;
                    }
                }
            });
    }

    getExperimentActivity(params) {
        this.http.get('v1/pr/deter/project/getactivity', {params, withCredentials: true})
            .subscribe(data3 => {
                if (data3.content) {
                    this.activityMessages = data3.content.split('\n');
                } else if (data3.error) {
                    this.activityMessages = [data3.error];
                }
            });
    }

    enableTheLinkWindow() {
        this.showLinkWindow = true;
        this.showCreateWindow = false;
        this.isValidProjName = false;
        this.projName = '';
        this.expName = '';
    }

    enableTheCreateWindow() {
        this.showCreateWindow = true;
        this.showLinkWindow = false;
        this.isValidProjName = false;
        this.projName = '';
        this.expName = '';
    }

    testProjectValidity() {
        this.http.post('/api/v1/pr/deterlab/project/exists',
            {projectName: this.projName, account_id: this.userId},
            {withCredentials: true}).subscribe(data => {
            this.isValidProjName = data.isExists;
        });
    }

    testExperimentValidity() {
        this.http.post('/api/v1/pr/deterlab/experiment/exists',
            {projectName: this.projName, experimentName: this.expName, account_id: this.userId},
            {withCredentials: true}).subscribe(data => {
            this.isValidExpName = data.isExists;
        });
    }

    createOrLinkToNewExperiment() {
        this.http.post('/api/v1/pr/deter/add/project/mapping',
            {
                projectName: this.projName, experimentName: this.expName,
                experimentId: this.experimentId, account_id: this.userId
            },
            {withCredentials: true}).subscribe(data => {
            console.log(data);
            if (data === 'Successful') {
                this.alertMsg = this.showLinkWindow ? 'Successfully linked to experiment' :
                    'Successfully created new experiment';
                this.alertType = 'alert-success';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                    this.showLinkWindow = false;
                    this.showCreateWindow = false;
                    this.ngOnInit();
                }, 3000);
            }
        });
    }

    swapInOrSwapOutExperiment(type) {
        let params = new HttpParams().append('eid', this.experimentId);
        params = params.append('mode', type);
        params = params.append('account_id', this.userId);
        this.http.get('v1/pr/deter/project/swap', {params, withCredentials: true})
            .subscribe(data => {
                if (data) {
                    this.alertMsg = type === 'swapin' ? 'Successfully swapped-in experiment' :
                        'Successfully swapped-out experiment';
                    this.alertType = 'alert-success';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                        this.ngOnInit();
                    }, 3000);
                }
            });
    }

    updateNSFile() {
        let params = new HttpParams().append('eid', this.experimentId);
        params = params.append('account_id', this.userId);
        this.http.get('v1/pr/deter/update/project/nsfile', {params, withCredentials: true})
            .subscribe(data => {
                if (data.success) {
                    this.alertMsg = 'Successfully updated NS file';
                    this.alertType = 'alert-success';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 3000);
                }
            });
    }

    updateMapping() {
        this.showLinkWindow = true;
        this.isValidExpName = true;
        this.isValidProjName = true;
    }

    cancelClicked() {
        this.showLinkWindow = false;
        this.showCreateWindow = false;
    }

    deleteMapping() {
        let params = new HttpParams().append('eid', this.experimentId);
        params = params.append('account_id', this.userId);
        this.http.delete('v1/pr/deter/project/mapping/delete', {params, withCredentials: true})
            .subscribe(data => {
                if (data === 'Successful') {
                    this.alertMsg = 'Successfully deleted mapping';
                    this.alertType = 'alert-success';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                        this.showLinkWindow = false;
                        this.showCreateWindow = false;
                        this.projName = '';
                        this.expName = '';
                        this.experimentStatus = '';
                        this.activityMessages = [];
                        this.statusMessages = [];
                        this.ngOnInit();
                    }, 3000);
                }
            });
    }

    activateOnProjValidity() {
        if (this.projName) {
            return this.isValidProjName ? 'is-valid' : 'is-invalid';
        } else {
            return '';
        }
    }

    activateOnExpCreateValidity() {
        if (this.projName) {
            return this.isValidExpName ? 'is-invalid' : 'is-valid';
        } else {
            return '';
        }
    }

    activateOnExpValidity() {
        if (this.expName) {
            return this.isValidExpName ? 'is-valid' : 'is-invalid';
        } else {
            return '';
        }
    }

    userChanged() {
        this.userId = this.userNameObj.id;
        this.activityMessages = [];
        this.statusMessages = [];
        this.projName = '';
        this.expName = '';
        this.experimentStatus = '';
        let params = new HttpParams().append('eid', this.experimentId);
        params = params.append('account_id', this.userId);
        this.getProjectMapping(params);
        this.getExperimentStatus(params);
        this.getExperimentActivity(params);
    }

    run(data={}) {

        let params = {
            "eid":this.experimentId,
            "account_id":this.userId,
            "data":data
        }
    
        this.http.post('/api/v1/pr/deter/project/run',params,{withCredentials: true})
        .subscribe(data => {
            if(data['success'])
            this._snackBar.open("Successfully started", "close", {
                duration: 2000,
              });
            else {
               
    var dialogRef = this.dialog.open(RunVariablePopUp, {
      width: "30%",
     data: data['paramters'],
    });

    dialogRef.afterClosed().subscribe((result) => {
    console.log(result);
        if(result !=undefined)
        this.run(result)
       });
            }
        },error=>{
            this._snackBar.open("Something went wrong please try again later!", "close", {
                duration: 2000,
              });
        });
    }
}

@Component({
    selector: "run-variable-popup",
    templateUrl: "run-variable-popup.component.html",
    styleUrls: ["./deterlab-view.component.scss"],
  })
  export class RunVariablePopUp implements OnInit{
    variableList:any
    constructor(
      public dialogRef: MatDialogRef<RunVariablePopUp>,
      @Inject(MAT_DIALOG_DATA) public variable: any
    ) {}

    ngOnInit(){
        this.variableList = {}
        this.variable.forEach(element => {
            this.variableList[element] =""
        });
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
