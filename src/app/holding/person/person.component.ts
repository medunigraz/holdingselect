import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  TdLoadingService,
  LoadingMode,
  LoadingType
} from "@covalent/core/loading";
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { HoldingService } from "../holding.service";
import { SearchpersonService, suggestion } from "../searchperson.service";
import { PersonToCampusService, person } from "../person-to-campus.service";
import { RoomToCampusService, room } from "../room-to-campus.service";
import { CourseGroupTermService, CourseGroupTerm } from "../course-group-term.service";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
interface ApiFilter {
  start__gte: string;
  end__lte: string;
  person: number | null;
  room: number | null;
};
@Component({
  selector: "app-holding-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.scss"],
})

export class PersonComponent implements OnInit {
  public coursegroupterms$: Observable<CourseGroupTerm[]>;
  public suggestionobs$: Observable<suggestion[]>;
  private searchTerms = new Subject<string>();
  private HoldingFilter;

  constructor(
    private loadingService: TdLoadingService,
    private holding: HoldingService,
    private course_group_term: CourseGroupTermService,
    private suggestion_service: SearchpersonService,
    private person_service: PersonToCampusService,
    private room_service: RoomToCampusService
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
    this.HoldingFilter = {};
    this.HoldingFilter['start__gte'] = new Date(new Date().setHours(now.getHours() - 8)).toISOString();
    this.HoldingFilter['end__lte'] = now.toISOString();
    this.coursegroupterms$ = this.course_group_term.list(this.HoldingFilter);
    this.coursegroupterms$.subscribe(() => {
      this.loadingService.resolve("courseGroupTermloadingFullscreen");
    });
    this.suggestionobs$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.suggestion_service.list({ q: term })),
    );
  }
  suggest(partial_name: string) {
    if (partial_name == '') {
      delete this.HoldingFilter['room'];
      delete this.HoldingFilter['person'];
      this.coursegroupterms$ = this.course_group_term.list(this.HoldingFilter)
    } else {
      this.searchTerms.next(partial_name);
    };
  };

  Set_Pers_Filter(eingabe: any) {
    console.log(new URLSearchParams(document.location.search).get("curr_room"));
    if (eingabe.ctype == "geo.room") {
      delete this.HoldingFilter['person'];
      const myObserver = {
        next: x => this.HoldingFilter['room'] = x.properties.campusonline.id,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => this.coursegroupterms$ = this.course_group_term.list(this.HoldingFilter),
      };
      this.room_service.get(eingabe.id).subscribe(myObserver);
    } else if (eingabe.ctype == "structure.person") {
      delete this.HoldingFilter['room'];
      const myObserver = {
        next: x => this.HoldingFilter['person'] = x.campusonline.id,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => this.coursegroupterms$ = this.course_group_term.list(this.HoldingFilter),
      };
      this.person_service.get(eingabe.id).subscribe(myObserver);
    }
  };

  displayFilter(rawperson: any): string | undefined {
    return rawperson ? rawperson.presentation : undefined;
  };
  setBeginDate(eingabe: MatDatepickerInputEvent<Date>) {
    this.HoldingFilter['start__gte'] = eingabe.value.toISOString();
    this.coursegroupterms$ = this.course_group_term.list(this.HoldingFilter);

  };
  setEndDate(eingabe: MatDatepickerInputEvent<Date>) {
    this.HoldingFilter['end__lte'] = (new Date(eingabe.value.setDate(eingabe.value.getDate() + 1))).toISOString();
    this.coursegroupterms$ = this.course_group_term.list(this.HoldingFilter);
  };

}
