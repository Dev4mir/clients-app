import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import * as jwtDecode from "jwt-decode";

import { UserDetails } from "../../models/user";
import { TokenResponse, TokenPayload } from "../../models/token";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  public saveToken(token: string): void {
    localStorage.setItem("appToken", token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("appToken");
    }
    return this.token;
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("appToken");
    this.router.navigateByUrl("/login");
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = jwtDecode(token);
      return payload;
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      if (user.exp > Date.now() / 1000) {
        return true;
      } else {
        this.logout();
        return false;
      }
    } else {
      return false;
    }
  }
  private baseUrl = environment.baseUrl;

  private url: string = this.baseUrl + "api/auth/";
  private request(
    method: "post" | "get",
    type: "login" | "register",
    user?: TokenPayload
  ): Observable<any> {
    let base;

    if (method === "post") {
      base = this.http.post(`${this.url}${type}`, user, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    } else {
      base = this.http.get(`${this.url}${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token && type === "login") {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request("post", "register", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }
}
