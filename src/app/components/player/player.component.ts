import { Component, HostListener, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';
import { YoutubeVideo } from 'src/app/domains/youtubeVideo';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() youtubeVideo!: YoutubeVideo;

  // Loading content
  loading: boolean = true;

  // Subscription
  timerSubscription!: Subscription;

  // Dynamic content
  player!: any;
  playerHeight!: number;
  playerVideoWidth!: number;
  videoTitle?: string;

  // Progress bar
  currentTimestamp!: number;
  currentTimestampDate!: string;
  durationTimestamp!: number;
  durationTimestampDate!: string;
  progressBar!: number;
  progressBarPercentage!: string;

  // Static
  playerVariables = {
    autoplay: 1,
    controls: 0,
    enablejsapi: 1,
    fs: 0,
    iv_load_policy: 3,
    loop: 1,
    modestbranding: 1,
    rel: 0,
    showinfo: 0
  };

  ngOnChanges(changes: SimpleChanges) {
    // To manage changement of value of youtube video id
    console.log(changes);
  }

  constructor() {}

  ngOnInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    let playerHeight = document.getElementById("player")?.offsetHeight;
    if (playerHeight !== undefined) {
      this.playerHeight = playerHeight;
      this.playerVideoWidth = Math.ceil(this.playerHeight * 1.33);
    }
  }

  // Do stuff when player is ready to bee used
  setPlayer(player: any) {
    this.player = player.target;
    this.videoTitle = this.player.videoTitle;
    this.currentTimestamp = Math.ceil(this.player.getCurrentTime());
    this.currentTimestampDate = this.formatSeconds(this.currentTimestamp)
    this.durationTimestamp = Math.ceil(this.player.getDuration());
    this.durationTimestampDate = this.formatSeconds(this.durationTimestamp)
    this.progressBar = this.toPercentage(this.currentTimestamp, this.durationTimestamp);
    this.progressBarPercentage = `${this.progressBar}%`;
    this.loading = false;
    this.timerSubscription = timer(0, 1000).pipe(
      map(
        () => {
          this.currentTimestamp = Math.ceil(this.player.getCurrentTime());
          this.currentTimestampDate = this.formatSeconds(this.currentTimestamp)
          this.progressBar = this.toPercentage(this.currentTimestamp, this.durationTimestamp);
          this.progressBarPercentage = `${this.progressBar}%`;
        }
      )
    ).subscribe();
  }

  // Player behaviour modifier
  play() { this.player.playVideo() }
  mute() { this.player.mute() }
  unmute() { this.player.unmute() }
  pause() { this.player.pauseVideo() }
  stop() { this.player.stopVideo() }
  loadVideoById(id: string) { this.player.loadVideoById(id) }
  setVolume(volume: number) { this.player.setVolume(volume) }

  // Progress Bar
  toPercentage(currentSeconds: number, maxSeconds: number): number {
    return Math.ceil((currentSeconds / maxSeconds) * 100)
  }
  formatSeconds(s: number) {
    return new Date(s * 1000).toISOString().slice(11, 19);
  }

  // Player checker
  isMuted(): boolean { return this.player.isMuted() }

  // Player information
  getVideoTitle(): string { return this.player.videoTitle }
  getVolume(): number { return this.player.getVolume() }
  getCurrentTime(): number { return this.player.getCurrentTime() }
  getDuration(): number { return this.player.getDuration() }
}
