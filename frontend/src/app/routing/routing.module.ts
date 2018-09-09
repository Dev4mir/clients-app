import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "../components/login/login.component";
import { ClientsComponent } from "../components/clients/clients.component";

import { AuthGuardService } from "../services/auth-guard/auth-guard.service";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: ClientsComponent,
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule {}
