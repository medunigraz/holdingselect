import { Component, OnInit, Input } from '@angular/core';
import { HoldingService, Holding } from "../holding.service";
import { CourseGroupTermService, CourseGroupTerm } from "../course-group-term.service";
import {
  TdLoadingService,
  LoadingMode,
  LoadingType
} from "@covalent/core/loading";
@Component({
  selector: 'app-holding-detail',
  templateUrl: './holding-detail.component.html',
  styleUrls: ['./holding-detail.component.scss']
})
export class HoldingDetailComponent implements OnInit {
  @Input() coursegroupterms: CourseGroupTerm;
  private APIResponse;
  constructor(private holding: HoldingService,
    private loadingService: TdLoadingService) {
    this.loadingService.create({
      name: "courseGroupTermloadingFullscreen",
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: "accent",

    });
  }

  ngOnInit() {

  }
  start_holding(curr_holding: Holding) {
    var registered_holding = {
      created: new Date(),
      online: "hugo",
      start: curr_holding.start,
      end: curr_holding.end,
      course: curr_holding.id,
      info: "HUGO",
      recorder: "Hugo",
      any: "hugo"
    };
    this.holding.create(registered_holding).sent.subscribe(() => {
      console.log("SENDE");
      this.loadingService.register("courseGroupTermloadingFullscreen");
    });
    this.holding.create(registered_holding).headers.subscribe(() => {
      console.log("FERTIG");
      this.loadingService.resolve("courseGroupTermloadingFullscreen");
    });
    console.log("STARTE KURS: " + registered_holding.course)
  };
  stop_holding(curr_holding: Holding) {
    var registered_holding = {
      created: new Date(),
      online: "hugo",
      start: curr_holding.start,
      end: curr_holding.end,
      course: curr_holding.id,
      info: "HUGO",
      recorder: "Hugo",
      any: "hugo"
    };
    this.holding.update(registered_holding).sent.subscribe(() => {
      console.log("SENDE");
      this.loadingService.register("courseGroupTermloadingFullscreen");
    });
    this.holding.update(registered_holding).headers.subscribe(() => {
      console.log("FERTIG");
      this.loadingService.resolve("courseGroupTermloadingFullscreen");
    });
    console.log("STOPPE KURS: " + registered_holding.course);
  };
}
