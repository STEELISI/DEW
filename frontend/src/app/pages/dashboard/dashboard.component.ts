import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 /**\
    <div *ngIf="x.id ==1">
        <hlb></hlb>
      </div>

      <div *ngIf="x.id ==2">
        <nlp></nlp>
      </div>

      <div *ngIf="x.id ==4">
        <upload></upload>
      </div> 
  */
    menuList:any=[
      {
        name:"Configuration",
        id:1,
        html:"<hlb></hlb>"
      }
      // ,{
      //   name:"NLP",
      //   id:2,
      //   html:"<nlp></nlp>"
      // }
        ,{
        name:"Behavior Dependency Graph",
        id:3,
        html:"<p>In Progress.....</p>"
      } ,{
        name:"Upload",
        id:4,
        html:"<upload></upload>"
      }     
      ];

}
