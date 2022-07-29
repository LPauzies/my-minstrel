import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { YoutubeVideo } from 'src/app/domains/youtubeVideo';
import { DataService } from 'src/app/services/data.service';

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
  videos!: Array<YoutubeVideo>;
  filteredVideos!: Array<YoutubeVideo>;

  // Input values from search bar
  @Input() filters!: Array<string>;
  @Input() search!: string;

  // Output
  @Output() changePlayerVideo = new EventEmitter<EventChangePlayerVideo>();

  constructor(
    private dataService: DataService,
  ) {
    this.dataService.getData().subscribe(
      data => {
        this.videos = data;
        this.filteredVideos = data;
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reset filter
    this.filteredVideos = this.videos; 
    // Create search filter
    let filterSearch = this.search.trim().split(" ").filter(e => e.trim() !== "");
    // If there is filters on keyword
    if (this.filters.length > 0) {
      this.filteredVideos = this.videos.filter(
        // Check that at least one keyword is on filters chosen by user
        e => e.keywords.find(keyword => this.filters.map(e => e.toLocaleLowerCase()).includes(keyword.toLocaleLowerCase()))
      )
    }
    // If there is filters on search
    if (filterSearch.length > 0) {
      this.filteredVideos = this.filteredVideos.filter(
        e => filterSearch.find(searchKeyword => e.title.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase()))
      )
    }
  }

  ngOnInit(): void {
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
