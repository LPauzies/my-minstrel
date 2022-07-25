import { Component, OnInit } from '@angular/core';
import { EventFilterStatus } from 'src/app/components/filter-badge/filter-badge.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // Static through component
  placeholderSearch: string = "Search for ambient sounds...";

  // Dynamic
  filters: Map<string, boolean>;

  constructor() {
    this.filters = new Map();
  }

  ngOnInit(): void {
    // TODO fill filters
    this.filters.set("dungeon", false);
  }

  updateFilter(event: EventFilterStatus): void {
    this.filters.set(event.label, event.checked);
  }

}
