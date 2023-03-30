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
  private static ip: any = null;



  constructor(public http: HttpClient) {
    
  }

  private static responseToJSON(response: any): any {
    const jsonString: string = JSON.stringify(response);
    const returnJSON: any = JSON.parse(jsonString);

    return returnJSON;
  }

  public static autoLocationOn(http: HttpClient): any {
    http.get("https://www.ipinfo.io?token=721bebb667bf09")
    .subscribe((response) => {
      //console.log(response);
      //console.log(Object.values(response)[5]);
      //this.ip = Object.values(response)[5];
      //JSON.stringify(response);
      //console.log(TelephoneService.responseToJSON(response)["loc"]);

      this.ip = TelephoneService.responseToJSON(response)["loc"];
    })
  }

  public static autoLocationOff(): void {
    this.ip = null;
  }
}
