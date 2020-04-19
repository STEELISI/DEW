import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitUserService } from 'src/app/@auth/init-user.service';
import { HttpService } from 'src/app/http-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit{
  userInfo:any;
  ngOnInit() {
    this.initUser.getUser().subscribe(user=>{
     // console.log(user)
      if(user !=null){
          this.userInfo=user;
          this.load(user.userId);
  
  }
  });
  }

  load(userId){
    this.http.get("v1/persist/getExperimentList/"+userId).subscribe(data=>{
    
      this.experiments = data;
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
    this.router.navigate(["pages/hlbparser/create",experiments.experiment_id]);
  }

  create(){
    this.router.navigate(["pages/hlbparser/create"]);
  }

  copy(item){

    var params = {
      "userId": this.userInfo.userId,
      "id": item.experiment_id+""
    }
    this.http.post("api/v1/persist/experiment/copy",params).subscribe(data=>{
    
      this.edit(data);
     });
  }

  delete(experiments){
    var header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body:{
      userId:this.userInfo.userId,
      id:experiments.experiment_id+""
    }}
    this.http.delete("v1/persist/experiment/delete",header).subscribe(data=>{
      console.log(data);
      alert("experiment is delete;");
      this.load(this.userInfo.userId);
    })
  }

}
