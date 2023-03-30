import { Component, Input } from '@angular/core';
import { TelephoneService } from "../telephone.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'bootstrap';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  searchForm = new FormGroup({
    keyword: new FormControl("", Validators.required),
    distance: new FormControl(null),
    category: new FormControl("default", Validators.required),
    location: new FormControl("", Validators.required),
    autoDetect: new FormControl(false)
  })

  // searchForm.get("autoDetect").value

  public searchResults: any = [];
  public spotifyResult: any = [];

  public detailBool = false;

  public detailRow: any = [];

  public hasGenre: boolean;
  public hasSubGenre: boolean;
  public hasSegment: boolean;
  public hasSubType: boolean;
  public hasType: boolean;
  public hasPriceRange: boolean;

  //public autoDetect = false;

  constructor(private phone: TelephoneService) {}

  testFuncIP(): void
  {
    this.setIP();
  }

  testFunc(): void
  {
    //this.setTicketMasterAuto();

    //this.setTicketMasterManual();

    console.log(this.searchResults);
    console.log(this.searchResults[0]['dates']['start']['localDate']);
    console.log(this.searchResults[0]['dates']['start']['localTime']);
  }

  // clear(): void {
  //   this.searchForm.resetForm();
  // }

  setIP(): void {
    //console.log("Calling setIP");
    TelephoneService.autoLocationOn(this.phone.http);
  }

  unSetIP(): void {
    TelephoneService.autoLocationOff();
  }

  setTicketMasterAuto(): void {
    const keyword: string = this.searchForm.get("keyword").value;
    const distance: number = this.searchForm.get("distance").value;
    const category: string = this.searchForm.get("category").value;

    this.searchForm.get("autoDetect").value;

    TelephoneService.ticketMasterAuto(keyword, distance, category, this.phone.http, this);
    //console.log(this.searchResults);
    //this.searchResults = TelephoneService.ticketMasterJSON["_Embedded"]["events"];
  }

  setTicketMasterManual(): void {
    const keyword: string = this.searchForm.get("keyword").value;
    const distance: number = this.searchForm.get("distance").value;
    const category: string = this.searchForm.get("category").value;
    const location: string = this.searchForm.get("location").value;

    TelephoneService.ticketMasterManual(keyword, distance, category, location, this.phone.http, this);
    //console.log(this.searchResults);
    //this.searchResults = TelephoneService.ticketMasterJSON["_Embedded"]["events"];
  }

  testSetTicketMasterAuto(): void {
    TelephoneService.ticketMasterAuto("concerts", 50, "music", this.phone.http, this);
    //console.log(this.searchResults);
    //this.searchResults = TelephoneService.ticketMasterJSON["_Embedded"]["events"];
  }

  testSetTicketMasterManual(): void {
    TelephoneService.ticketMasterManual("concerts", 50, "music", TelephoneService.ip, this.phone.http, this);
    //console.log(this.searchResults);
    //this.searchResults = TelephoneService.ticketMasterJSON["_Embedded"]["events"];
  }

  showDetails(obj: Element): void
  {
    const index = obj.children[0].innerHTML;
    this.detailRow = this.searchResults[index];
    this.detailBool = true;

    if (this.detailRow['classifications'][0].hasOwnProperty('genre'))
    {
      this.hasGenre = true;
    }
    else
    {
      this.hasGenre = false;
    }

    if (this.detailRow['classifications'][0].hasOwnProperty('subGenre'))
    {
      this.hasSubGenre = true;
    }
    else
    {
      this.hasSubGenre = false;
    }

    if (this.detailRow['classifications'][0].hasOwnProperty('segment'))
    {
      this.hasSegment = true;
    }
    else
    {
      this.hasSegment = false;
    }

    if (this.detailRow['classifications'][0].hasOwnProperty('subType'))
    {
      this.hasSubType = true;
    }
    else
    {
      this.hasSubType = false;
    }

    if (this.detailRow['classifications'][0].hasOwnProperty('type'))
    {
      this.hasType = true;
    }
    else
    {
      this.hasType = false;
    }

    if (this.detailRow.hasOwnProperty('priceRanges'))
    {
      this.hasPriceRange = true;
    }
    else
    {
      this.hasPriceRange = false;
    }
    //console.log(this.detailRow['_embedded']['attractions'][0]);

    this.spotifyResult = [];
    for (let i = 0; i < this.detailRow['_embedded']['attractions'].length; i++)
    {
      const artist = this.detailRow['_embedded']['attractions'][i]['name'];
      //console.log("Artist is " + artist);
      TelephoneService.getSpotify(artist, this.phone.http, this);
    }

    console.log(this.spotifyResult);
  }

  // hideLocation(): void {
  //   this.searchForm.get("location").
  // }
}
