import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isAdmin =
      this.auth.getUserDetails().isAdmin &&
      this.auth.getUserDetails().role === "admin";
    if (isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl("/clients");
      return false;
    }
  }
}
