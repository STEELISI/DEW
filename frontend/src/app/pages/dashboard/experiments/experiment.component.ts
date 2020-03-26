import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent {


  experiments:any=[{
    id:123,
    name:"Test1",
    description:"",
    lastUpdatedDate:"01/27/2020"
  }]
  constructor(private router:Router){

  }
  edit(experiments){
    this.router.navigate(["hlbparser/create",experiments.id]);
  }

  create(){
    this.router.navigate(["hlbparser/create"]);
  }

}
