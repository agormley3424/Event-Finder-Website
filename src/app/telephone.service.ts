import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {
  public static ticketMasterJSON: any = null;
  public static spotifyJSON: any = null;
  public static ip: any = null;



  constructor(public http: HttpClient) {
    
  }

  private static responseToJSON(response: any): any {
    const jsonString: string = JSON.stringify(response);
    const returnJSON: any = JSON.parse(jsonString);

    return returnJSON;
  }

  private static stringToAddress(string: string)
  {
    let returnAddress = "";

    for (let i = 0; i < string.length; i++){
      if (string[i] === ' '){
        returnAddress += '+';
      }
      else
      {
        returnAddress += string[i];
      }
    }

    return returnAddress;
  }

  public static autoLocationOn(http: HttpClient): any {
    http.get("https://www.ipinfo.io?token=721bebb667bf09")
    .subscribe((response) => {
      //console.log(response);
      //console.log(Object.values(response)[5]);
      //this.ip = Object.values(response)[5];
      //JSON.stringify(response);
      console.log(TelephoneService.responseToJSON(response)["loc"]);

      TelephoneService.ip = TelephoneService.responseToJSON(response)["loc"];
    })
  }

  public static autoLocationOff(): void {
    TelephoneService.ip = null;
  }

  public static ticketMasterAuto(keyword: string, distance: number, category: string, http: HttpClient): void {
    if (TelephoneService.ip == null)
    {
      console.log("TelephoneService ticketMasterAuto Error: No ip is defined");
    }

    let stringDest= "https://hw8-380107.wl.r.appspot.com/ticketMaster?";
    stringDest += "keyword=" + keyword;
    stringDest += "&distance=" + distance.toString();
    stringDest += "&category=" + category;
    stringDest += "&location=" + TelephoneService.ip;
    stringDest += "&locationSearch=false";

    http.get(stringDest)
    .subscribe((response) => {
      console.log(TelephoneService.responseToJSON(response));
      TelephoneService.ticketMasterJSON = TelephoneService.responseToJSON(response);
    })
  }

  public static ticketMasterManual(keyword: string, distance: number, category: string, location: string, http: HttpClient): void {
    let stringDest= "https://hw8-380107.wl.r.appspot.com/ticketMaster?";
    stringDest += "keyword=" + keyword;
    stringDest += "&distance=" + distance.toString();
    stringDest += "&category=" + category;
    stringDest += "&location=" + this.stringToAddress(location);
    stringDest += "&locationSearch=true";

    http.get(stringDest)
    .subscribe((response) => {
      console.log(TelephoneService.responseToJSON(response));
      TelephoneService.ticketMasterJSON = TelephoneService.responseToJSON(response);
    })
  }

  public static clearTicketMaster()
  {
    TelephoneService.ticketMasterJSON = null;
  }
}
