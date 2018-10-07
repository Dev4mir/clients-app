import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder, Validators } from "@angular/forms";

import { UsersService } from "../../../services/users/users.service";

@Component({
  selector: "moltaka-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  isLoading: boolean = false;
  adminChecked: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fg: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private usersService: UsersService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formChanges();
    this.adminChecked = this.data.isAdmin;
  }

  editUserForm = this.fg.group({
    name: [this.data.name, Validators.required],
    username: [this.data.username, Validators.required],
    isAdmin: [this.data.isAdmin],
    role: [this.data.role],
    active: [this.data.active],
    newPassword: [""]
  });

  formChanges() {
    this.editUserForm.get("isAdmin").valueChanges.subscribe(res => {
      if (!res) {
        this.editUserForm.controls.role.setValue("");
      } else {
        this.editUserForm.controls.role.setValue("supervisor");
      }
      this.adminChecked = res;
    });
  }

  editUser() {
    console.log(this.editUserForm.value);
    this.isLoading = true;
    this.usersService
      .editUser(this.data._id, this.editUserForm.value)
      .subscribe(
        res => {
          console.log(res);
          this.isLoading = false;
          this.snackBar.open(res);
        },
        err => {
          console.log(err);
          this.isLoading = false;
          this.snackBar.open(err.error);
        },
        () => this.close()
      );
  }
  close() {
    this.dialogRef.close();
  }
}
