import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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

  // Input values from search bar
  @Input() filters!: Array<string>;
  @Input() search!: string;

  // Output
  @Output() changePlayerVideo = new EventEmitter<EventChangePlayerVideo>();

  constructor() {
    this.videos = new Array();
    this.filteredVideos = new Array();
  }

  ngOnChanges(changes: SimpleChanges) {
    let filterSearch = this.search.trim().split(" ").filter(e => e.trim() !== "");
    console.log(filterSearch)
    if (this.filters) {
      this.filteredVideos = this.videos.filter(
        // Check that at least one keyword is on filters chosen by user
        e => e.keywords.find(keyword => this.filters.includes(keyword))
      )
    }
    if (filterSearch) {
      this.filteredVideos = this.filteredVideos.filter(
        e => filterSearch.find(searchKeyword => e.title.includes(searchKeyword))
      )
    }
    
  }

  ngOnInit(): void {
    // TODO fill cards
    let a = new YoutubeVideo("mvcmDk5Pjok", "Kobold Junkyard Ambience", ["junkyard", "fantasy"])
    let b = new YoutubeVideo("3ybetTY0ZSg", "Watchtower Night | Campfire, Creaking, Crickets, Quiet ASMR Ambience | 3 Hours", ["campfire", "creaking", "crickets", "asmr"])
    this.videos.push(a);
    this.videos.push(b);
    this.filteredVideos.push(a);
    this.filteredVideos.push(b);
  }

  emitFilterStatus(id: string) {
    let video = this.getVideo(id);
    if (video) this.changePlayerVideo.emit(new EventChangePlayerVideo(video));
    console.log(this.filters);
  }

  getVideo(id: string): YoutubeVideo | undefined {
    return this.filteredVideos.find(e => e.id === id);
  }

}
