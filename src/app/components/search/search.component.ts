import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  placeholderSearch: string = "Search for ambient sounds...";
  filters: Map<string, boolean> = new Map();

  constructor() { }

  ngOnInit(): void {
    this.filters.set("dungeon", true)
  }

  log(): void {
    console.log(this.filters)
  }

}
