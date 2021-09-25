import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CovidItem } from '../../_models/covid-item.model';
import { Populars, Search } from '../../_states/covid/covid.actions';
import { CovidState } from '../../_states/covid/covid.state';

@Component({
  selector: 'popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  @Select(CovidState.covidList) list$: Observable<CovidItem[]>;
  @Select(CovidState.searchList) searchList$: Observable<CovidItem[]>;
  @Select(CovidState.isLoading) isLoading$: Observable<Boolean>;

  searchInput = new FormControl('');
  searchMode: Boolean = false;

  constructor() { }

  ngOnInit() {
    this.getPopulars();

    this.searchInput.valueChanges.pipe(debounceTime(2000)).subscribe(res => {
      let text = res.trim();
      if(text === '') {
        this.searchMode = false;
      } else if(text.length) {
        this.search(res);
        this.searchMode = true;
      }
    });
  }

  @Dispatch() search = (text: string) => new Search(text);
  @Dispatch() getPopulars = () => new Populars();
}
