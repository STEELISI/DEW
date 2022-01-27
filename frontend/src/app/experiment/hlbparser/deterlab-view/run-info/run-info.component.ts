import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpService} from 'src/app/http-service.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'run-info',
    templateUrl: './run-info.component.html',
    styleUrls: ['./run-info.component.scss']
})

export class RunInfoComponent implements OnInit, OnChanges {
    @Input() experiment_id:Number
    @Input() account_id:Number
    logList: []
    error:String
    errorFlag:boolean = false
    logid:String
    executionScript = []
    loader = false
    panelOpenState = false
    constructor(private http:HttpService
        , private _snackBar: MatSnackBar
    
        ){}
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.account_id !== undefined){
            this.account_id = changes.account_id.currentValue
        } 

        if(changes.experiment_id !== undefined){
            this.experiment_id = changes.experiment_id.currentValue
        } 
        this.ngOnInit()
    }
    ngOnInit(): void {
        this.logList = []
        this.executionScript = []
        console.log("inside Run Info Component"+this.experiment_id+":"+this.account_id)

        if(this.experiment_id!=undefined && this.account_id !=undefined)
        this.getRunLogs()
    }

    getRunLogs() {
        this.logList = []
        this.errorFlag = false
        let url = 'v1/pr/deter/project/run/logs?eid='+this.experiment_id+'&account_id='+this.account_id;
        this.http.get(url, {withCredentials: true})
            .subscribe(data => {
                if(data.logs!=undefined && data.logs.length!=0){
                this.logList = data.logs
                this.logid = data.logs[0].id
		
                } else{
                this.error = data.error
                this.errorFlag = true
                }
            });
    }

    showDetails(){
        console.log(this.logid)
        this.executionScript = []
        this.errorFlag = false
        this.loader = true
        let params = {
            rid:this.logid,
            account_id:this.account_id,
            b:20,
        }
        this.http.post('/api/v1/pr/deter/project/run/get', params, {withCredentials: true})
            .subscribe(data1 => {
                this.loader = false
                if (data1.error==undefined)
                this.executionScript = data1.data
                else{
                    console.log(data1.error)
                this._snackBar.open(data1.error, 'close', {
                    duration: 2000,
                });
                }
            }, error => {
                this.loader = false
                this._snackBar.open('Something went wrong please try again later!', 'close', {
                    duration: 2000,
                });
            });
    }
}
