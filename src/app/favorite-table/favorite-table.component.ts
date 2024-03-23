import { Component } from '@angular/core';
import { TelephoneService } from '../telephone.service';

@Component({
  selector: 'app-favorite-table',
  templateUrl: './favorite-table.component.html',
  styleUrls: ['./favorite-table.component.css']
})
export class FavoriteTableComponent {

  list = TelephoneService.favoriteTable;

  public removeFavorite(name: string)
  {
    TelephoneService.removeFavorite(name);
    this.list = TelephoneService.favoriteTable;
  }

  public testFunc()
  {
    // console.log("Component list is ");
    // console.log(this.list);
    // console.log("Static list is ");
    // console.log(TelephoneService.favoriteTable);
  }
}
