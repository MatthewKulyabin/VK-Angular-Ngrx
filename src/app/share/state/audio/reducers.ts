import { createReducer, on } from '@ngrx/store';

import { AudioStateInterface } from './types/audio-state-interface';
import * as AudioActions from './actions';

const initialState: AudioStateInterface = {
  isLoading: false,
  audio: [],
  error: null,
};

export const reducers = createReducer(
  initialState,

  // [Audio] Get Audio
  on(AudioActions.getAudio, (state) => ({ ...state, isLoading: true })),
  on(AudioActions.getAudioSuccess, (state, action) => ({
    ...state,
    audio: action.audio,
    isLoading: false,
  })),
  on(AudioActions.getAudioFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // [Audio] Patch Src
  on(AudioActions.patchSrc, (state, action) => ({ ...state })),
  on(AudioActions.patchSrcSuccess, (state, action) => ({
    ...state,
    audio: [
      ...state.audio.map((audio) =>
        audio.id === action.audio.id ? action.audio : audio
      ),
    ],
  })),
  on(AudioActions.patchSrcFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Audio] Add Audio
  on(AudioActions.addAudioSuccess, (state, action) => ({
    ...state,
    audio: [...state.audio, action.audio],
    isLoading: false,
  })),
  on(AudioActions.addAudioFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // [Audio] Edit Audio
  on(AudioActions.editAudioSuccess, (state, action) => ({
    ...state,
    audio: [
      ...state.audio.map((audio) =>
        audio.id === action.audio.id ? action.audio : audio
      ),
    ],
    isLoading: false,
  })),
  on(AudioActions.editAudioFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // [Audio] Delete Audio
  on(AudioActions.deleteAudioSuccess, (state, action) => ({
    ...state,
    audio: [...state.audio.filter((audio) => audio.id !== action.id)],
    isLoading: false,
  })),
  on(AudioActions.deleteAudioFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  }))
);
