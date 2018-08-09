import { Component, OnInit } from "@angular/core";

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

  constructor(
    private loadingService: TdLoadingService,
    private holding: HoldingService,
    private course_group_term: CourseGroupTermService
  ) {
    this.loadingService.create({
      name: "courseGroupTermloadingFullscreen",
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: "accent"
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
}
