import { Component, OnDestroy } from "@angular/core";

@Component({
  selector: "app-pages",
  styleUrls: ['pages.component.scss'],
  template: `
  <layout>
  <router-outlet></router-outlet>
  
  </layout>
  `
})
export class PagesComponent  {
  alive: boolean = true;

}
