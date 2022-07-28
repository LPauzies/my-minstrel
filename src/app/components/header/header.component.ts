import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventSearchFilter } from 'src/app/components/search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Output
  @Output() changeSearchFilter = new EventEmitter<EventSearchFilter>();

  constructor() { }

  ngOnInit(): void {
  }

  toParent(event: any) {
    this.changeSearchFilter.emit(event);
  }

}
