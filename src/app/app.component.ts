import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TelephoneService } from "./telephone.service";
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal, private phone: TelephoneService) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  testFunc(): void {
    // this.setIP();
    // console.log("IP set as " + TelephoneService.ip);
    //this.setTicketMasterAuto();
  }

  // setIP(): void {
  //   TelephoneService.autoLocationOn(this.phone.http);
  // }

  // unSetIP(): void {
  //   TelephoneService.autoLocationOff();
  // }

  // setTicketMasterAuto(): void {
  //   TelephoneService.ticketMasterAuto("concerts", 50, "music", this.phone.http);
  // }

  // setTicketMasterManual(): void {
  //   TelephoneService.ticketMasterManual("concerts", 50, "music", TelephoneService.ip, this.phone.http);
  // }
}
