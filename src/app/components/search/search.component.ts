import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventFilterStatus } from 'src/app/components/filter-badge/filter-badge.component';
import { FilterVideo } from 'src/app/domains/filterVideo';
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
  macroFilters: Map<string, boolean>;
  microFilters: Map<string, boolean>;

  // Output
  @Output() changeSearchFilter = new EventEmitter<EventSearchFilter>();

  constructor(
    private dataService: DataService
  ) {
    this.macroFilters = new Map();
    this.microFilters = new Map();
    this.dataService.getFilters().subscribe(
      data => {
        let macroFilters = Object.keys(data.filters).map(e => new FilterVideo(e));
        let defaultMacroFilter = macroFilters[0];
        macroFilters.forEach(
          macroFilter => this.macroFilters.set(macroFilter.value, false)
        )
        this.macroFilters.set(defaultMacroFilter.value, true)
        data.filters[defaultMacroFilter.value].forEach(
          (microFilter: string) => this.microFilters.set(microFilter, false)
        )
      }
    );
  }

  ngOnInit(): void {}

  /* Angular events */
  onResearch(newResearch: string): void {
    this.research = newResearch;
    this.changeSearchFilter.emit(new EventSearchFilter(this.research, this.filtersToArray()));
  }

  updateFilter(event: EventFilterStatus): void {
    this.microFilters.set(event.label, event.checked);
    this.changeSearchFilter.emit(new EventSearchFilter(this.research, this.filtersToArray()));
  }

  filtersToArray(): Array<string> {
    return Array.from(this.microFilters.entries()).filter(e => e[1]).map(e => e[0]);
  }

}
