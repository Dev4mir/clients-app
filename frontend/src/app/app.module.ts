import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ClientsServiceService } from "./services/clients/clients-service.service";

import { MaterialImportsModule } from "./material-imports/material-imports.module";

import { RoutingModule } from "./routing/routing.module";

import { AppComponent } from "./app.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { LoginComponent } from "./components/login/login.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { ViewClientComponent } from "./components/view-client/view-client.component";
import { AddUserComponent } from "./components/add-user/add-user.component";

@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    LoginComponent,
    ClientsComponent,
    EditClientComponent,
    ViewClientComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialImportsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ClientsServiceService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddClientComponent,
    EditClientComponent,
    ViewClientComponent,
    AddUserComponent
  ]
})
export class AppModule {}
