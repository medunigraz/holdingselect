import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatAutocompleteModule, MatInputModule } from "@angular/material";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { CovalentCommonModule } from "@covalent/core/common";
import { CovalentLayoutModule } from "@covalent/core/layout";
import { CovalentMediaModule } from "@covalent/core/media";
import { CovalentLoadingModule } from "@covalent/core/loading";
import { CovalentStepsModule } from "@covalent/core/steps";
import { CovalentDynamicFormsModule } from "@covalent/dynamic-forms";

import { HoldingRouting } from "./holding.routing";

import { HoldingService } from "./holding.service";
import { CourseGroupTermService } from "./course-group-term.service";
import { SearchpersonService } from "./searchperson.service";
import { PersonToCampusService} from "./person-to-campus.service";
import { RoomToCampusService} from "./room-to-campus.service";
import { RootComponent } from "./root/root.component";
import { CurrentComponent } from "./current/current.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { PersonComponent } from "./person/person.component";
import { RoomComponent } from "./room/room.component";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { HoldingDetailComponent } from './holding-detail/holding-detail.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatToolbarModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentStepsModule,
    CovalentDynamicFormsModule,
    HoldingRouting
  ],
  declarations: [
    RootComponent,
    CurrentComponent,
    SideNavComponent,
    PersonComponent,
    RoomComponent,
    HoldingDetailComponent
  ],
  providers: [SearchpersonService, HoldingService, CourseGroupTermService,PersonToCampusService,RoomToCampusService, {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}]
})
export class HoldingModule {}
