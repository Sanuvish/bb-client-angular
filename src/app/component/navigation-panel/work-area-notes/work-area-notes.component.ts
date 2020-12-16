import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-work-area-notes',
  templateUrl: './work-area-notes.component.html',
  styleUrls: ['./work-area-notes.component.css']
})
export class WorkAreaNotesComponent implements OnInit {

  isworkareanotes = true;
  @Output() wrokareathis = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  toggleclose() {
    // this.isworkareanotes = !this.isworkareanotes;
    this.wrokareathis.emit(false);
  }
  

}
