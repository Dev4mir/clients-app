import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "moltaka-view-client",
  templateUrl: "./view-client.component.html",
  styleUrls: ["./view-client.component.scss"]
})
export class ViewClientComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewClientComponent>
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
}
