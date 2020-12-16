import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.css']
})
export class BibleComponent implements OnInit {

  isbible = true;
  @Output() isbiblecom = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

 togglecloseb(){
  //  this.isbible = !this.isbible;
   this.isbiblecom.emit(false);
 }


}
