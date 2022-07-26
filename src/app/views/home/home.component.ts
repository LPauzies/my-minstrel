import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  panelHeight?: string;
  panelMarginTop?: string;

  constructor() {
    // First values by default
    this.panelMarginTop = "24vh";
    this.panelHeight = "66vh";
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    let headerHeight = document.getElementById("header")?.offsetHeight;
    let playerHeight = document.getElementById("player")?.offsetHeight;
    if (headerHeight !== undefined && playerHeight !== undefined) {
      // Transform to vh
      const maxHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      this.panelMarginTop = `${headerHeight}px`;
      this.panelHeight = `${maxHeight - headerHeight - playerHeight}px`;
    }
  }

}
