import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxRerenderModule } from 'ngx-rerender';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './views/home/home.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchComponent } from './components/search/search.component';
import { FilterBadgeComponent } from './components/filter-badge/filter-badge.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    LogoComponent,
    SearchComponent,
    FilterBadgeComponent,
    VideoCardComponent,
    SearchResultComponent,
    PlayerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    NgxRerenderModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
