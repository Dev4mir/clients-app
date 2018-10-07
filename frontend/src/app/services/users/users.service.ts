import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import * as io from "socket.io-client";

import { UserDetails } from "../../models/user";
import { TokenResponse, TokenPayload } from "../../models/token";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private baseUrl = environment.baseUrl;
  private url: string = this.baseUrl + "api/users/";
  private socket = io(this.baseUrl);

  private request(
    method: "post" | "get",
    type: "" | "edit",
    id?,
    user?: TokenPayload
  ): Observable<any> {
    let base;

    if (method === "post") {
      console.log(user);
      base = this.http.post(`${this.url}${type}/${id}`, user, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` }
      });
    } else {
      base = this.http.get(`${this.url}${type}`, {
        headers: { Authorization: `Bearer ${this.auth.getToken()}` }
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        return data;
      })
    );
    return request;
  }

  public getUsers() {
    return this.request("get", "");
  }
  public editUser($id, $user) {
    return this.request("post", "edit", $id, $user);
  }
  ioInit($ioEvent) {
    const observable = new Observable<{ user: Object }>(observer => {
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
