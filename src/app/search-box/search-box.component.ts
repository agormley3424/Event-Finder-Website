import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TelephoneService } from "../telephone.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public albums: any = [];

  public detailBool = false;

  public detailRow: any = [];

  // public hasGenre: boolean;
  // public hasSubGenre: boolean;
  // public hasSegment: boolean;
  // public hasSubType: boolean;
  // public hasType: boolean;
  // public hasPriceRange: boolean;
  // public hasBoxOffice: boolean;
  // public hasGeneralInfo: boolean;
  // public hasAttractions: boolean;
  public rowName;
  public localDate;
  public rowAttractions = [];
  public venueName;
  public rowGenre;
  public rowSegment;
  public rowSubGenre;
  public rowType;
  public rowSubType;
  public rowPriceMin;
  public rowPriceMax;
  public venueAddress;
  public venuePhone;
  public venueHours;
  public venueRules;
  public venueChildRules;
  public ticketStatus;
  public rowURL;
  public rowSeatmap;
  public hideStuff = true;

  public showHoursDetail = false;
  public showGeneralDetail = false;
  public showChildDetail = false;

  public albumsLoaded = false;

  public locationSearch = true;

  coordinates: {
    lat: number;
    lng: number;
  }

  //public autoDetect = false;

  constructor(private phone: TelephoneService, private modalService: NgbModal) {}

  testFuncIP(): void
  {
    this.setIP();
  }

  clearFunc()
  {
    this.hideStuff = true;
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  testFunc(): void
  {
    //this.setTicketMasterAuto();

    //this.setTicketMasterManual();

    console.log(this.searchResults);
    console.log(this.searchResults[0].dates.start.localDate);
    console.log(this.searchResults[0].dates.start.localTime);
  }

  // clear(): void {
  //   this.searchForm.resetForm();
  // }

  setIP(): void {
    //console.log("Calling setIP");
    TelephoneService.autoLocationOn(this.phone.http);
    this.locationSearch = false;
  }

  unSetIP(): void {
    TelephoneService.autoLocationOff();
    this.locationSearch = true;
  }

  @ViewChild('keywordBox') keywordVar:ElementRef;
  @ViewChild('locationBox') locationVar:ElementRef;

  setTicketMasterAuto(): void {
    if (!this.keywordVar.nativeElement.checkValidity())
    {
      this.keywordVar.nativeElement.reportValidity();
  
      return;
    }
    else if (this.locationSearch)
    {
      if (!this.locationVar.nativeElement.checkValidity())
      {
        this.locationVar.nativeElement.reportValidity();
    
        return;
      }
    }

    this.hideStuff = false;
    const keyword: string = this.searchForm.get("keyword").value;
    const distance: number = this.searchForm.get("distance").value;
    const category: string = this.searchForm.get("category").value;

    this.searchForm.get("autoDetect").value;

    TelephoneService.ticketMasterAuto(keyword, distance, category, this.phone.http, this);
    //console.log(this.searchResults);
    //this.searchResults = TelephoneService.ticketMasterJSON["_Embedded"]["events"];
  }

  setTicketMasterManual(): void {
    if (!this.keywordVar.nativeElement.checkValidity())
    {
      this.keywordVar.nativeElement.reportValidity();
  
      return;
    }
    else if (this.locationSearch)
    {
      if (!this.locationVar.nativeElement.checkValidity())
      {
        this.locationVar.nativeElement.reportValidity();
    
        return;
      }
    }

    this.hideStuff = false;
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

    try {
      this.rowName = this.detailRow.name;

      if (this.rowName == undefined || this.rowName == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowName = "Event Name Unavailable";
    }

    try {
      this.localDate = this.detailRow.dates.start.localDate;

      if (this.localDate == undefined || this.localDate == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.localDate = "Date Unavailable";
    }

    try {
      this.rowAttractions = this.detailRow._embedded.attractions;

      if (this.rowAttractions == undefined)
      {
        throw new TypeError();
      }

    } catch (typeError)
    {
      this.rowAttractions = [];
    }

    try {
      this.venueName = this.detailRow._embedded.venues[0].name;

      if (this.venueName == undefined || this.venueName == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.venueName = "Venue Name Unavailable";
    }

    try {
      this.rowGenre = this.detailRow.classifications[0].genre.name;

      if (this.rowGenre == undefined || this.rowGenre == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowGenre = "Undefined";
    }

    try {
      this.rowSegment = this.detailRow.classifications[0].segment.name;

      if (this.rowSegment == undefined || this.rowSegment == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowSegment = "Undefined";
    }

    try {
      this.rowSubGenre = this.detailRow.classifications[0].subGenre.name;

      if (this.rowSubGenre == undefined || this.rowSubGenre == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowSubGenre = "Undefined";
    }

    try {
      this.rowType = this.detailRow.classifications[0].type.name;

      if (this.rowType == undefined || this.rowType == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowType = "Undefined";
    }

    try {
      this.rowSubType = this.detailRow.classifications[0].subType.name;

      if (this.rowSubType == undefined || this.rowSubType == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowSubType = "Undefined";
    }

    try {
      this.rowPriceMin = this.detailRow.priceRanges[0].min;

      if (this.rowPriceMin == undefined || this.rowPriceMin == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowPriceMin = "Minimum Price Unavailable";
    }

    try {
      this.rowPriceMax = this.detailRow.priceRanges[0].max;

      if (this.rowPriceMax == undefined || this.rowPriceMax == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowPriceMax = "Maximum Price Unavailable";
    }

    try {
      this.venueAddress = this.detailRow._embedded.venues[0].address.line1;

      if (this.venueAddress == undefined || this.venueAddress == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.venueAddress = "Venue Address Unavailable";
    }

    try {
      this.venuePhone = this.detailRow._embedded.venues[0].boxOfficeInfo.phoneNumberDetail;

      if (this.venuePhone == undefined || this.venuePhone == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.venuePhone = "Venue Phone Number Unavailable";
    }

    try {
      this.venueHours = this.detailRow._embedded.venues[0].boxOfficeInfo.openHoursDetail;

      if (this.venueHours == undefined || this.venueHours == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.venueHours = "Venue Hours Unavailable";
    }

    try {
      this.venueRules = this.detailRow._embedded.venues[0].generalInfo.generalRule;

      if (this.venueRules == undefined || this.venueRules == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.venueRules = "Venue General Rules Unavailable";
    }

    try {
      this.venueChildRules = this.detailRow._embedded.venues[0].generalInfo.childRule

      if (this.venueChildRules == undefined || this.venueChildRules == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.venueChildRules = "Venue Child Rules Unavailable";
    }

    try {
      this.ticketStatus = this.detailRow.dates.status.code;

      if (this.ticketStatus == undefined || this.ticketStatus == "Undefined") 
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.ticketStatus = "Ticket Status Unavailable";
    }

    try {
      this.rowURL = this.detailRow.url;

      if (this.rowURL == undefined || this.rowURL == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowURL = "URL Unavailable";
    }

    try {
      this.rowSeatmap = this.detailRow.seatmap.staticUrl;

      if (this.rowSeatmap == undefined || this.rowSeatmap == "Undefined")
      {
        throw new TypeError();
      }
    } catch (typeError)
    {
      this.rowSeatmap = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    }

    console.log("Detailed Row: ");
    console.log(this.detailRow);

    this.coordinates = {lat: parseFloat(TelephoneService.ticketMasterJSON._embedded.events[0]._embedded.venues[0].location.latitude),
    lng: parseFloat(TelephoneService.ticketMasterJSON._embedded.events[0]._embedded.venues[0].location.longitude)};

    // if (this.detailRow.classifications[0].hasOwnProperty('genre'))
    // {
    //   this.hasGenre = true;
    // }
    // else
    // {
    //   this.hasGenre = false;
    // }

    // if (this.detailRow.classifications[0].hasOwnProperty('subGenre'))
    // {
    //   this.hasSubGenre = true;
    // }
    // else
    // {
    //   this.hasSubGenre = false;
    // }

    // if (this.detailRow.classifications[0].hasOwnProperty('segment'))
    // {
    //   this.hasSegment = true;
    // }
    // else
    // {
    //   this.hasSegment = false;
    // }

    // if (this.detailRow.classifications[0].hasOwnProperty('subType'))
    // {
    //   this.hasSubType = true;
    // }
    // else
    // {
    //   this.hasSubType = false;
    // }

    // if (this.detailRow.classifications[0].hasOwnProperty('type'))
    // {
    //   this.hasType = true;
    // }
    // else
    // {
    //   this.hasType = false;
    // }

    // if (this.detailRow.hasOwnProperty('priceRanges'))
    // {
    //   this.hasPriceRange = true;
    // }
    // else
    // {
    //   this.hasPriceRange = false;
    // }
    //console.log(this.detailRow._embedded.attractions[0]);
    // console.log("detail row: ");
    // console.log(this.detailRow);
    // console.log(this.detailRow._embedded.venues[0]);

    // if (this.detailRow._embedded.venues[0].hasOwnProperty('boxOfficeInfo'))
    // {
    //   this.hasBoxOffice = true;
    // }
    // else
    // {
    //   this.hasBoxOffice = false;
    // }

    // if (this.detailRow._embedded.venues[0].hasOwnProperty('generalInfo'))
    // {
    //   this.hasGeneralInfo = true;
    // }
    // else
    // {
    //   this.hasGeneralInfo = false;
    // }

    // if (this.detailRow._embedded.hasOwnProperty('attractions'))
    // {
    //   this.hasAttractions = true;
    // }
    // else
    // {
    //   this.hasAttractions = false;
    // }

    this.spotifyResult = [];
    this.albumsLoaded = false;

    // if (this.hasAttractions)
    // {
      for (let i = 0; i < this.rowAttractions.length; i++)
      {
        const artist = this.rowAttractions[i].name;
        //console.log("Artist is " + artist);
        TelephoneService.getSpotify(artist, this.phone.http, this);
      }
    //}
    // else
    // {
    //   const artist = this.detailRow.info;
    //   TelephoneService.getSpotify(artist, this.phone.http, this);
    // }


    console.log("Spotify artist array: ");
    console.log(this.spotifyResult);

    setTimeout(() => {
      this.getAlbums();
    }, 500);
    

    // this.lat = parseFloat(TelephoneService.ticketMasterJSON._embedded.events[0]._embedded.venues[0].location.latitude);
    // this.long = parseFloat(TelephoneService.ticketMasterJSON._embedded.events[0]._embedded.venues[0].location.longitude);
  }

  getAlbums()
  {
    this.albums = [];

    for (let i = 0; i < this.spotifyResult.length; i++)
    {
      TelephoneService.getAlbums(this.spotifyResult[i].id, this.phone.http, this);
    }

    this.albumsLoaded = true;

    console.log("Albums array: ");
    console.log(this.albums);
  }

  flipHoursDetail()
  {
    this.showHoursDetail = !this.showHoursDetail;
  }

  flipGeneralDetail()
  {
    this.showGeneralDetail = !this.showGeneralDetail;
  }

  flipChildDetail()
  {
    this.showChildDetail = !this.showChildDetail;
  }

  addFavorite(): void
  {
    const date = this.localDate;
    const event = this.rowName;

    let category = "";

    if (this.rowGenre != "Undefined")
    {
      category += this.rowGenre + ' | ';
    }
      

    if (this.rowSegment != "Undefined")
    {
      category += this.rowSegment + ' | ';
    }
    

    if (this.rowSubGenre != "Undefined")
    {
      category += this.rowSubGenre + ' | ';
    }
    

    if (this.rowType != "Undefined")
    {
      category += this.rowType + ' | ';
    }
    
    if (this.rowSubType != "Undefined")
    {
      category += this.rowSubType;
    }

    const venue = this.venueName;

    TelephoneService.addFavorite(date, event, category, venue);
  }

  removeFavorite(): void
  {
    TelephoneService.removeFavorite(this.rowName);
  }

  // hideLocation(): void {
  //   this.searchForm.get("location").
  // }
}

