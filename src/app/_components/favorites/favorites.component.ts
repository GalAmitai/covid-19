import { Component, OnInit } from '@angular/core';
import { CovidItem } from '../../_models/covid-item.model';
import { FavoritesService } from '../../_services/favorites.service';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  isLoading: boolean = true;
  favoritesList: CovidItem[] = [];

  constructor(private favoriteService: FavoritesService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const favorites = this.favoriteService.getFavorites();
    this.favoritesList = favorites?.map(e => new CovidItem(e));
    this.isLoading = false;
  }
  refresh() {
    this.isLoading = true;
    this.getData();
  }

}
