import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state-service.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  


    menuList:any=[
     {
        name:"List of Experiment",
        id:1
      
      }   
      ];
userDetails:any;

        constructor(private state:StateService){}
  ngOnInit(): void {
   
    this.userDetails =  this.state.getUserDetails()==null?{}:this.state.getUserDetails();
    
  }

}
