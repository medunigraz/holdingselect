import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { APIClient, Item } from "../api/api.service";
export interface person extends Item {
  id: number | null;
  campusonline: any | null;
  room: any | null;
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
export class PersonToCampusService extends APIClient<person> {
  path = "structure/person/";

  constructor(http: HttpClient) {
    super(http);
  }
}
