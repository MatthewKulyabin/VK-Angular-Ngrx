import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as AudioActions from '../../../state/audio/actions';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { AudioInterface } from 'src/app/share/types/audio-interface';
import { userNameSelectorById } from 'src/app/share/state/users/selectors';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { playAudioParams } from '../playAudioParams.interface';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
})
export class AudioListComponent {
  @Input() audioList: Observable<AudioInterface[]> | null = of([]);
  @Output() chooseAudio: EventEmitter<playAudioParams> = new EventEmitter();
  userNameSelectorById = userNameSelectorById;

  constructor(
    protected store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService
  ) {}

  playAudio(params: playAudioParams): void {
    this.chooseAudio.emit({ src: params.src, title: params.title });
  }

  deleteAudio(id: number): void {
    this.store.dispatch(AudioActions.deleteAudio({ id }));
  }

  isAudioOfCurrentUser(userId: number): boolean {
    return this.localStorageService.getCurrentUserId() === userId;
  }
}
