import { Component, HostListener, OnInit } from '@angular/core';
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
    this.panelHeight = "66vh";
    this.selectedYoutubeVideo = new YoutubeVideo(
      "4cDqaLxrt6Q",
      "Prepping an ambush ain't a walk in the park. I mean, it can be if you're ambushing a park, but that's not the point. Focus and will is needed, plus a lot of clutter and time to build the cruelest, deadliest and funkiest traps ever seen. Behold, the kobolds' official headquarters!",
      ["dummy", "dummy"]
    )
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

}
