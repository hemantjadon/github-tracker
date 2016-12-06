import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

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
                        .subscribe(searchQuery => this.search(searchQuery));
  }

  ngOnInit() {

  }

  search(query: string) {
    this.store.dispatch(new repository.SearchAction(query));
    this.searchService.search(query)
                      .subscribe((resp) => {
                        this.store.dispatch(new repository.SearchCompleteAction(resp));
                      }, (err) => {
                        // Error dispatching can be done here.
                      });
  }
}
