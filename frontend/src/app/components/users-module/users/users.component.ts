import { Component, OnInit } from "@angular/core";
import { MatDialog, MatTableDataSource } from "@angular/material";

import { AddUserComponent } from "../add-user/add-user.component";
import { ViewUserComponent } from "../view-user/view-user.component";
import { EditUserComponent } from "../edit-user/edit-user.component";

import { UsersService } from "../../../services/users/users.service";

import { UserDetails } from "../../../models/user";

@Component({
  selector: "moltaka-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  private ELEMENT_DATA;
  public filterValue: string = "";
  public dataSource: MatTableDataSource<UserDetails[]>;
  public viewComponent = ViewUserComponent;
  public editComponent = EditUserComponent;

  constructor(public dialog: MatDialog, private usersService: UsersService) {
    this.usersService.ioInit("new user").subscribe(data => {
      console.log(data);
      this.ELEMENT_DATA.unshift(data.user);
      this.updateTableData();
    });
    this.usersService.ioInit("edit user").subscribe(data => {
      var userId = data.user["_id"];
      console.log(data);
      this.ELEMENT_DATA.forEach((el, i) => {
        if (el._id === userId) {
          this.ELEMENT_DATA[i] = data.user;
        }
      });
      this.updateTableData();
    });
  }
  private updateTableData() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  displayedColumns: string[] = ["name", "username", "edit"];
  ArabicColumns: string[] = ["الأسم", "اسم المسخدم", "تعديل"];

  ngOnInit() {
    this.usersService.getUsers().subscribe(res => {
      console.log(res);
      this.ELEMENT_DATA = res.reverse();
      this.updateTableData();
    });
  }

  openAddUserDialog(): void {
    this.dialog.open(AddUserComponent);
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase();
  }
}
