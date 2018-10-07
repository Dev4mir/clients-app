import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "moltaka-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private fg: FormBuilder,
    private router: Router,
    private auth: AuthService,
    public snackBar: MatSnackBar
  ) {}

  loginForm = this.fg.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigateByUrl("/");
      },
      err => {
        this.snackBar.open(err.error.message);
      }
    );
  }
}
