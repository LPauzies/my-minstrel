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
  playerHeight!: number;
  playerVideoWidth!: number;
  videoTitle?: string;

  // Player related
  player!: any;
  currentTimestamp!: number;
  currentTimestampDate!: string;
  durationTimestamp!: number;
  durationTimestampDate!: string;
  progressBar!: number;
  progressBarPercentage!: string;
  isPlaying!: boolean;
  isMuted!: boolean;
  currentVolume!: number;
  isLoop!: boolean;

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

  constructor() {}

  // Angular hooks
  ngOnChanges(changes: SimpleChanges) {
    // To manage changement of value of youtube video id
    // Refresh the player
    if (this.player) this.setPlayer();
  }

  ngOnInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  // Listeners
  @HostListener('window:resize', ['$event'])
  onResize() {
    let playerHeight = document.getElementById("player")?.offsetHeight;
    if (playerHeight) {
      this.playerHeight = playerHeight;
      this.playerVideoWidth = Math.ceil(this.playerHeight * 1.33);
    }
  }

  onPlayerStateChange(event: any) {
    if (event.data === 0) (this.isLoop) ? setTimeout(() => this.play(), 1000) : this.stop();
  }

  // Do stuff when player is ready to bee used
  setPlayer(player?: any) {
    // From event or refreshing
    if (player) this.player = player.target;
    // Loading component
    this.loading = false;
    // Video player data
    this.videoTitle = this.player.videoTitle;
    this.currentTimestamp = Math.ceil(this.player.getCurrentTime());
    this.currentTimestampDate = this.formatSeconds(this.currentTimestamp)
    this.durationTimestamp = Math.ceil(this.player.getDuration());
    this.durationTimestampDate = this.formatSeconds(this.durationTimestamp)
    this.progressBar = this.toPercentage(this.currentTimestamp, this.durationTimestamp);
    this.progressBarPercentage = `${this.progressBar}%`;
    // Subscription to refresh data every seconds (progress bar)
    this.timerSubscription = timer(0, 100).pipe(
      map(
        () => {
          this.currentTimestamp = Math.ceil(this.player.getCurrentTime());
          this.currentTimestampDate = this.formatSeconds(this.currentTimestamp)
          this.progressBar = this.toPercentage(this.currentTimestamp, this.durationTimestamp);
          this.progressBarPercentage = `${this.progressBar}%`;
        }
      )
    ).subscribe();
    // Default behaviour
    this.isPlaying = true;
    this.isMuted = false;
    this.isLoop = true;
    this.currentVolume = 50;
    this.setVolume(this.currentVolume);
    this.play();
    this.mute();
  }

  // Player behaviour modifier
  play() { this.player.playVideo(); this.isPlaying = true; }
  mute() { this.player.mute(); this.isMuted = true; }
  unmute() { 
    if (this.currentVolume == 0) return;
    this.player.unMute(); 
    this.isMuted = false; 
  }
  pause() { this.player.pauseVideo(); this.isPlaying = false; }
  stop() { this.player.stopVideo(); this.isPlaying = false; }
  loadVideoById(id: string) { this.player.loadVideoById(id); }
  setVolume(volume: number) { this.player.setVolume(volume); }
  downVolume() {
    this.currentVolume -= 5;
    if (this.currentVolume <= 0) {
      this.mute();
      this.currentVolume = 0;
    }
    else this.player.setVolume(this.currentVolume);
  }
  upVolume() {
    this.currentVolume += 5;
    if (this.currentVolume > 0) this.unmute();
    if (this.currentVolume >= 100) this.currentVolume = 100;
    this.player.setVolume(this.currentVolume);
  }
  setLoop(value: boolean) { this.isLoop = value; }

  // Progress Bar
  toPercentage(currentSeconds: number, maxSeconds: number): number {
    return (currentSeconds / maxSeconds) * 100
  }
  formatSeconds(s: number) {
    return new Date(s * 1000).toISOString().slice(11, 19);
  }

}
