import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";

import { AddClientComponent } from "../add-client/add-client.component";
import { EditClientComponent } from "../edit-client/edit-client.component";
import { ViewClientComponent } from "../view-client/view-client.component";
import { AddUserComponent } from "../add-user/add-user.component";

import { ClientsServiceService } from "../../services/clients/clients-service.service";
import { AuthService } from "../../services/auth/auth.service";
import { UsersService } from "../../services/users/users.service";

import { Client } from "../../models/client";

var ELEMENT_DATA;

@Component({
  selector: "moltaka-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent implements OnInit {
  constructor(
    private clientService: ClientsServiceService,
    public dialog: MatDialog,
    private auth: AuthService,
    private usersService: UsersService
  ) {
    this.clientService.ioInit("new client").subscribe(data => {
      ELEMENT_DATA.push(data.client);
      this.updateTableData();
    });
    this.clientService.ioInit("edit client").subscribe(data => {
      var clientId = data.client["_id"];
      console.log(data);
      ELEMENT_DATA.forEach((el, i) => {
        if (el._id === clientId) {
          ELEMENT_DATA[i] = data.client;
        }
      });
      this.updateTableData();
    });
  }
  private updateTableData() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "name",
    "phone",
    "mobile",
    "address",
    "username",
    "password",
    "edit"
  ];
  dataSource: MatTableDataSource<Client[]>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getClients().subscribe(res => {
      console.log(res);
      ELEMENT_DATA = res;
      this.updateTableData();
    });

    // console.log(process.env.NODE_ENV);
    this.usersService.getUsers().subscribe(res => console.log(res));
  }

  openAddClientDialog(): void {
    this.dialog.open(AddClientComponent);
  }
  openAddUserDialog(): void {
    this.dialog.open(AddUserComponent);
  }

  openEdit($elem) {
    this.dialog.open(EditClientComponent, { data: $elem });
  }

  openInfo($elem) {
    this.dialog.open(ViewClientComponent, { data: $elem });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout() {
    this.auth.logout();
  }
  isUserAdmin() {
    return this.auth.getUserDetails().isAdmin;
  }
}
