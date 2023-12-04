import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AudioActions from './actions';
import { AudioService } from '../../services/audio.service';

@Injectable()
export class AudioEffects {
  constructor(private actions$: Actions, private audioService: AudioService) {}

  getAudio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AudioActions.getAudio),
      mergeMap(() =>
        this.audioService.getAudio().pipe(
          map((audio) => AudioActions.getAudioSuccess({ audio })),
          catchError((error) =>
            of(AudioActions.getAudioFailure({ error: error.message }))
          )
        )
      )
    );
  });

  patchSrc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AudioActions.patchSrc),
      switchMap((action) => {
        console.log('action', action);
        return this.audioService.patchSrc(action.id, action.src).pipe(
          map((audio) => {
            console.log(audio, 'from effects');
            return AudioActions.patchSrcSuccess({ audio });
          }),
          catchError((error) => of(AudioActions.patchSrcFailure({ error })))
        );
      })
    );
  });

  addAudio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AudioActions.addAudio),
      switchMap((action) =>
        this.audioService.addAudio(action.audio).pipe(
          map((audio) => AudioActions.addAudioSuccess({ audio })),
          catchError((error) =>
            of(AudioActions.addAudioFailure({ error: error.message }))
          )
        )
      )
    );
  });

  editAudio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AudioActions.editAudio),
      switchMap((action) =>
        this.audioService.editAudio(action.audio).pipe(
          map((audio) => AudioActions.editAudioSuccess({ audio })),
          catchError((error) =>
            of(AudioActions.editAudioFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteAudio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AudioActions.deleteAudio),
      switchMap((action) =>
        this.audioService.deleteAudio(action.id).pipe(
          map((id) => AudioActions.deleteAudioSuccess({ id })),
          catchError((error) =>
            of(AudioActions.deleteAudioFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
