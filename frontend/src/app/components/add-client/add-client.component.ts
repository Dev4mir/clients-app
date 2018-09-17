import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { MatDialogRef } from "@angular/material";

import { ClientsServiceService } from "../../services/clients/clients-service.service";
import { AuthService } from "../../services/auth/auth.service";

import { Client } from "../../models/client";

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
    private auth: AuthService
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
    UID: [this.userId, Validators.required]
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
      },
      err => {
        console.log(err);
        this.isLoading = false;
      },
      () => this.close()
    );
  }

  close() {
    this.dialogRef.close();
  }
}
