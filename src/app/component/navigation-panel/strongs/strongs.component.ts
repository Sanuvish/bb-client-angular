import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-strongs',
  templateUrl: './strongs.component.html',
  styleUrls: ['./strongs.component.css']
})
export class StrongsComponent implements OnInit {
  isstrong = true;
  @Output() thistrong = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

 toggleclose(){
  // this.isstrong = !this.isstrong;
   this.thistrong.emit(false);
 }

}
