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

import { CovalentCommonModule } from "@covalent/core/common";
import { CovalentLayoutModule } from "@covalent/core/layout";
import { CovalentMediaModule } from "@covalent/core/media";
import { CovalentLoadingModule } from "@covalent/core/loading";
import { CovalentStepsModule } from "@covalent/core/steps";
import { CovalentDynamicFormsModule } from "@covalent/dynamic-forms";

import { HoldingRouting } from "./holding.routing";

import { HoldingService } from "./holding.service";
import { CourseGroupTermService } from "./course-group-term.service";

import { RootComponent } from "./root/root.component";
import { CurrentComponent } from "./current/current.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { PersonComponent } from "./person/person.component";
import { RoomComponent } from "./room/room.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
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
    RoomComponent
  ],
  providers: [HoldingService, CourseGroupTermService]
})
export class HoldingModule {}
