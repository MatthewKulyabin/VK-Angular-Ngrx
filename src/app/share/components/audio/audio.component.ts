import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  @ViewChild('time') time!: ElementRef;
  @ViewChild('length') length!: ElementRef;
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

  ngAfterViewInit(): void {
    this.audio.addEventListener(
      'loadeddata',
      () => {
        this.time.nativeElement.textContent = this.audio.duration;
        this.length.nativeElement.textContent = this.audio.duration;
        this.audio.volume = 0.3;
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
      console.log('INTERVAL');
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

  getTimeCodeFrom(num: number): string {
    let seconds = num;
    let minutes = seconds / 60;
    seconds -= minutes * 60;
    const hours = minutes / 60;
    minutes -= hours * 60;

    if (hours === 0)
      return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    return `${String(hours).padStart(2, '0')}:${minutes}:${String(
      seconds % 60
    )}`;
  }

  onChooseAudio(src: string): void {
    this.audio.src = src;
  }

  ngOnDestroy(): void {
    clearInterval(this.currentTimeInterval);
  }
}
