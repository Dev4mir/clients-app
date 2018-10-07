import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "../components/login/login.component";
import { MainComponentComponent } from "../components/main-component/main-component.component";
import { ClientsComponent } from "../components/clients-module/clients/clients.component";
import { UsersComponent } from "../components/users-module/users/users.component";

import { AuthGuardService } from "../services/auth-guard/auth-guard.service";
import { AdminGuard } from "../services/admin-guard/admin.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: MainComponentComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        redirectTo: "/clients",
        pathMatch: "full"
      },
      {
        path: "clients",
        component: ClientsComponent
      },
      {
        path: "users",
        component: UsersComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule {}
