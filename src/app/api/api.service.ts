import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpProgressEvent,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpResponse
} from "@angular/common/http";

import { Observable, empty } from "rxjs";
import {
  map,
  reduce,
  concatMap,
  expand,
  filter,
  toArray,
  share,
  tap
} from "rxjs/operators";

import { environment } from "../../environments/environment";

export interface ListOptions {
  size?: number | string;
  offset?: number | string;
  filters?: any;
}

type Id = number | string;

export interface Item {
  id?: Id;
}

interface PaginatedResponse<T extends Item> {
  count: number;
  next: string | null;
  previous: string | number | null;
  results: T[];
}

interface EventResponse<T> {
  sent: Observable<HttpSentEvent>;
  upload: Observable<HttpProgressEvent>;
  headers: Observable<HttpHeaderResponse>;
  download: Observable<HttpProgressEvent>;
  response: Observable<HttpResponse<T>>;
}

export interface ListResult<T> {
  items: T[];
  total: number;
}

@Injectable()
export class DownloadService {
  constructor(protected http: HttpClient) {}

  download(url: string) {
    const req = new HttpRequest<Blob>("GET", url, {
      reportProgress: true,
      responseType: "blob"
    });
    const stream = this.http.request<Blob>(req).pipe(share());
    const endpoints: EventResponse<Blob> = {
      sent: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.Sent;
        })
      ) as Observable<HttpSentEvent>,
      upload: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.UploadProgress;
        })
      ) as Observable<HttpProgressEvent>,
      headers: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.ResponseHeader;
        })
      ) as Observable<HttpHeaderResponse>,
      download: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.DownloadProgress;
        })
      ) as Observable<HttpProgressEvent>,
      response: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.Response;
        })
      ) as Observable<HttpResponse<Blob>>
    };
    return endpoints;
  }
}

export abstract class APIClient<T extends Item> {
  protected path: string;

  constructor(protected http: HttpClient) {}

  private url(): string {
    return `${environment.apiURL}${this.path}`;
  }

  list(filters: any): Observable<T[]> {
    const fetch = (url: string, options?: ListOptions) => {
      const args = {};
      if (options) {
        let params = new HttpParams();
        if (options.size) {
          params = params.append("limit", String(options.size));
        }
        if (options.offset) {
          params = params.append("offset", String(options.offset));
        }
        if (options.filters) {
          for (const key of Object.keys(options.filters)) {
            params = params.append(key, String(options.filters[key]));
          }
        }
        args["params"] = params;
      }
      return this.http.get<PaginatedResponse<T>>(url, args).pipe(
        tap(val => console.log("before map", val)),
        map(page => ({
          results: page.results,
          next: page.next ? page.next : null
        })),
        tap(val => console.log("after map", val))
      );
    };

    return fetch(this.url(), { filters: filters }).pipe(
      tap(val => console.log("before expand", val)),
      expand(({ next }) => (next ? fetch(next) : empty())),
      tap(val => console.log("before concatMap", val)),
      concatMap(({ results }) => results),
      tap(val => console.log("before toArray", val)),
      toArray(),
      tap(val => console.log("finally", val)),
      share()
    );
  }

  get(id: string | number) {
    return this.http.get<T>(`${this.url()}${id}/`);
  }

  create(item: T) {
    const req = new HttpRequest<T>("POST", this.url(), item, {
      reportProgress: true
    });
    const stream = this.http.request<T>(req).pipe(share());
    const endpoints: EventResponse<T> = {
      sent: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.Sent;
        })
      ) as Observable<HttpSentEvent>,
      upload: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.UploadProgress;
        })
      ) as Observable<HttpProgressEvent>,
      headers: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.ResponseHeader;
        })
      ) as Observable<HttpHeaderResponse>,
      download: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.DownloadProgress;
        })
      ) as Observable<HttpProgressEvent>,
      response: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.Response;
        })
      ) as Observable<HttpResponse<T>>
    };
    return endpoints;
  }

  update(item: T) {
    const req = new HttpRequest<T>("PUT", `${this.url()}${item.id}/`, item, {
      reportProgress: true
    });
    const stream = this.http.request<T>(req).pipe(share());
    const endpoints: EventResponse<T> = {
      sent: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.Sent;
        })
      ) as Observable<HttpSentEvent>,
      upload: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.UploadProgress;
        })
      ) as Observable<HttpProgressEvent>,
      headers: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.ResponseHeader;
        })
      ) as Observable<HttpHeaderResponse>,
      download: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.DownloadProgress;
        })
      ) as Observable<HttpProgressEvent>,
      response: stream.pipe(
        filter(event => {
          return event.type === HttpEventType.Response;
        })
      ) as Observable<HttpResponse<T>>
    };
    return endpoints;
  }

  delete(item: T) {
    return this.http.delete(`${this.url()}${item.id}/`);
  }
}
