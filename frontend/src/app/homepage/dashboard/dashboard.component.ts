import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state-service.service';
import { AuthService } from 'src/app/@auth/auth.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  
  authService: AuthService;

    menuList:any=[
     {
        name:"List of Experiment",
        id:1
      
      }   
      ];
userDetails:any;

        constructor(private state:StateService, authService: AuthService){
          this.authService = authService;
        }
        
  ngOnInit(): void {
    this.userDetails =  this.state.getUserDetails()==null?{}:this.state.getUserDetails();
    this.authService.setRefreshTokenIntervals();
  }

}
