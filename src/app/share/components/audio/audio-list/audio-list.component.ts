import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as AudioActions from '../../../state/audio/actions';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { AudioInterface } from 'src/app/share/types/audio-interface';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss'],
})
export class AudioListComponent {
  @Input() audioList: Observable<AudioInterface[]> = of([]);
  @Output() chooseAudio: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store<AppStateInterface>) {}

  playAudio(src: string): void {
    console.log(src);
    this.chooseAudio.emit(src);
  }

  deleteAudio(id: number): void {
    this.store.dispatch(AudioActions.deleteAudio({ id }));
  }
}
