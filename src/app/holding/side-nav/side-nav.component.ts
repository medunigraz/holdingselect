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
      icon: "event_available",
      route: "./",
      title: "Aktuell",
      description: "Aktuelle LVs in diesem Raum"
    },
    {
      icon: "search",
      route: "./person",
      title: "Suche",
      description: "Suche nach LVs anderer Personen"
    },
    {
      icon: "play_circle_filled",
      route: "./room",
      title: "Laufend",
      description: "laufende LVs"
    }
  ];

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
