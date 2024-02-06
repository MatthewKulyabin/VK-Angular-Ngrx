import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import * as AudioActions from '../../share/state/audio/actions';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import {
  audioSelectorByName,
  audioSelectorByUserId,
} from 'src/app/share/state/audio/selectors';
import { AudioInterface } from 'src/app/share/types/audio-interface';

@Component({
  selector: 'app-audio-page',
  templateUrl: './audio-page.component.html',
  styleUrls: ['./audio-page.component.scss'],
})
export class AudioPageComponent {
  audioListByUserId$: Observable<AudioInterface[]>;

  foundAudio$!: Observable<AudioInterface[]> | null;
  openResult: boolean = false;
  searchForm: FormGroup;

  openModal: boolean = false;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService
  ) {
    store.dispatch(AudioActions.getAudio());

    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.audioListByUserId$ = store.select(
      audioSelectorByUserId(localStorageService.getCurrentUserId())
    );
  }

  chooseFollowerAudio(id: number): void {
    this.audioListByUserId$ = this.store.select(audioSelectorByUserId(id));
  }

  chooseMyAudio(): void {
    this.audioListByUserId$ = this.store.select(
      audioSelectorByUserId(this.localStorageService.getCurrentUserId())
    );
  }

  closeResult(): void {
    this.openResult = false;
    this.foundAudio$ = null;
  }

  showResult(): void {
    if (this.searchForm.value.search) {
      this.foundAudio$ = this.store.select(
        audioSelectorByName(this.searchForm.value.search)
      );
    }
    this.openResult = true;
  }

  playAudio(src: string): string {
    return src;
  }

  closeModal(): void {
    this.openModal = false;
  }

  getAudioSrc(src: string): void {
    this.playAudio(src);
  }
}
