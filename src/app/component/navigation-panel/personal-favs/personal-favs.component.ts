import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-personal-favs',
  templateUrl: './personal-favs.component.html',
  styleUrls: ['./personal-favs.component.css']
})
export class PersonalFavsComponent implements OnInit {

  isparsonalfav = true;
  @Output() thispersonal = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

 toggleclose(){
  //  this.isparsonalfav = !this.isparsonalfav;
   this.thispersonal.emit(false);
 }


}
