import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { APIClient, Item } from "../api/api.service";
export interface room extends Item {
  id: number | null;
  type: string | null;
  geometry: any | null;
  properties: any | null;
  canonical: string | null;
  created: string | null;
  modified: string | null;
  center: any | null;
  marker: any | null;
  name: string | null;
  level: number | null;
  category: string | null;
  organization: string | null;
}
@Injectable()
export class RoomToCampusService extends APIClient<room> {
  path = "geo/rooms/";

  constructor(http: HttpClient) {
    super(http);
  }
}
