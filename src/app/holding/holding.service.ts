import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { APIClient, Item } from "../api/api.service";

export interface Holding extends Item {
  created: Date;
  online: string;
  info: any;
  recorder: any;
  metadata?;
  any;
  start?: string;
  end?: string;
  course?: any | null;
  presenter?: any | null;
}

@Injectable()
export class HoldingService extends APIClient<Holding> {
  path = "video/recording/";

  constructor(http: HttpClient) {
    super(http);
  }
}
