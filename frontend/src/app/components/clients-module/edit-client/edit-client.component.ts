import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder, Validators } from "@angular/forms";

import { ClientsServiceService } from "../../../services/clients/clients-service.service";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "moltaka-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.scss"]
})
export class EditClientComponent implements OnInit {
  isLoading: boolean = false;
  file;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fg: FormBuilder,
    private dialogRef: MatDialogRef<EditClientComponent>,
    private clientService: ClientsServiceService,
    private auth: AuthService,
    public snackBar: MatSnackBar
  ) {}

  editClientForm = this.fg.group({
    name: [this.data.name, Validators.required],
    phone: [this.data.phone, Validators.required],
    mobile: [this.data.mobile, Validators.required],
    address: [this.data.address, Validators.required],
    username: [this.data.username],
    password: [this.data.password],
    idNumber: [this.data.idNumber],
    note: [this.data.note],
    withRatio: [this.data.withRatio]
  });

  ngOnInit() {}
  getFile(e) {
    this.file = e.target.files;
  }
  editClient() {
    let formData = new FormData();
    let fgData = this.editClientForm.value;
    this.isLoading = true;

    for (let key in fgData) {
      formData.append(key, fgData[key]);
    }
    if (this.file && this.file.length > 0) {
      for (let i = 0; i < this.file.length; i++) {
        formData.append("clientImages", this.file[i], this.file[i]["name"]);
      }
    }

    this.clientService.editClient(this.data._id, formData).subscribe(
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

  isAdmin() {
    return (
      this.auth.getUserDetails().isAdmin &&
      this.auth.getUserDetails().role === "admin"
    );
  }

  close() {
    this.dialogRef.close();
  }
}
