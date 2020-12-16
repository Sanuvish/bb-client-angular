import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { element } from 'protractor';
import { ChatComponent } from './component/chat/chat.component';
import { BarnaStatisticsComponent } from './component/navigation-panel/barna-statistics/barna-statistics.component';
import { BibleComponent } from './component/navigation-panel/bible/bible.component';
import { CalendarComponent } from './component/navigation-panel/calendar/calendar.component';
import { ChatHistoryComponent } from './component/navigation-panel/chat-history/chat-history.component';
import { ChatQueueComponent } from './component/navigation-panel/chat-queue/chat-queue.component';
import { CrossReferenceComponent } from './component/navigation-panel/cross-reference/cross-reference.component';
import { Mp3ClipsComponent } from './component/navigation-panel/mp3-clips/mp3-clips.component';
import { PdfQuotesComponent } from './component/navigation-panel/pdf-quotes/pdf-quotes.component';
import { PersonalFavsComponent } from './component/navigation-panel/personal-favs/personal-favs.component';
import { StrongsComponent } from './component/navigation-panel/strongs/strongs.component';
import { WorkAreaNotesComponent } from './component/navigation-panel/work-area-notes/work-area-notes.component';
import { WorkAreaComponent } from './component/navigation-panel/work-area/work-area.component';
import { PositionsService } from './service/positions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'newBurdunBearrs';
  component1 = ChatQueueComponent;
  component2 = ChatComponent;
  component3 = ChatHistoryComponent
  component4 = BibleComponent;
  component5 = CrossReferenceComponent;
  component6 = StrongsComponent;
  component7 = Mp3ClipsComponent;
  component8 = WorkAreaComponent;
  component9 = WorkAreaNotesComponent;
  component10 = BarnaStatisticsComponent;
  component11 = CalendarComponent;
  component12 = PdfQuotesComponent;
  component13 = PersonalFavsComponent;
  options: any;
  dashboard: Array<GridsterItem> = []
  loaded = false;
  constructor(private posServ: PositionsService) {
    setInterval(() => {
      this.timeNow = new Date();
    }, 1);
  }
  ngOnInit() {
    this.options = {
      setGridSize: true,
      gridType: 'verticalFixed',
      fixedRowHeight: 100,
      minRows: 1,
      maxRows: 100,
      minItemRows: 1,
      maxItemRows: 10,
      defaultItemRows: 2,
      minCols: 1,
      maxCols: 12,
      maxItemCols: 12,
      minItemCols: 2,
      defaultItemCols: 2,
      maxItemArea: 250,
      minItemArea: 1,
      swap: true,
      displayGrid: 'onDrag&Resize',
      compactType: 'compactUp', // 'compactUp&Left',compactLeft&Up'
      pushItems: true,
      resizable: { enabled: true },
      draggable: {
        enabled: true
      },

      itemChangeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemChange(item, itemComponent),
      itemResizeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemResize(item, itemComponent),
    };

    this.dashboard = [
      { "x": 0, "y": 0, "cols": 3, "rows": 3 },
    ]

    // hiding the gridster untill positions are loaded
    this.loaded = false;

    this.posServ.getPositions().subscribe((positions) => {
      this.dashboard = positions;
      this.loaded = true;
    })

  }

  static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    throw new Error('Method not implemented.');
  }
  static itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    throw new Error('Method not implemented.');
  }
  timeNow: Date = new Date();

  //pdf check uncheck
  pdfthis = {
    thispdf: (e: any) => {
      this.pdfquotes = e;
      this.onCheckboxChange()
    }

  }
  onCheckboxChange() {
    if (this.pdfqu) {
      setTimeout(() => {
        this.pdfqu = false
      });
    } else {
      this.pdfqu = true
    }
  }
  //mp3 check unckeck
  mp3this = {
    thismp3: (e: any) => {
      this.mp3clips = e;
      this.onCheckboxChangemp3()
    }
  }
  onCheckboxChangemp3() {
    if (this.mp3) {
      setTimeout(() => {
        this.mp3 = false
      });
    }
    else {
      this.mp3 = true
    }
  }
  // calender
  calenderthis = {
    thiscalandercom: (e: any) => {
      this.calendar = e;
      this.onCheckboxChangecal()
    }
  }
  cal?: boolean
  onCheckboxChangecal() {
    if (this.cal) {
      setTimeout(() => {
        this.cal = false
      });
    }
    else {
      this.cal = true
    }
  }
  //chat history
  chathist = {
    chathis: (e: any) => {
      this.chathistory = e;
      this.onCheckboxChangechat()
    }
  }
  chathis?: boolean
  onCheckboxChangechat() {
    if (this.chathis) {
      setTimeout(() => {
        this.chathis = false
      });
    }
    else {
      this.chathis = true
    }
  }
  //chat quee
  chatquee = {
    chatcom: (e: any) => {
      this.chatqueue = e;
      this.onCheckboxChangechatqueue()
    }
  }
  chatque?: boolean
  onCheckboxChangechatqueue() {
    if (this.chatque) {
      setTimeout(() => {
        this.chatque = false
      });
    } else {
      this.chatque = true
    }
  }
  //work area
  workareathis = {
    wrokareathis: (e: any) => {
      this.workarea = e;
      this.onCheckboxChangework()
    }
  }
  work?: boolean
  onCheckboxChangework() {
    if (this.work) {
      setTimeout(() => {
        this.work = false
      });
    } else {
      this.work = true
    }
  }
  //work area
  biblethis = {
    isbiblecom: (e: any) => {
      this.bible = e;
      this.onCheckboxChangeBible()
    }
  }
  biblec?: boolean
  onCheckboxChangeBible() {
    if (this.biblec) {
      setTimeout(() => {
        this.biblec = false
      });
    } else {
      this.biblec = true
    }
  }
  workareanotethis = {
    wrokareathis: (e: any) => {
      this.WorkAreaNotes = e;
      this.onCheckboxChangeworkareanotes()
    }
  }
  workareano?: boolean
  onCheckboxChangeworkareanotes() {
    if (this.workareano) {
      setTimeout(() => {
        this.workareano = false
      });
    } else {
      this.workareano = true
    }
  }
  //strong
  strongsthis = {
    thistrong: (e: any) => {
      this.strongs = e;
      this.onCheckboxChangestrong()
    }
  }
  strong?: boolean
  onCheckboxChangestrong() {
    if (this.strong) {
      setTimeout(() => {
        this.strong = false
      });
    } else {
      this.strong = true
    }
  }

  //cross refence
  corssref = {
    thiscrosscom: (e: any) => {
      this.crossreference = e;
      this.onCheckboxChangecrossref()
    }
  }

  crossref?: boolean
  onCheckboxChangecrossref() {
    if (this.crossref) {
      setTimeout(() => {
        this.crossref = false
      });
    } else {
      this.crossref = true
    }
  }


  //cross refence
  psersonafavthis = {
    thispersonal: (e: any) => {
      this.personalfavs = e;
      this.onCheckboxChangepersonalfav()
    }
  }

  personal?: boolean
  onCheckboxChangepersonalfav() {
    if (this.personal) {
      setTimeout(() => {
        this.personal = false
      });
    } else {
      this.personal = true
    }
  }
  //barna statics
  barnastaticsthis = {
    baranathis: (e: any) => {
      this.barnastatistics = e;
      this.onCheckboxChangebaranastatic()
    }
  }

  barnastatic?: boolean
  onCheckboxChangebaranastatic() {
    if (this.barnastatic) {
      setTimeout(() => {
        this.barnastatic = false
      });
    } else {
      this.barnastatic = true
    }
  }





  // chckbx(){
  //   this.pdfchk.forEach(element => {
  //     element.nativeElement.checked = false;
  //   });
  // }
  panelOpenState = false;
  data: any =
    [
      {
        "parentName": "Navigation Panel",
      },
    ]

  pdfqu?: boolean
  mp3?: boolean
  chatqueue = false;
  workarea = false;
  bible = false;
  WorkAreaNotes = false;
  strongs = false;
  crossreference = false;
  personalfavs = false;
  chathistory = false;
  calendar = false;
  mp3clips = false;
  pdfquotes = false;
  barnastatistics = false;
  chat = false;




  abc(event: any) {
    this.chatqueue = event
    console.log(event)
  }
  panelcom(event: any) {
    this.chat = event
    console.log(event)
  }
  chathistery(event: any) {
    this.chathistory = event
    console.log(event)
  }


  workareacom(event: any) {
    this.workarea = event
    console.log(event)
  }
  workareanotecom(event: any) {
    this.WorkAreaNotes = event
    console.log(event)
  }
  biblecom(event: any) {
    this.bible = event
    console.log(event)
  } strongcom(event: any) {
    this.strongs = event
    console.log(event)
  }
  chatpanelcom(event: any) {
    this.chat = event
    console.log(event)
  }
  crosscom(event: any) {
    this.crossreference = event
    console.log(event)
  }
  personalfavcom(event: any) {
    this.personalfavs = event
    console.log(event)
  }
  calendercom(event: any) {
    this.calendar = event
    console.log(event)
  }
  mp3com(event: any) {
    this.mp3clips = event
    console.log(event)
  }
  pdfcom(event: any) {
    this.pdfquotes = event
    console.log(event)
  }
  baranastatcom(event: any) {
    this.barnastatistics = event
    console.log(event)
  }

  toggleVisibility(pramId: any, e: any) {
    console.log(pramId)
    if (pramId == "chatqueue") {

      this.chatqueue = !this.chatqueue
    }
    if (pramId == "chat") {
      this.chat = !this.chat
    }
    if (pramId == "workarea") {
      this.workarea = !this.workarea;
    }
    if (pramId == "bible") {
      this.bible = !this.bible;
    }
    if (pramId == "WorkAreaNotes") {
      this.WorkAreaNotes = !this.WorkAreaNotes;
    }
    if (pramId == "strongs") {
      this.strongs = !this.strongs;
    }
    if (pramId == "crossreference") {
      this.crossreference = !this.crossreference;
    }
    if (pramId == "personalfavs") {
      this.personalfavs = !this.personalfavs;
    }
    if (pramId == "chathistory") {
      this.chathistory = !this.chathistory;
    }
    if (pramId == "calendar") {
      this.calendar = !this.calendar;
    }
    if (pramId == "mp3clips") {
      this.mp3clips = !this.mp3clips;
    }
    if (pramId == "pdfquotes") {
      this.pdfquotes = !this.pdfquotes;
    }
    if (pramId == "barnastatistics") {
      this.barnastatistics = !this.barnastatistics;
    }

  }
  chatQueue: any;

  toggleAccordian(event: any, index: number) {
    var element = event.target;
    element.classList.toggle("active");
    if (this.data[index].isActive) {
      this.data[index].isActive = false;
    } else {
      this.data[index].isActive = true;
    }
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }




  itemChange(item: any, itemComponent: any) {
    console.info(`state: ${JSON.stringify(this.dashboard, null, 5)}`);
    this.posServ.savePositions(this.dashboard)
  }

  itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

}
