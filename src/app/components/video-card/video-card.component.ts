import { Component, Input, OnInit } from '@angular/core';
import { YoutubeVideo } from 'src/app/domains/youtubeVideo';
import { truncateRelativeToWidthElement } from 'src/app/domains/utils';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  @Input() youtubeVideo!: YoutubeVideo;

  constructor() {
  }

  ngOnInit(): void {
  }

  truncateRelativeToWidthElement(s: string, idRelativeElement: string): string {
    return truncateRelativeToWidthElement(s, idRelativeElement)
  }

}
