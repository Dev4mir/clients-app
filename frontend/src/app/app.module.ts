import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material";
import { ClientsServiceService } from "./services/clients/clients-service.service";

import { MaterialImportsModule } from "./material-imports/material-imports.module";

import { RoutingModule } from "./routing/routing.module";

import { AppComponent } from "./app.component";
import { AddClientComponent } from "./components/clients-module/add-client/add-client.component";
import { LoginComponent } from "./components/login/login.component";
import { ClientsComponent } from "./components/clients-module/clients/clients.component";
import { EditClientComponent } from "./components/clients-module/edit-client/edit-client.component";
import { ViewClientComponent } from "./components/clients-module/view-client/view-client.component";
import { AddUserComponent } from "./components/users-module/add-user/add-user.component";
import { MainComponentComponent } from "./components/main-component/main-component.component";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { UsersComponent } from "./components/users-module/users/users.component";
import { ViewUserComponent } from "./components/users-module/view-user/view-user.component";
import { EditUserComponent } from "./components/users-module/edit-user/edit-user.component";

@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    LoginComponent,
    ClientsComponent,
    EditClientComponent,
    ViewClientComponent,
    AddUserComponent,
    MainComponentComponent,
    DataTableComponent,
    UsersComponent,
    ViewUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialImportsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ClientsServiceService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddClientComponent,
    EditClientComponent,
    ViewClientComponent,
    AddUserComponent,
    ViewUserComponent,
    EditUserComponent
  ]
})
export class AppModule {}
