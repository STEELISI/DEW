import { Component, OnInit } from '@angular/core';
import { StateService } from '../hlbparser/common/state-service.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  


    menuList:any=[
      {
        name:"Home",
        id:1
      }
      ,{
        name:"List of Experiment",
        id:2
      
      }   
      ];
userDetails:any;

        constructor(private state:StateService){}
  ngOnInit(): void {
   
    this.userDetails =  this.state.getUserDetails()==null?{}:this.state.getUserDetails();
    
  }

}
