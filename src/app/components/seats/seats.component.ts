import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from '../../services/utils.service';

@Component({
  selector: 'seats-arena',
  template: require('./seats.component.html'),
  styles: [require('./seats.component.scss')]
})

export class SeatsComponent implements OnInit {

  @Input() seatsEntered: number;
  @Input() nameEntered: string;

  noOfRows: number;
  noOfSeats: number;
  seatsArrangement: any = [];
  selectedSeats: any = [];
  showSeatsReserved: boolean;

  constructor(private utils: UtilityService) {}

  ngOnInit() {
    this.noOfRows = this.utils.getNoOfRows();
    this.noOfSeats = this.utils.getNoOfSeatsInEachRow();
    this.renderSeatArrangement();
    this.checkReservedSeats();
  }

  selectSeat(seatNo: any){
    if(seatNo.selected){
      seatNo.selected = !seatNo.selected;
      this.selectedSeats = this.selectedSeats.filter(function(seat: any){
        return seat.target !== seatNo.target;
      })
      return;
    }
    if(this.seatsEntered !== this.selectedSeats.length){
      seatNo.selected = !seatNo.selected;
      if(seatNo.selected){
          this.selectedSeats.push(seatNo);
      }
    }
  }

  checkReservedSeats() {
    const seatsReserved = this.utils.getReservedTickets();
    if (seatsReserved.length) {
      this.showSeatsReserved = true;
    }
  }

  confirmBooking() {
    this.selectedSeats.forEach(function(seat: any){
      seat.reserved = true;
    })
    let reservedSeats = this.utils.getReservedTickets();
    reservedSeats.push({'name' : this.nameEntered, 'seatsReserved' : this.seatsEntered, 'seats' : this.selectedSeats})
    this.utils.storeReservedSeats(reservedSeats);
  }

  renderSeatArrangement() {
    let seatsArrangement = [];
    for(var i = 0; i < this.noOfRows; i++) {
      var row = String.fromCharCode(65 + i);
      var seat = {};
      seat['row'] = row;
      seat['seatsIndex'] = [];
      for(var j = 0; j < this.noOfSeats; j++) {
        var seatData = {};
        seatData['seatNo'] = j + 1;
        seatData['target'] = row + '-' + (j+1);
        seatData['reserved'] = false;
        seatData['selected'] = false;
        seat['seatsIndex'].push(seatData);
      }
      seatsArrangement.push(seat);
    }
    this.checkForReservedSeats(seatsArrangement);
  }

  checkForReservedSeats(data: any) {
    if (this.utils.getReservedTickets()){
      let reservedSeats = this.utils.getReservedTickets();
      data.forEach(function(seat: any){
        seat.seatsIndex.forEach(function(seatData: any){
          reservedSeats.forEach(function(seatReserved: any){
            seatReserved.seats.forEach(function(seatBooked: any){
              if(seatData.target === seatBooked.target){
                seatData.reserved = true;
              }
            })
          })
        })
      })
      this.seatsArrangement = data;
    }
  }
}
