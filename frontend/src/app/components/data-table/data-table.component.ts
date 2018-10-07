import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  ViewChild
} from "@angular/core";
import { MatDialog, MatPaginator } from "@angular/material";

@Component({
  selector: "moltaka-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent implements OnChanges {
  @Input()
  dataSource;
  @Input()
  displayedColumns: string[];
  @Input()
  ArabicColumns: string[];
  @Input()
  filterValue: string;
  @Input()
  viewComponent;
  @Input()
  editComponent;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (!changedProp.firstChange) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.filterValue.trim().toLowerCase();
      }
    }
  }

  openEdit($elem) {
    this.dialog.open(this.editComponent, { data: $elem });
  }

  openInfo($elem) {
    this.dialog.open(this.viewComponent, { data: $elem });
  }
}
