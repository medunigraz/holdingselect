import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";

import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "holding",
    loadChildren: "./holding/holding.module#HoldingModule",
    canLoad: [AuthGuardService]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

export const appRoutes: any = RouterModule.forRoot(routes, {
  enableTracing: false
});
