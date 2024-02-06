import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../app-state-interface';

export const selectAudio = (state: AppStateInterface) => state.audio;

export const audioIsLoadingSelector = createSelector(
  selectAudio,
  (state) => state.isLoading
);

export const audioSelectorByUserId = (userId: number) =>
  createSelector(selectAudio, (state) => {
    return state.audio.filter((audio) => audio.userId === userId);
  });

export const audioSelectorByName = (name: string) =>
  createSelector(selectAudio, (state) =>
    state.audio.filter(
      (audio) =>
        audio.author.toLowerCase().trim().includes(name.toLowerCase().trim()) ||
        audio.title.toLowerCase().trim().includes(name.toLowerCase().trim())
    )
  );
