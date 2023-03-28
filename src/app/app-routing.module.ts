import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ResultTableComponent } from './result-table/result-table.component';
import { DetailBoxComponent } from './detail-box/detail-box.component';
import { FavoriteTableComponent } from './favorite-table/favorite-table.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent},
  { path: 'search', component: SearchPageComponent},
  { path: 'favorites', component: FavoritePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
