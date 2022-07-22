import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() changeCheckboxStatus = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {
  }

  emitCheckboxStatus(event?: any) {
    event.target.blur();
    this.checked = event.target.checked;
    this.changeCheckboxStatus.emit(this.checked);
  }

}
