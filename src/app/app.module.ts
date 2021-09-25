import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopularComponent } from './_components/popular/popular.component';
import { FavoritesComponent } from './_components/favorites/favorites.component';
import { HeroComponent } from './_components/hero/hero.component';
import { CountryBlockComponent } from './_components/country-block/country-block.component';
import { NoResultsComponent } from './_components/no-results/no-results.component';
import { LoaderComponent } from './_components/loader/loader.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { StatesModule } from './_states/states.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CountUpModule } from 'ngx-countup';
import { RapidInterceptor } from './_interceptors/rapid-api.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './_shared/material/material.module';
import { FilterByDateComponent } from './_components/filter-by-date/filter-by-date.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    FavoritesComponent,
    HeroComponent,
    CountryBlockComponent,
    NoResultsComponent,
    LoaderComponent,
    FilterByDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false
      }
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    StatesModule,
    CountUpModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RapidInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
