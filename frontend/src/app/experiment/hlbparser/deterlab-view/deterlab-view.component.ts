import {Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/http-service.service';
import {Router} from '@angular/router';

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
  constructor(private http: HttpService, private route: Router) {}

  ngOnInit() {
    this.http.get('v1/pr/profile/accounts/deterLab/get', {withCredentials: true}).subscribe(data => {
      if (data.username !== '') {
        this.userDetails.username = data.username;
        this.userDetails.password = data.password;
      } else {
        this.showWarning = true;
      }
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
    this.http.post('/api/v1/pr/deterlab/project/exists', {projectName: this.projName} ,
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
    const url = this.route.url.split('/');
    const expId = url[url.length - 1];
    this.http.post('/api/v1/pr/deter/add/project/mapping',
        {projectName: this.projName, experimentName: this.expName, experimentId: expId},
        {withCredentials: true}).subscribe(data => {
      console.log(data);
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
