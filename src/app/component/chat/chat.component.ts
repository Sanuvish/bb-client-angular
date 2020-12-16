import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from '../service/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ischatpanel = true;
  @Output() chatpanel = new EventEmitter<boolean>();

  newMessage:string='';
  messageList:  string[] = [];
  load = true;
  name:string="";
  typingUser:string='';
  typing = false;
  sentTime:string="";

  constructor(private chatService: ChatService) {
    this.initiate();
    this.getTyping();
    this.stopTyping();
  }

  initiate() {
   // this.name = localStorage.getItem("ravi");
    this.chatService.initiateChat(this.name);
    this.load = false;
  }

  sendMessage() {
    console.log("msg sent");
    let date: Date = new Date();

    this.chatService.sendMessage({sender:this.name, msg: this.newMessage,time: date.toISOString() });
    this.newMessage = '';
  }
  
  update() {
    this.chatService.updateStatus(this.name);
  }

  
  stopTyping() {
  console.log("stoptyping");
    this.chatService.stopTyping(this.name).subscribe((name:any) => {
   
      if(this.name !== name.username){
   
       this.typingUser = name;
       this.typing = false;
      } else{
        this.typing = false;
      }
       console.log(name);
       }); 
     }
  
  getTyping() {
    this.chatService.getTypingStatus().subscribe((name:any) => {
   
   if(this.name !== name.username){

    this.typingUser = name;
    this.typing = true;
   }
    console.log(this.typingUser);

    console.log(name);
    setTimeout(()=>{
      this.typing = false;
    },3000);

  });

  }
  
 
  ngOnInit() {
  
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }
  toggleclosebtn(){
    this.ischatpanel = !this.ischatpanel;
    this.chatpanel.emit(this.ischatpanel);
  }
}