import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "moltaka-view-user",
  templateUrl: "./view-user.component.html",
  styleUrls: ["./view-user.component.scss"]
})
export class ViewUserComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewUserComponent>
  ) {}

  ngOnInit() {}
}
