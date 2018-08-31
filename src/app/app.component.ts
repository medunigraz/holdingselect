import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { MatIconRegistry } from "@angular/material/icon";

import { TdMediaService } from "@covalent/core/media";

import { OAuthService, NullValidationHandler } from "angular-oauth2-oidc";

import { auth } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public title = "holdingselect";
  public copyright = new Date();
  public name = "HoldingSelect";

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private oauthService: OAuthService,
    private router: Router,
    public media: TdMediaService
  ) {
    this.iconRegistry.addSvgIconInNamespace(
      "mug",
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost:4200/assets/icons/logo.svg")
    );
    this.oauthService.configure(auth);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.tryLogin({
      onTokenReceived: info => {
        this.router.navigate([info.state]);
      }
    });
  }
}
