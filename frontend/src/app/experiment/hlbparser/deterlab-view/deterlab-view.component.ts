import {Component, OnInit} from '@angular/core';
import {HttpService} from 'src/app/http-service.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-deterlab',
    templateUrl: './deterlab-view.component.html',
    styleUrls: ['./deterlab-view.component.scss']
})

export class DeterLabViewComponent implements OnInit {
    userDetails = {username: '', password: ''};
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
    experimentName = '';
    alertType = '';
    showAlert = false;
    alertMsg = '';
    activityMessages = [];

    constructor(private http: HttpService, private route: Router) {
    }

    ngOnInit() {
        const url = this.route.url.split('/');
        this.experimentId = url[url.length - 1];
        this.http.get('v1/pr/profile/accounts/deterLab/get', {withCredentials: true}).subscribe(data => {
            if (data.username !== '') {
                this.userDetails.username = data.username;
                this.userDetails.password = data.password;
            } else {
                this.showWarning = true;
            }
        });
        const params = new HttpParams().append('eid', this.experimentId);
        this.http.get('v1/pr/deter/project', {params, withCredentials: true})
            .subscribe(data => {
                this.showSwap = data.error === undefined;
            });
        // setInterval(() => {
        this.http.get('v1/pr/deter/project/getstatus', {params, withCredentials: true})
            .subscribe(data => {
                if (data.error) {
                    this.showSwap = false;
                } else if (data.content === 'No information available.') {
                    this.experimentName = 'Not available';
                    this.experimentStatus = 'Not available';
                } else {
                    const lines = data.content.split('\n');
                    this.experimentName = lines[0].replace(' ', '').split(':')[1];
                    this.experimentStatus = lines[1].replace(' ', '').split(':')[1];
                }
            });
        // }, 5000);
        this.http.get('v1/pr/deter/project/getactivity', {params, withCredentials: true})
            .subscribe(data => {
                this.activityMessages = data.content.split('\n');
                console.log(this.activityMessages);
            });
        this.projName = '';
        this.expName = '';
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
        this.http.post('/api/v1/pr/deterlab/project/exists', {projectName: this.projName},
            {withCredentials: true}).subscribe(data => {
            this.isValidProjName = data.isExists;
        });
    }

    testExperimentValidity() {
        this.http.post('/api/v1/pr/deterlab/experiment/exists',
            {projectName: this.projName, experimentName: this.expName},
            {withCredentials: true}).subscribe(data => {
            this.isValidExpName = data.isExists;
        });
    }

    createOrLinkToNewExperiment() {
        this.http.post('/api/v1/pr/deter/add/project/mapping',
            {projectName: this.projName, experimentName: this.expName, experimentId: this.experimentId},
            {withCredentials: true}).subscribe(data => {
            console.log(data);
            if (data === 'Successful') {
                this.alertMsg = this.showLinkWindow ? 'Successfully linked to experiment' :
                    'Successfully created new experiment';
                this.alertType = 'alert-success';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                    location.reload();
                }, 3000);
            }
        });
    }

    swapInOrSwapOutExperiment(type) {
        let params = new HttpParams().append('eid', this.experimentId);
        params = params.append('mode', type);
        this.http.get('v1/pr/deter/project/swap', {params, withCredentials: true})
            .subscribe(data => {
                if (data) {
                    this.alertMsg = type === 'swapin' ? 'Successfully swapped-in experiment' :
                        'Successfully swapped-out experiment';
                    this.alertType = 'alert-success';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                        location.reload();
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
}
