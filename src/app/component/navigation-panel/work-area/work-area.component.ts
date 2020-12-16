import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.css']
})
export class WorkAreaComponent implements OnInit {

  iswrokarea = true;
  @Output() wrokareathis = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  toggleclose(){
    // this.iswrokarea = !this.iswrokarea;
    this.wrokareathis.emit(false);
  }
}
