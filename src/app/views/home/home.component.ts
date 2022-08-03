import { Component, HostListener, OnInit } from '@angular/core';
import { EventChangePlayerVideo } from 'src/app/components/search-result/search-result.component';
import { EventSearchFilter } from 'src/app/components/search/search.component';
import { YoutubeVideo } from 'src/app/domains/youtubeVideo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Dynamic content
  panelHeight?: string;
  panelMarginTop?: string;

  selectedYoutubeVideo!: YoutubeVideo;

  // Filters
  search: string;
  macroFilter: string;
  microFilters: Array<string>;

  constructor() {
    // First values by default
    this.panelMarginTop = "32vh";
    this.panelHeight = "54vh";
    this.search = "";
    this.macroFilter = "";
    this.microFilters = [];
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    let headerHeight = document.getElementById("header")?.offsetHeight;
    let playerHeight = document.getElementById("player")?.offsetHeight;
    if (headerHeight !== undefined && playerHeight !== undefined) {
      const maxHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      this.panelMarginTop = `${headerHeight}px`;
      this.panelHeight = `${maxHeight - headerHeight - playerHeight}px`;
    }
  }

  updateVideoPlayer(event: EventChangePlayerVideo) {
    this.selectedYoutubeVideo = event.youtubeVideo;
  }

  toParent(event: EventSearchFilter) {
    this.macroFilter = event.macroFilter;
    this.microFilters = event.microFilters;
    this.search = event.search;
  }

}
