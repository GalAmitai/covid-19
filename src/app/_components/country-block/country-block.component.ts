import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CovidItem } from '../../_models/covid-item.model';
import { FavoritesService } from '../../_services/favorites.service';
import { FilterByDateComponent } from '../filter-by-date/filter-by-date.component';

@Component({
  selector: 'country-block',
  templateUrl: './country-block.component.html',
  styleUrls: ['./country-block.component.scss']
})
export class CountryBlockComponent implements OnInit {
  
  @Input() covid: CovidItem;
  @Input() star: Boolean = false;
  @Output() favoritesListener = new EventEmitter<boolean>();

  constructor(
    private favoriteService: FavoritesService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
  }

  addFav(covid: CovidItem) {
    this.favoriteService.toggleFavorite(covid);
    this.star = true;
    this.favoritesListener.emit();
  }

  removeFav(covid: CovidItem) {
    this.favoriteService.toggleFavorite(covid);
    this.star = false;
    this.favoritesListener.emit();
  }

  openModal(covid: CovidItem) {
    this.dialog.open(FilterByDateComponent, {
      data: {
        code: covid.code,
        country: covid.country
      }
    });
  }

}
