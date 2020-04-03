import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../hlbparser/common/http-service.service';
import { InitUserService } from 'src/app/@auth/init-user.service';

@Component({
  selector: 'experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit{
  ngOnInit() {
    this.initUser.getUser().subscribe(user=>{
      console.log(user)
      if(user !=null){

   this.http.get("/v1/persist/getExperimentList/"+user.userId).subscribe(data=>{
     this.experiments = data;
   });
  }
  });
  }


  experiments:any=[{
    id:123,
    name:"Test1",
    description:"",
    lastUpdatedDate:"01/27/2020"
  }]
  constructor(private router:Router,private http:HttpService,private initUser:InitUserService){

  }
  edit(experiments){
    console.log(experiments)
    this.router.navigate(["pages/hlbparser/create",experiments.id]);
  }

  create(){
    this.router.navigate(["pages/hlbparser/create"]);
  }

}
