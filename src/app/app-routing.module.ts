import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './_components/favorites/favorites.component';
import { PopularComponent } from './_components/popular/popular.component';

const routes: Routes = [
  {
    path: '',
    component: PopularComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
