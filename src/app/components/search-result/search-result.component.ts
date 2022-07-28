import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YoutubeVideo } from 'src/app/domains/youtubeVideo';

export class EventChangePlayerVideo {
  constructor(readonly youtubeVideo: YoutubeVideo) {}
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  // Dynamic
  videos: Array<YoutubeVideo>;
  filteredVideos: Array<YoutubeVideo>;

  // Output
  @Output() changePlayerVideo = new EventEmitter<EventChangePlayerVideo>();

  constructor() {
    this.videos = new Array();
    this.filteredVideos = new Array();
  }

  ngOnInit(): void {
    // TODO fill cards
    let a = new YoutubeVideo("mvcmDk5Pjok", "Kobold Junkyard Ambience", ["Junkyard", "Fantasy"])
    let b = new YoutubeVideo("3ybetTY0ZSg", "Watchtower Night | Campfire, Creaking, Crickets, Quiet ASMR Ambience | 3 Hours", ["Campfire", "Creaking", "Crickets", "ASMR"])
    this.videos.push(a);
    this.videos.push(b);
    this.filteredVideos.push(a);
    this.filteredVideos.push(b);
  }

  emitFilterStatus(id: string) {
    let video = this.getVideo(id);
    if (video) this.changePlayerVideo.emit(new EventChangePlayerVideo(video));
  }

  getVideo(id: string): YoutubeVideo | undefined {
    return this.filteredVideos.find(e => e.id === id);
  }

}
