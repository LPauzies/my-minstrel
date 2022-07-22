import { Component, OnInit } from '@angular/core';
import { EventFilterStatus } from 'src/app/components/filter-badge/filter-badge.component';

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
  }

  updateFilter(event: EventFilterStatus): void {
    this.filters.set(event.label, event.checked);
  }

}
