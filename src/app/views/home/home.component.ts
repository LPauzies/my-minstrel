import { Component, HostListener, OnInit } from '@angular/core';
import { EventChangePlayerVideo } from 'src/app/components/search-result/search-result.component';
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

  constructor() {
    // First values by default
    this.panelMarginTop = "24vh";
    this.panelHeight = "62vh";
  }

  ngOnInit(): void {
  }

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

}
