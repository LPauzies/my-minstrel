import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  @Input() youtubeId!: string;
  @Input() title!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.title = this.truncateTitle(this.title);
  }

  truncateTitle(s: string, maxCharacter: number = 300): string {
    return s.slice(0, maxCharacter);
  }

}
