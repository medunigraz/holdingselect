import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RootComponent } from "./root/root.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { CurrentComponent } from "./current/current.component";
import { PersonComponent } from "./person/person.component";
import { RoomComponent } from "./room/room.component";

const holdingRoutes: Routes = [
  {
    path: "",
    component: RootComponent,
    children: [
      {
        path: "",
        component: CurrentComponent
      },
      {
        path: "person",
        component: PersonComponent
      },
      {
        path: "room",
        component: RoomComponent
      }
    ]
  },
  {
    path: "",
    component: SideNavComponent,
    outlet: "sidenav"
  }
];

@NgModule({
  imports: [RouterModule.forChild(holdingRoutes)],
  exports: [RouterModule]
})
export class HoldingRouting {}
