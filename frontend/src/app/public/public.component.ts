import { Component, OnDestroy } from "@angular/core";

@Component({
  selector: "app-public",
  styleUrls: ['public.component.scss'],
  template: `
 
  <router-outlet></router-outlet>
  
 
  `
})
export class PublicComponent  {
  alive: boolean = true;

}
