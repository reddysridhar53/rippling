import { Injectable }     from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UtilityService{

    rows: number;
    seats: number;
    private reloadReservedData: Subject<boolean> = new Subject<boolean>();

    reloadReservedData$ = this.reloadReservedData.asObservable();

    constructor ( ) {}
    
    getReservedTickets() {
        if (localStorage.getItem('ticketsReserved')) {
            let ticketsReserved = JSON.parse(localStorage.getItem('ticketsReserved'));
            return ticketsReserved;
        }
        return [];
    }

    getReservedTicketsNum() {
        if (this.getReservedTickets().length) {
            let ticketsReserved =  this.getReservedTickets();
            let seatsReserved = 0;
            ticketsReserved.forEach(function(seat: any){
                seatsReserved += seat.seatsReserved;
            })
            return seatsReserved;
        }
        return 0;
    }

    setNoOfRows(rows: number) {
        this.rows = rows;
    }

    setNoOfSeatsInEachRow(seats: number){
        this.seats = seats;
    }

    getNoOfRows() {
        return this.rows;
    }

    getNoOfSeatsInEachRow(){
        return this.seats;
    }

    getRemainingTickets() {
        if (this.getReservedTickets()) {
            return this.getTotalTickets() - this.getReservedTickets();
        }
        return this.getTotalTickets();
    }

    getRemainingTicketsNum() {
        return this.getTotalTickets() - this.getReservedTicketsNum();
    }

    getTotalTickets() {
        return this.rows * this.seats;
    }

    storeReservedSeats(seats: any){
        localStorage.setItem('ticketsReserved', JSON.stringify(seats));
        this.reloadReservedData.next(true);
    }
}
