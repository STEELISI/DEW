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
export class PagesComponent implements OnDestroy {
  alive: boolean = true;
  ngOnDestroy(): void {
    this.alive = false;
  }
}
