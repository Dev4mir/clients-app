import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { MatDialogRef, MatSnackBar } from "@angular/material";

import { ClientsServiceService } from "../../../services/clients/clients-service.service";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "moltaka-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.scss"]
})
export class AddClientComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private fg: FormBuilder,
    private clientService: ClientsServiceService,
    private dialogRef: MatDialogRef<AddClientComponent>,
    private auth: AuthService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  private userId = this.auth.getUserDetails()._id;

  newClientForm = this.fg.group({
    userAddedDate: [new Date()],
    name: ["", Validators.required],
    phone: ["", Validators.required],
    mobile: ["", Validators.required],
    address: ["", Validators.required],
    username: [""],
    password: [""],
    UID: [this.userId, Validators.required],
    idNumber: [0],
    note: [""],
    withRatio: [false]
  });
  file;
  getFile(e) {
    this.file = e.target.files;
  }
  addNewClient() {
    console.log("here");
    let formData = new FormData();
    let fgData = this.newClientForm.value;
    this.isLoading = true;

    for (let key in fgData) {
      formData.append(key, fgData[key]);
    }
    if (this.file && this.file.length > 0) {
      for (let i = 0; i < this.file.length; i++) {
        formData.append("clientImages", this.file[i], this.file[i]["name"]);
      }
    }
    this.clientService.createClient(formData).subscribe(
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
