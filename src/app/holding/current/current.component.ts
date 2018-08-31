import { Component, OnInit, NgZone } from "@angular/core";

import {
  TdLoadingService,
  LoadingMode,
  LoadingType
} from "@covalent/core/loading";

import { HoldingService } from "../holding.service";
import { CourseGroupTermService } from "../course-group-term.service";

@Component({
  selector: "app-holding-current",
  templateUrl: "./current.component.html",
  styleUrls: ["./current.component.scss"]
})
export class CurrentComponent implements OnInit {
  public coursegroupterms$;
  public CurrentRoom;

  constructor(
    private loadingService: TdLoadingService,
    private zone: NgZone,
    private holding: HoldingService,
    private course_group_term: CourseGroupTermService
  ) {
    window["angularComponentRef"] = {

      zone: this.zone,

      componentFn: (value) => this.setCurrentRoom(value),

      component: this

    };
    this.loadingService.create({
      name: "courseGroupTermloadingFullscreen",
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: "accent",

    });
  }

  ngOnInit() {
    this.loadingService.register("courseGroupTermloadingFullscreen");
    const now = new Date();
    this.coursegroupterms$ = this.course_group_term.list({
      start__gte: new Date(
        new Date().setHours(now.getHours() - 1)
      ).toISOString(),
      end__date: now.toISOString().substring(0, 10)
    });
    this.coursegroupterms$.subscribe(() => {
      this.loadingService.resolve("courseGroupTermloadingFullscreen");
    });
  }
  setCurrentRoom(Room: number) {
    console.log("RAUM: " + Room);
    this.coursegroupterms$ = this.course_group_term.list({
      start__gte: "2018-08-13T22:00:00.000Z",
      end__lte: "2018-08-16T07:22:45.765Z"
      , room: Room
    });
    this.coursegroupterms$.subscribe(() => {
      this.loadingService.resolve("courseGroupTermloadingFullscreen");
    });
    this.CurrentRoom = Room;
  };
}
