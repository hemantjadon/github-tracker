import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Repository } from '../models/repository';

@Injectable()
export class SearchService {
  private searchUrl = `https://api.github.com/search/repositories`

  constructor(
    private http: Http
  ) { }

  public search(query: string = ''): Observable<Repository[]> {
    let search = new URLSearchParams();
    search.set("q", query);
    return this.http.get(`${this.searchUrl}`,{ search })
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) : Repository[]{
    let jsonResp = res.json();
    return jsonResp.items;
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
