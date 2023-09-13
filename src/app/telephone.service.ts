import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SearchBoxComponent } from "./search-box/search-box.component";


@Injectable({
  providedIn: 'root'
})
export class TelephoneService {
  public static ticketMasterJSON: any = null;
  public static spotifyJSON: any = null;
  public static ip: any = null;

  public favoriteRow: {
    number: number;
    date: string;
    event: string;
    category: string;
    venue: string;
  };


  public static initiate()
  {
    console.log("initiation called");
    this.favoriteTable = JSON.parse(localStorage.getItem("favoriteTable"));

    if (this.favoriteTable == null)
    {
      this.favoriteTable = [];
    }

    console.log("this.favoriteTable");

    console.log("favorite table initiated to");
    console.log(this.favoriteTable);
  }

  public static favoriteTable = [];

  public static addFavorite(date: string, event: string, category: string, venue: string): void
  {
    const id = this.favoriteTable.length + 1;
    const newRow = {id, date, event, category, venue};
    this.favoriteTable.push(newRow);

    localStorage.setItem("favoriteTable", JSON.stringify(this.favoriteTable));
  }

  public static removeFavoriteNum(id: number)
  {
    this.favoriteTable.splice(id - 1, 1);

    localStorage.setItem("favoriteTable", JSON.stringify(this.favoriteTable));
  }

  public static removeFavorite(event: string)
  {
    for (let i = 0; i < this.favoriteTable.length; i++)
    {
      if (this.favoriteTable[i]['event'] == event)
      {
        this.favoriteTable.splice(i, 1);
        break;
      }
    }

    localStorage.setItem("favoriteTable", JSON.stringify(this.favoriteTable));
  }



  constructor(public http: HttpClient) {
    TelephoneService.initiate();
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
      console.log(TelephoneService.responseToJSON(response).loc);

      TelephoneService.ip = TelephoneService.responseToJSON(response).loc;
      console.log(TelephoneService.ip);
    })
  }

  public static autoLocationOff(): void {
    TelephoneService.ip = null;
  }

  public static ticketMasterAuto(keyword: string, distance: number, category: string, http: HttpClient, caller: SearchBoxComponent): void {
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

    console.log("API Call: " + stringDest);

    http.get(stringDest)
    .subscribe((response) => {
      //console.log(TelephoneService.responseToJSON(response));
      TelephoneService.ticketMasterJSON = TelephoneService.responseToJSON(response);
      caller.searchResults = TelephoneService.ticketMasterJSON._embedded.events;
      console.log(caller.searchResults);
    })
  }

  public static ticketMasterManual(keyword: string, distance: number, category: string, location: string, http: HttpClient,  caller: SearchBoxComponent): void {
    let stringDest= "https://hw8-380107.wl.r.appspot.com/ticketMaster?";
    stringDest += "keyword=" + keyword;
    stringDest += "&distance=" + distance.toString();
    stringDest += "&category=" + category;
    stringDest += "&location=" + this.stringToAddress(location);
    stringDest += "&locationSearch=true";

    console.log("API Call: " + stringDest);

    http.get(stringDest)
    .subscribe((response) => {
      //console.log(TelephoneService.responseToJSON(response));
      TelephoneService.ticketMasterJSON = TelephoneService.responseToJSON(response);
      caller.searchResults = TelephoneService.ticketMasterJSON._embedded.events;
      console.log(caller.searchResults);
    })
  }

  public static clearTicketMaster()
  {
    TelephoneService.ticketMasterJSON = null;
  }

  public static getSpotify(artist: string, http: HttpClient, caller: SearchBoxComponent)
  {
    //console.log("enter getSpotify");
    const stringDest= "https://hw8-380107.wl.r.appspot.com/spotify?artist=" + artist;

    http.get(stringDest)
    .subscribe((response) => {
      //console.log(TelephoneService.responseToJSON(response));
      TelephoneService.spotifyJSON = TelephoneService.responseToJSON(response);
      //console.log(TelephoneService.spotifyJSON);
      
      //console.log(this.spotifyJSON["artists"]["items"]);
      //console.log("Artist is " + artist);
      for (let i = 0; i < this.spotifyJSON.artists.items.length; i++)
      {
        //console.log(this.spotifyJSON["artists"]["items"][i]["name"]);
        if (this.spotifyJSON.artists.items[i].name == artist)
        {
          caller.spotifyResult.push(TelephoneService.spotifyJSON.artists.items[i]);
          //console.log("Matching search is " + TelephoneService.spotifyJSON["artists"]["items"][i]["name"]);
          
          break;
        }
      }
      
      //console.log(caller.spotifyResult);
    })
  }

  public static getAlbums(artistID: string, http: HttpClient, caller: SearchBoxComponent)
  {
    console.log("getAlbums called with ID " + artistID);
    const stringDest= "https://hw8-380107.wl.r.appspot.com/spotifyAlbums?artistID=" + artistID;

    caller.albums.push([]);
    const index = caller.albums.length - 1;

    http.get(stringDest)
    .subscribe((response) => {
      const responseJSON = TelephoneService.responseToJSON(response).items;

      //console.log("Album response JSON: " + responseJSON);

      for (let i = 0; i < responseJSON.length; i++)
      {
        caller.albums[index].push(responseJSON[i].images[0].url);
      }
    })
  }

}
