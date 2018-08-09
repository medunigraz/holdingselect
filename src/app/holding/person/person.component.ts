import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import {
  TdLoadingService,
  LoadingMode,
  LoadingType
} from "@covalent/core/loading";

import { Observable } from "rxjs";

import { HoldingService } from "../holding.service";
import {
  CourseGroupTermService,
  CourseGroupTerm
} from "../course-group-term.service";

@Component({
  selector: "app-holding-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.scss"]
})
export class PersonComponent implements OnInit {
  public coursegroupterms$: Observable<CourseGroupTerm[]>;

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
        new Date().setHours(now.getHours() - 8)
      ).toISOString(),
      end__date: now.toISOString().substring(0, 10)
    });
    this.coursegroupterms$.subscribe(() => {
      this.loadingService.resolve("courseGroupTermloadingFullscreen");
    });
  }
}
