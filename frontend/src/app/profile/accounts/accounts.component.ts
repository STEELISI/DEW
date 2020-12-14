import { Component, OnInit } from "@angular/core";
import { StateService } from "../../state-service.service";

@Component({
  selector: "accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"],
})
export class AccountsComponent implements OnInit {
  userDetails: any;

  constructor(private state: StateService) {}
  ngOnInit(): void {
    this.userDetails =
      this.state.getUserDetails() == null ? {} : this.state.getUserDetails();
  }
}
