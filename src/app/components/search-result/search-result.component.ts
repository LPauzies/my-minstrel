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
  @Input() macroFilter!: string;
  @Input() microFilters!: Array<string>;
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
    // Filter using macro filter
    this.filteredVideos = this.videos.filter(e => e.type === this.macroFilter);
    // Create search filter
    let filterSearch = this.search.trim().split(" ").filter(e => e.trim() !== "");
    // Filter using micro filter
    if (this.microFilters.length > 0) {
      this.filteredVideos = this.filteredVideos.filter(
        // Check that at least one keyword is on filters chosen by user
        e => this.microFilters.every(filter => e.keywords.map(e => e.toLocaleLowerCase()).includes(filter.toLocaleLowerCase()))
      )
    }
    // If there is filters on search
    if (filterSearch.length > 0) {
      this.filteredVideos = this.filteredVideos.filter(
        e => filterSearch.find(searchKeyword => e.title.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase()))
      )
    }
  }

  ngOnInit(): void {}

  emitFilterStatus(id: string) {
    let video = this.filteredVideos.find(e => e.id === id);
    if (video) this.changePlayerVideo.emit(new EventChangePlayerVideo(video));
  }

}
