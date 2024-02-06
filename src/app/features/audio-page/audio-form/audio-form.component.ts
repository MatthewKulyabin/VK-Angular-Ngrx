import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AudioActions from '../../../share/state/audio/actions';
import { AudioInterface } from 'src/app/share/types/audio-interface';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';

@Component({
  selector: 'app-audio-form',
  templateUrl: './audio-form.component.html',
  styleUrls: ['./audio-form.component.scss'],
})
export class AudioFormComponent {
  @Input() closeModal!: () => void;

  audioForm: FormGroup;

  src!: any;
  filename = '';

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService
  ) {
    this.audioForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      author: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      src: new FormControl<any>(null, { validators: [Validators.required] }),
    });
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

    this.store.dispatch(AudioActions.addAudio({ audio }));
    this.store.dispatch(
      AudioActions.patchSrc({ id: audio.id, src: audio.src })
    );
    this.closeModal();
    this.audioForm.reset();
  }

  onImagePicked(event: Event): void {
    let file: any = event.target;
    this.src = file.files[0];
  }
}
