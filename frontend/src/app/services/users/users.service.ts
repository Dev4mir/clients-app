import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";

import { UserDetails } from "../../models/user";
import { TokenResponse, TokenPayload } from "../../models/token";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private url: string = "/api/user/";
  private request(
    method: "post" | "get",
    type: "" | "",
    user?: TokenPayload
  ): Observable<any> {
    let base;

    if (method === "post") {
      console.log(user);
      base = this.http.post(`${this.url}${type}`, user, {
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
}
