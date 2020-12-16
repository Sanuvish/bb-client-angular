import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-queue',
  templateUrl: './chat-queue.component.html',
  styleUrls: ['./chat-queue.component.css']
})
export class ChatQueueComponent implements OnInit {

  ischatqueue = true;
  @Output() chatcom = new EventEmitter();
  


  constructor() { }

  ngOnInit() {
  }

 toggleclosebtn(){
  //  this.ischatqueue = !this.ischatqueue;
   this.chatcom.emit(false);
 }
}