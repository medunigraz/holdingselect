// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthConfig } from "angular-oauth2-oidc";

const baseURL = "https://api.medunigraz.at:8088/";

export const environment = {
  production: false,
  apiURL: baseURL + "v1/"
};

export const auth: AuthConfig = {
  clientId: "sCwEzb0n5zUumRMkBItfHYa8VxP6Ml88GYFgFiMu",
  redirectUri: "http://localhost:4200/",
  loginUrl: baseURL + "oauth2/authorize/",
  postLogoutRedirectUri: "",
  scope: "holding",
  resource: "",
  rngUrl: "",
  oidc: false,
  requestAccessToken: true,
  options: null,
  clearHashAfterLogin: true,
  tokenEndpoint: baseURL + "oauth2/token/",
  responseType: "token",
  showDebugInformation: true,
  silentRefreshRedirectUri: "http://localhost:4200/silent-refresh.html",
  silentRefreshMessagePrefix: "",
  silentRefreshShowIFrame: false,
  silentRefreshTimeout: 20000,
  dummyClientSecret: null,
  requireHttps: false,
  strictDiscoveryDocumentValidation: false,
  customQueryParams: null,
  silentRefreshIFrameName: "angular-oauth-oidc-silent-refresh-iframe",
  timeoutFactor: 0.75,
  sessionCheckIntervall: 3000,
  sessionCheckIFrameName: "angular-oauth-oidc-check-session-iframe",
  disableAtHashCheck: false,
  skipSubjectCheck: false
};
