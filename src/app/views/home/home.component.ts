import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let headerHeight = document.getElementById("header")?.offsetHeight;
    let panelHeight = window.innerHeight;
    console.log(headerHeight, panelHeight);
  }

}
