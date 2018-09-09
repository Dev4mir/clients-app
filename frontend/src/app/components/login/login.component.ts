import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
    private auth: AuthService
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
    this.auth.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }
}
