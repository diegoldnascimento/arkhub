import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppRoutingModule } from './app-routing.module';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { AppComponent } from './app.component';
import { SidebarModule } from 'src/shared/sidebar/sidebar.module';
import { SharedModule } from 'src/shared/shared.module';
import { MediumService } from '../shared/services/medium.service';
import { SteemitService } from 'src/shared/services/steemit.service';
import { UtilsService } from './../shared/services/utils.service';
import { RedditService } from 'src/shared/services/reddit.service';
import { TheArkCryptoPodcastService } from 'src/shared/services/thearkcryptopodcast.service';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
      AppComponent,
      DashboardComponent
  ],
  imports: [
      BrowserModule,
      NgxSmartModalModule.forRoot(),
      MaterialModule,
      SidebarModule,
      SharedModule,
      AppRoutingModule,
      HttpClientModule,
      NgxAudioPlayerModule
  ],
  providers: [
      MediumService,
      SteemitService,
      UtilsService,
      RedditService,
      TheArkCryptoPodcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
