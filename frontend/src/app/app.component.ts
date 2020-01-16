import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { StateService } from './pages/dashboard/common/state-service.service';

@Component({
  selector: "app-root",
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  loaderSwitch:boolean=false;
  constructor(private state:StateService){}
  ngOnInit(): void {

  this.state.isLoaderEnabled().subscribe(loader=>{
    this.loaderSwitch = loader;
  });
  // this.route.navigate(['/pages/dashboard']);
  }
  title = "DEWUI";
}
