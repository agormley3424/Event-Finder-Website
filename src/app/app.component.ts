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

  setIP(): void {
    TelephoneService.autoLocationOn(this.phone.http);
  }

  unSetIP(): void {
    TelephoneService.autoLocationOff();
  }
}
