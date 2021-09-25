import { Injectable } from '@angular/core';
import { CovidItem } from '../_models/covid-item.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

    private add(covid: CovidItem) {
      const ls = window.localStorage.getItem('covid-fav');
      if(!ls && ls.length) {
        window.localStorage.setItem('covid-fav', JSON.stringify([covid]));
      } else {
        let favorites = this.getFavorites();
        favorites.push(new CovidItem(covid));
        window.localStorage.setItem('covid-fav', JSON.stringify(favorites));
      }
    }

    private remove(covid: CovidItem) {
      const ls = window.localStorage.getItem('covid-fav');
      if(!ls && ls.length) return;
      let favorites = this.getFavorites();
      favorites = favorites.filter(e => e.country !== covid.country);
      window.localStorage.setItem('covid-fav', JSON.stringify(favorites));
    }

    toggleFavorite(covid: CovidItem) {
      const ls = window.localStorage.getItem('covid-fav');
      if(!ls && ls.length) this.add(covid);
      else {
        this.updateList(covid);
      }
    }

    getFavorites(): CovidItem[] {
      const ls = window.localStorage.getItem('covid-fav');
      if(!ls && ls.length) return [];
      return JSON.parse(ls);
    }

    updateList(covid: CovidItem) {
      let favorites = this.getFavorites();
      if(favorites.some(e=> e.country === covid.country)) {
        this.remove(covid);
      } else {
        this.add(covid);
      }
    }
}
