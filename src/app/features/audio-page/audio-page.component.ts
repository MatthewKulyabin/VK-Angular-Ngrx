import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AudioActions from '../../share/state/audio/actions';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { audioSelectorByUserId } from 'src/app/share/state/audio/selectors';
import { AudioInterface } from 'src/app/share/types/audio-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-audio-page',
  templateUrl: './audio-page.component.html',
  styleUrls: ['./audio-page.component.scss'],
})
export class AudioPageComponent {
  audioListByUserId$: Observable<AudioInterface[]>;

  audioForm: FormGroup;

  src!: any;
  filename = '';

  openModal: boolean = false;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService
  ) {
    this.store.dispatch(AudioActions.getAudio());

    this.audioForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      author: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      src: new FormControl<any>(null, { validators: [Validators.required] }),
    });

    this.audioListByUserId$ = store.pipe(
      select(audioSelectorByUserId(this.localStorageService.getCurrentUserId()))
    );
  }

  playAudio(src: string): string {
    return src;
  }

  addNewAudio(): void {
    console.log('Add New Audio');
  }

  onImagePicked(event: Event): void {
    let file: any = event.target;
    this.src = file.files[0];
    console.log(this.src);
  }

  submit(): void {
    this.filename = this.src?.name;
    const formData = new FormData();
    formData.append('src', this.src);

    const audio: AudioInterface = {
      id: Date.now(),
      title: this.audioForm.value.title,
      author: this.audioForm.value.author,
      userId: this.localStorageService.getCurrentUserId(),
      src: formData,
    };

    // console.log(audio, audio.id, audio.src);
    this.store.dispatch(AudioActions.addAudio({ audio }));
    this.store.dispatch(
      AudioActions.patchSrc({ id: audio.id, src: audio.src })
    );
  }

  closeModal(): void {
    this.openModal = false;
  }

  getAudioSrc(src: string): void {
    this.playAudio(src);
  }
}
