import { createAction, props } from '@ngrx/store';

import { AudioInterface } from '../../types/audio-interface';

// [Audio] Get Audio
export const getAudio = createAction('[Audio] Get Audio');
export const getAudioSuccess = createAction(
  '[Audio] Get Audio success',
  props<{ audio: AudioInterface[] }>()
);
export const getAudioFailure = createAction(
  '[Audio] Get Audio failure',
  props<{ error: string }>()
);

// [Audio] Patch src
export const patchSrc = createAction(
  '[Audio] Patch Src',
  props<{ id: number; src: FormData }>()
);
export const patchSrcSuccess = createAction(
  '[Audio] Patch Src success',
  props<{ audio: AudioInterface }>()
);
export const patchSrcFailure = createAction(
  '[Audio] Patch Src failure',
  props<{ error: string }>()
);

// [Audio] Add Audio
export const addAudio = createAction(
  '[Audio] Add Audio',
  props<{ audio: AudioInterface }>()
);
export const addAudioSuccess = createAction(
  '[Audio] Add Audio success',
  props<{ audio: AudioInterface }>()
);
export const addAudioFailure = createAction(
  '[Audio] Add Audio failure',
  props<{ error: string }>()
);

// [Audio] Edit Audio
export const editAudio = createAction(
  '[Audio] Edit Audio',
  props<{ audio: AudioInterface }>()
);
export const editAudioSuccess = createAction(
  '[Audio] Edit Audio success',
  props<{ audio: AudioInterface }>()
);
export const editAudioFailure = createAction(
  '[Audio] Edit Audio failure',
  props<{ error: string }>()
);

// [Audio] Delete Audio
export const deleteAudio = createAction(
  '[Audio] Delete Audio',
  props<{ id: number }>()
);
export const deleteAudioSuccess = createAction(
  '[Audio] Delete Audio success',
  props<{ id: number }>()
);
export const deleteAudioFailure = createAction(
  '[Audio] Delete Audio failure',
  props<{ error: string }>()
);

// [Audio] Delete Audio by UserId
export const deleteAudioByUserId = createAction(
  '[Audio] Delete Audio by UserId',
  props<{ userId: number; ids: Array<number> }>()
);
export const deleteAudioByUserIdSuccess = createAction(
  '[Audio] Delete Audio by UserId Success',
  props<{ userId: number }>()
);
export const deleteAudioByUserIdFailure = createAction(
  '[Audio] Delete Audio by UserId Failure',
  props<{ error: string }>()
);
