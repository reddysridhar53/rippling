import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from '../../services/utils.service';

@Component({
  selector: 'reserved-seats',
  template: require('./reserved-seats.component.html'),
  styles: [require('./reserved-seats.component.scss')]
})

export class ReservedSeatsComponent implements OnInit {

  reservedSeats: any;

  constructor(private utils: UtilityService) {
    const that = this;
    this.utils.reloadReservedData$.subscribe(function(){
      that.reservedSeats = that.utils.getReservedTickets();
    })
  }

  ngOnInit() {
    this.reservedSeats = this.utils.getReservedTickets();
  }
}