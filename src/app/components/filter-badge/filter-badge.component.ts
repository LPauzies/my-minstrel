import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class EventFilterStatus {
    constructor(readonly label: string, readonly checked: boolean) {}
}

@Component({
  selector: 'app-filter-badge',
  templateUrl: './filter-badge.component.html',
  styleUrls: ['./filter-badge.component.scss']
})
export class FilterBadgeComponent implements OnInit {

  // Input
  @Input() checked!: boolean;
  @Input() label!: string;
  
  // Output
  @Output() changeCheckboxStatus = new EventEmitter<EventFilterStatus>();

  constructor() {}

  ngOnInit(): void {
  }

  emitFilterStatus(event?: any) {
    this.checked = !this.checked;
    this.changeCheckboxStatus.emit(new EventFilterStatus(this.label, this.checked));
  }

}
