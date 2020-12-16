import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {

  
  ischathistory = true;
  @Output() chathis = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
 toggleclosebtn(){
  // this.ischathistory = !this.ischathistory;
  this.chathis.emit(false);
}
  

}
