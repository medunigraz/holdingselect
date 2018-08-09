import { Component, OnInit } from "@angular/core";

import { TdMediaService } from "@covalent/core/media";

@Component({
  selector: "app-holdingside-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"]
})
export class SideNavComponent implements OnInit {
  navmenu: Object[] = [
    {
      icon: "looks_one",
      route: "./",
      title: "Aktuell",
      description: "Aktuelle LVs in diesem Raum"
    },
    {
      icon: "looks_two",
      route: "./person",
      title: "Eigene LVs",
      description: "Auswahl aus den eigenen LVs"
    },
    {
      icon: "looks_3",
      route: "./room",
      title: "Andere Räume",
      description: "Asuwhal aus aktuellen LVs von anderen Räumen"
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
