import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import * as io from "socket.io-client";

import { AuthService } from "../auth/auth.service";
import { Client } from "../../models/client";
import { TokenResponse } from "../../models/token";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClientsServiceService {
  constructor(
    private http: HttpClient,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private auth: AuthService
  ) {
    /* Icon */
    iconRegistry.addSvgIcon(
      "edit",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/edit.svg")
    );
    iconRegistry.addSvgIcon(
      "info",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/info.svg")
    );
    iconRegistry.addSvgIcon(
      "menu",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/menu.svg")
    );
  }
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + "api/clients/";
  private socket = io(this.baseUrl);

  private request(
    method: "post" | "get",
    type: "" | "add" | "edit",
    id?,
    client?: Client
  ): Observable<any> {
    let base;

    if (method === "post") {
      console.log("req..");
      base = this.http.post(`${this.url}${type}/${id}`, client, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` }
      });
    } else {
      base = this.http.get(`${this.url}${type}`, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` }
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.auth.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public getClients() {
    return this.request("get", "");
  }
  public createClient($client) {
    // this.socket.emit("add-client", $client);
    return this.request("post", "add", "", $client);
  }
  public editClient($id, $client) {
    // this.socket.emit("edit-client", $id, $client);
    return this.request("post", "edit", $id, $client);
  }

  ioInit($ioEvent) {
    const observable = new Observable<{ client: Object }>(observer => {
      this.socket.on($ioEvent, data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}

//mongoimport -d clients -c clients --type csv --file clients.csv --headerline
