import { Component } from '@angular/core';

@Component({
  selector: 'hlbparser',
  templateUrl: './hlpparser.component.html',
  styleUrls: ['./hlpparser.component.scss']
})
export class HLBParserComponent {

    menuList:any=[
      {
        name:"HLB",
        id:1,
        html:"<hlb></hlb>"
      }
      ,{
        name:"NLP",
        id:2,
        html:"<nlp></nlp>"
      }
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
