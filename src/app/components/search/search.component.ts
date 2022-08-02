import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventFilterStatus } from 'src/app/components/filter-badge/filter-badge.component';
import { FilterVideo } from 'src/app/domains/filterVideo';
import { DataService } from 'src/app/services/data.service';

export class EventSearchFilter {
  constructor(readonly search: string, readonly macroFilter: string, readonly microFilters: Array<string>) {}
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // Static through component
  placeholderSearch: string = "Search here...";
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
        this.dataService.getFilters().subscribe(
          data => {
            data.filters[defaultMacroFilter.value].forEach(
              (microFilter: string) => this.microFilters.set(microFilter, false)
            )
          }
        );
        this.sendEventSearchFilter();
      }
    );
  }

  ngOnInit(): void {}

  /* Angular events */
  onResearch(newResearch: string): void {
    this.research = newResearch;
    this.sendEventSearchFilter();
  }

  changeMacroFilter(event: any): void {
    for (let key of this.macroFilters.keys()) {
      this.macroFilters.set(key, false);
    }
    this.macroFilters.set(event.target.id, event.target.checked);
    this.microFilters.clear();
    this.dataService.getFilters().subscribe(
      data => {
        data.filters[event.target.id].forEach((microFilter: string) => this.microFilters.set(microFilter, false));
        this.sendEventSearchFilter();
      }
    )
  }

  updateFilter(event: EventFilterStatus): void {
    this.microFilters.set(event.label, event.checked);
    this.sendEventSearchFilter();
  }

  /* Factorization functions */
  sendEventSearchFilter() {
    this.changeSearchFilter.emit(new EventSearchFilter(this.research, this.filtersToArray(this.macroFilters)[0], this.filtersToArray(this.microFilters)));
  }

  
  /* Utils functions */
  filtersToArray(mapFilters: Map<string, boolean>): Array<string> {
    return Array.from(mapFilters.entries()).filter(e => e[1]).map(e => e[0]);
  }

}
