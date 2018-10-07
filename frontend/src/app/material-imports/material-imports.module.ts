import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTableModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatListModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatSnackBarModule,
  MatRadioModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSnackBarModule,
    MatRadioModule
  ]
})
export class MaterialImportsModule {}
