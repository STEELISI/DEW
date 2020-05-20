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
  show:boolean=false;
  ngOnInit() {
    this.initUser.getUser().subscribe(user=>{
     // console.log(user)
      if(user !=null){
          this.userInfo=user;
          this.load(user.userId);
          this.enableComponent();
  }
  });
  }
  enableComponent(){
    this.show = true;
  }
  load(userId){
    this.http.get("v1/persist/getExperimentList/"+userId).subscribe(data=>{
    
      this.experiments = data;
     });
  }
  experiments:any=[]
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

 

}
