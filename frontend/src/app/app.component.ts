import { Component } from "@angular/core";
import { ClientsServiceService } from "./services/clients/clients-service.service";

@Component({
  selector: "moltaka-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  opened: boolean = true;
  constructor(private sr: ClientsServiceService) {}
}
