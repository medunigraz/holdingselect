import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { APIClient, Item } from "../api/api.service";
export interface suggestion extends Item {
  id: number | null;
  ctype: string | null;
  level_id: string | null;
  room_id: number | null;
  presentation: string | null;
}
@Injectable()
export class SearchpersonService extends APIClient<suggestion> {
  path = "api/autocomplete/";

  constructor(http: HttpClient) {
    super(http);
  }
}
