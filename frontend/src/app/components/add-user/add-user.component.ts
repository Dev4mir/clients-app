import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "moltaka-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  isLoading: boolean = false;

  userCredentionals = this.fg.group({
    name: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", Validators.required],
    isAdmin: [false]
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private fg: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  register() {
    this.isLoading = true;
    console.log(this.userCredentionals.value);
    this.auth.register(this.userCredentionals.value).subscribe(
      () => {
        this.isLoading = false;
      },
      err => {
        console.error(err);
      },
      () => {
        this.close();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
