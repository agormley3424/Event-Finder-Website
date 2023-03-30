import { Component, Input } from '@angular/core';
import { TelephoneService } from "../telephone.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  // hideLocation(): void {
  //   this.searchForm.get("location").
  // }
}
