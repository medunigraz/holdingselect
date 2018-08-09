import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild,
  CanLoad
} from "@angular/router";

import { OAuthService, NullValidationHandler } from "angular-oauth2-oidc";

@Injectable()
export class AuthGuardService
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(private oauthService: OAuthService, private router: Router) {}

  isAuthenticated() {
    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initImplicitFlow(this.router.url);
      return false;
    }
    return true;
  }
  canActivate() {
    return this.isAuthenticated();
  }
  canActivateChild() {
    return this.isAuthenticated();
  }
  canLoad() {
    return this.isAuthenticated();
  }
}
