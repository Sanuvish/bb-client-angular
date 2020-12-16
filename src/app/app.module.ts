import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatQueueComponent } from './component/navigation-panel/chat-queue/chat-queue.component';
import { ChatHistoryComponent } from './component/navigation-panel/chat-history/chat-history.component';
import { CrossReferenceComponent } from './component/navigation-panel/cross-reference/cross-reference.component';
import { Mp3ClipsComponent } from './component/navigation-panel/mp3-clips/mp3-clips.component';
import { BarnaStatisticsComponent } from './component/navigation-panel/barna-statistics/barna-statistics.component';
import { CalendarComponent } from './component/navigation-panel/calendar/calendar.component';
import { PdfQuotesComponent } from './component/navigation-panel/pdf-quotes/pdf-quotes.component';
import { PersonalFavsComponent } from './component/navigation-panel/personal-favs/personal-favs.component';
import { StrongsComponent } from './component/navigation-panel/strongs/strongs.component';
import { WorkAreaNotesComponent } from './component/navigation-panel/work-area-notes/work-area-notes.component';
import { WorkAreaComponent } from './component/navigation-panel/work-area/work-area.component';
import { BibleComponent } from './component/navigation-panel/bible/bible.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './component/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DynamicModule } from 'ng-dynamic-component';
import { PositionsService } from './service/positions.service';
import { GridsterModule } from 'angular-gridster2';
import { DynamicIoModule } from 'ng-dynamic-component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ChatQueueComponent,
    ChatHistoryComponent,
    CrossReferenceComponent,
    Mp3ClipsComponent,
    BarnaStatisticsComponent,
    CalendarComponent,
    PdfQuotesComponent,
    PersonalFavsComponent,
    StrongsComponent,
    WorkAreaNotesComponent,
    WorkAreaComponent,
    BibleComponent,
    ChatComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,DynamicModule,GridsterModule,DynamicIoModule,
    AppRoutingModule,DragDropModule,SocketIoModule.forRoot(config)
  ],
  providers: [PositionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
