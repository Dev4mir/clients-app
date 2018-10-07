import { Component, OnInit } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";

import { AddClientComponent } from "../add-client/add-client.component";
import { ViewClientComponent } from "../view-client/view-client.component";
import { EditClientComponent } from "../edit-client/edit-client.component";

import { ClientsServiceService } from "../../../services/clients/clients-service.service";

import { Client } from "../../../models/client";

@Component({
  selector: "moltaka-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent implements OnInit {
  private ELEMENT_DATA;
  public filterValue: string = "";
  public dataSource: MatTableDataSource<Client[]>;
  public viewComponent = ViewClientComponent;
  public editComponent = EditClientComponent;

  constructor(
    private clientService: ClientsServiceService,
    public dialog: MatDialog
  ) {
    this.clientService.ioInit("new client").subscribe(data => {
      this.ELEMENT_DATA.unshift(data.client);
      this.updateTableData();
    });
    this.clientService.ioInit("edit client").subscribe(data => {
      var clientId = data.client["_id"];
      console.log(data);
      this.ELEMENT_DATA.forEach((el, i) => {
        if (el._id === clientId) {
          this.ELEMENT_DATA[i] = data.client;
        }
      });
      this.updateTableData();
    });
  }
  private updateTableData() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  displayedColumns: string[] = [
    "name",
    "phone",
    "mobile",
    "address",
    // "username",
    // "password",
    "idNumber",
    "clientImages",
    "withRatio",
    "edit"
  ];
  ArabicColumns: string[] = [
    "الأسم",
    "رقم التليفون",
    "الموبايل",
    "العنوان",
    // "يوزرنيم",
    // "باسورد",
    "رقم البطاقة",
    "البطاقة",
    "نسبة",
    "تعديل"
  ];

  ngOnInit() {
    this.clientService.getClients().subscribe(res => {
      console.log(res);
      this.ELEMENT_DATA = res.reverse();
      this.updateTableData();
    });

    // console.log(process.env.NODE_ENV);
  }

  openAddClientDialog(): void {
    this.dialog.open(AddClientComponent);
  }
  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase();
  }
}
