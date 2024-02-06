import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { playAudioParams } from './playAudioParams.interface';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  @ViewChild('time') time!: ElementRef;
  @ViewChild('length') length!: any;
  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef;
  @ViewChild('volumePercentage') volumePercentage!: ElementRef;
  @ViewChild('progress') progress!: ElementRef;
  @ViewChild('current') current!: ElementRef;
  @ViewChild('togglePlay') togglePlay!: ElementRef;
  @ViewChild('volumeBtn') volumeBtn!: ElementRef;
  @ViewChild('volumeEl') volumeEl!: ElementRef;

  private currentTimeInterval: any;
  audio: HTMLAudioElement = new Audio('');

  audioTitle!: string;

  ngAfterViewInit(): void {
    this.audio.addEventListener(
      'loadeddata',
      () => {
        this.length.nativeElement.textContent = this.parseTime(
          this.audio.duration
        );
        this.audio.volume = 0.01;

        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
      },
      false
    );

    this.timeline.nativeElement.addEventListener(
      'click',
      (e: MouseEvent) => {
        const timelineWidth = window.getComputedStyle(
          this.timeline.nativeElement
        ).width;
        const timeToSeek =
          (e.offsetX / parseInt(timelineWidth)) * this.audio.duration;
        this.audio.currentTime = timeToSeek;
      },
      false
    );

    this.volumeSlider.nativeElement.addEventListener(
      'click',
      (e: MouseEvent) => {
        const sliderWidth = window.getComputedStyle(
          this.volumeSlider.nativeElement
        ).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        this.audio.volume = newVolume;
        this.volumePercentage.nativeElement.style.width = newVolume * 100 + '%';
      }
    );

    this.currentTimeInterval = setInterval(() => {
      this.progress.nativeElement.style.width =
        (this.audio.currentTime / this.audio.duration) * 100 + '%';
      this.current.nativeElement.textContent = this.getTimeCodeFrom(
        this.audio.currentTime
      );
    }, 500);

    const playBtn = this.togglePlay.nativeElement;
    playBtn.addEventListener(
      'click',
      () => {
        if (this.audio.paused) {
          playBtn.classList.remove('play');
          playBtn.classList.add('pause');
          this.audio.play();
        } else {
          playBtn.classList.remove('pause');
          playBtn.classList.add('play');
          this.audio.pause();
        }
      },
      false
    );

    this.volumeBtn.nativeElement.addEventListener('click', () => {
      const volumeEl = this.volumeEl.nativeElement;
      this.audio.muted = !this.audio.muted;
      if (this.audio.muted) {
        volumeEl.classList.remove('icono-volumeMedium');
        volumeEl.classList.add('icono-volumeMute');
      } else {
        volumeEl.classList.add('icono-volumeMedium');
        volumeEl.classList.remove('icono-volumeMute');
      }
    });
  }

  getTimeCodeFrom(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor((time % 3600) % 60);

    if (hours === 0)
      return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    return `${String(hours).padStart(2, '0')}:${minutes}:${String(
      seconds % 60
    )}`;
  }

  onChooseAudio(params: playAudioParams): void {
    this.audio.src = params.src;
    this.audioTitle = params.title;
  }

  ngOnDestroy(): void {
    clearInterval(this.currentTimeInterval);
  }

  parseTime(time: number): string {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor((time % 3600) % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? ':' : ':') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ':' : ':') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ':' : '') : '';

    return hDisplay + mDisplay + sDisplay;
  }
}
