import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ResultTableComponent } from './result-table/result-table.component';
import { DetailBoxComponent } from './detail-box/detail-box.component';
import { FavoriteTableComponent } from './favorite-table/favorite-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from "@angular/material/tabs";
import { SearchPageComponent } from './search-page/search-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    ResultTableComponent,
    DetailBoxComponent,
    FavoriteTableComponent,
    SearchPageComponent,
    FavoritePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
