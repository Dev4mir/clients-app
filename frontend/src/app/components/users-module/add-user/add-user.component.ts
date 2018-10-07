import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MatSnackBar } from "@angular/material";

@Component({
  selector: "moltaka-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  isLoading: boolean = false;
  adminChecked: boolean;

  userCredentionals = this.fg.group({
    name: ["", Validators.required],
    username: ["", Validators.required],
    password: ["", Validators.required],
    isAdmin: [false],
    role: [""],
    active: [true]
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private fg: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    public snackBar: MatSnackBar
  ) {}

  register() {
    this.isLoading = true;
    this.auth.register(this.userCredentionals.value).subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.snackBar.open(res.message);
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.snackBar.open(err.error);
      },
      () => {
        this.close();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.formChanges();
  }

  formChanges() {
    this.userCredentionals.get("isAdmin").valueChanges.subscribe(res => {
      if (!res) {
        this.userCredentionals.controls.role.setValue("");
      }
      this.adminChecked = res;
    });
  }
}
