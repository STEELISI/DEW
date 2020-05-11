import { Component, OnDestroy, OnInit } from "@angular/core";
import { StateService } from '../state-service.service';

@Component({
  selector: "app-pages",
  styleUrls: ['pages.component.scss'],
  template: `
  <layout>
  <router-outlet></router-outlet>
  
  </layout>
  <div *ngIf="loaderSwitch" class="loading style-2"><div class="loading-wheel"></div></div>
  `
})
export class PagesComponent implements OnInit {
  alive: boolean = true;
 
    loaderSwitch: boolean = false;
    constructor(private state: StateService) {}
    ngOnInit(): void {
      this.state.isLoaderEnabled().subscribe(loader => {
        this.loaderSwitch = loader;
      });
    }
}
