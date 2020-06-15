import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitUserService } from 'src/app/@auth/init-user.service';
import { HttpService } from 'src/app/http-service.service';
import { HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit{
  userInfo:any;
  show:boolean=false;
  filterSelect = new FormGroup({
    select: new FormControl(''),
    search: new FormControl('')
  });
  filteredLevels = [{name:'Read',value:'2'},{name:'Write',value:'3'},{name:'Manage',value:'4'}]
  
  experiments:any=[]
  filterExperiments:any=[]
 
  constructor(private router:Router,private http:HttpService,private initUser:InitUserService){ }
  ngOnInit() {
    this.initUser.getUser().subscribe(user=>{
     // console.log(user)
      if(user !=null){
          this.userInfo=user;
          this.load(user.userId);
          this.enableComponent();
  }
  });

  this.filterExperiments = this.filterSelect.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value, this.experiments))
    );

  }

  private _filter(value: any, options): [] {
    console.log(value)
    if (value == '')
    return options
    else if(value.select == '')
      return options.filter((option) =>
      option.name.toLowerCase().includes(value.search.toLowerCase()) || option.description.toLowerCase().includes(value.search.toLowerCase())
    );
      else
    return options.filter((option) =>
      option.accessLevel >= value.select
    ).filter((option) =>
    option.name.toLowerCase().includes(value.search.toLowerCase()) || option.description.toLowerCase().includes(value.search.toLowerCase())
  );
  }

  enableComponent(){
    this.show = true;
  }
  load(userId){
    this.http.get("v1/pr/persist/getExperimentList/"+userId,{withCredentials: true}).subscribe(data=>{
    
      this.experiments = data;
     });
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
    this.http.post("api/v1/pr/persist/experiment/copy",params,{withCredentials: true}).subscribe(data=>{
    
      this.edit(data);
     });
  }

 

}
