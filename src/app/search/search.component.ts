import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


import * as fromRoot from '../reducers';
import * as repository from '../actions/repository';
import { Repository } from '../models/repository';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  private searchQuery$: Observable<string>;
  private searchResults$: Observable<Repository[]>;
  private loading$: Observable<boolean>;

  // FormControl
  private searchQueryCtrl = new FormControl();

  constructor(
    private store: Store<fromRoot.State>,
    private searchService: SearchService
  ) {
    this.searchQuery$ = store.select(fromRoot.getSearchQuery);
    this.loading$ = store.select(fromRoot.getSearchLoading);
    this.searchResults$ = store.select(fromRoot.getSearchResults);

    this.searchQueryCtrl.valueChanges
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(searchQuery => {
                          this.store.dispatch(new repository.SearchAction(searchQuery));
                          return this.searchService.search(searchQuery);
                        })
                        .subscribe((resp) => {
                          this.store.dispatch(new repository.SearchCompleteAction(resp));
                        }, () => {
                          // Error Dispatching can be done here
                        });
  }

  ngOnInit() {

  }
}
