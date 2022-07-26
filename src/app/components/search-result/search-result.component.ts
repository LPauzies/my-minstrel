import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  // Dynamic
  videos: Array<string>;
  filteredVideos: Array<string>;

  constructor() {
    this.videos = new Array();
    this.filteredVideos = new Array();
  }

  ngOnInit(): void {
    // TODO fill cards
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
    this.filteredVideos.push("video");
  }

}
