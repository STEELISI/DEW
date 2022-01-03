import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state-service.service';
import { LogService, LogEntry, LogHeader } from 'src/app/experiment/hlbparser/common/logging-service';

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

        constructor(private state:StateService, private logService: LogService){}
  ngOnInit(): void {
   
    this.userDetails =  this.state.getUserDetails()==null?{}:this.state.getUserDetails();
    this.logService.log(LogHeader.INFO, "User entered the dashboard");
  }

}
