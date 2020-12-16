import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cross-reference',
  templateUrl: './cross-reference.component.html',
  styleUrls: ['./cross-reference.component.css']
})
export class CrossReferenceComponent implements OnInit {

 
  iscorss = true;
  @Output() thiscrosscom = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

 toggleclose(){
   //this.iscorss = !this.iscorss;
   this.thiscrosscom.emit(false);
 }


}
