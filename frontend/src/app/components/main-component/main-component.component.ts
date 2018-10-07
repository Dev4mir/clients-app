import { Component, OnInit } from "@angular/core";

import { ClientsServiceService } from "../../services/clients/clients-service.service";
import { AuthService } from "../../services/auth/auth.service";
import { UserDetails } from "../../models/user";

@Component({
  selector: "moltaka-main-component",
  templateUrl: "./main-component.component.html",
  styleUrls: ["./main-component.component.scss"]
})
export class MainComponentComponent implements OnInit {
  public opened: boolean = true;
  public userData: UserDetails;

  constructor(
    private clientService: ClientsServiceService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.userData = this.auth.getUserDetails();
    }
  }

  logout() {
    this.auth.logout();
  }
  isAdmin() {
    return this.userData.isAdmin && this.userData.role === "admin";
  }
}
