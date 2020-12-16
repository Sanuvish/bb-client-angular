import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  iscalender = true;
  @Output() thiscalandercom = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

 toggleclose(){
  // this.iscalender = !this.iscalender;
   this.thiscalandercom.emit(false);
 }

}
