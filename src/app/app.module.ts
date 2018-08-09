import { BrowserModule, Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";

import { CovalentCommonModule } from "@covalent/core/common";
import { CovalentLayoutModule } from "@covalent/core/layout";
import { CovalentMediaModule } from "@covalent/core/media";
import { CovalentLoadingModule } from "@covalent/core/loading";
import { CovalentStepsModule } from "@covalent/core/steps";
import { CovalentDynamicFormsModule } from "@covalent/dynamic-forms";

import { OAuthModule } from "angular-oauth2-oidc";

import { ApiModule } from "./api/api.module";

import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { AuthGuardService } from "./auth-guard.service";
import { BaseInterceptor, AuthInterceptor } from "./app.interceptors";

import { appRoutes } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentStepsModule,
    CovalentDynamicFormsModule,
    OAuthModule.forRoot(),
    appRoutes
  ],
  providers: [
    Title,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log("Routes: ", JSON.stringify(router.config, undefined, 2));
  }
}
