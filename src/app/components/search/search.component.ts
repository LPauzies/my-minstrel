import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventFilterStatus } from 'src/app/components/filter-badge/filter-badge.component';
import { DataService } from 'src/app/services/data.service';

export class EventSearchFilter {
  constructor(readonly search: string, readonly filters: Array<string>) {}
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // Static through component
  placeholderSearch: string = "Search for ambient sounds...";
  research: string = "";

  // Dynamic
  filters: Map<string, boolean>;

  // Output
  @Output() changeSearchFilter = new EventEmitter<EventSearchFilter>();

  constructor(
    private dataService: DataService
  ) {
    this.filters = new Map();
    this.dataService.getFilters().subscribe(
      data => data.forEach(
        filter => this.filters.set(filter.value, false)
      )
    )
  }

  ngOnInit(): void {}

  /* Angular events */
  onResearch(newResearch: string): void {
    this.research = newResearch;
    this.changeSearchFilter.emit(new EventSearchFilter(this.research, this.filtersToArray()));
  }

  updateFilter(event: EventFilterStatus): void {
    this.filters.set(event.label, event.checked);
    this.changeSearchFilter.emit(new EventSearchFilter(this.research, this.filtersToArray()));
  }

  filtersToArray(): Array<string> {
    return Array.from(this.filters.entries()).filter(e => e[1]).map(e => e[0]);
  }

}
