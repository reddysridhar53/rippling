import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '../../services/utils.service';

@Component({
  selector: 'home-component',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})

export class HomeComponent implements OnInit {

  inputError: boolean;
  userName: string;
  noOfSeats: number;
  errorMessage: string;
  allowReservation: boolean;
  
  constructor(private utils: UtilityService){}

  ngOnInit() {
    this.inputError = false;
    this.userName = '';
    this.noOfSeats = 0;
    this.errorMessage = '';
    this.allowReservation = false;
    this.utils.setNoOfRows(10);
    this.utils.setNoOfSeatsInEachRow(12);
  }

  resetSelection() {
    this.allowReservation = false;
  }

  allowSeatReservation() {
    this.errorMessage = '';
    this.inputError = false;
    if (!this.userName) {
      this.inputError = true;
      this.errorMessage = 'Please enter a valid name.'
      return;
    }
    if (!this.noOfSeats || isNaN(this.noOfSeats) || (this.noOfSeats && this.noOfSeats < 0)) {
      this.inputError = true;
      this.errorMessage = 'Please enter no of seats to reserve.'
      return;
    }
    if (this.utils.getRemainingTicketsNum() - this.noOfSeats < 0) {
      this.inputError = true;
      this.errorMessage = 'You have entered too many seats'
      return;
    }

    this.allowReservation = true;
  }
}
