import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app-state-interface';

export const selectFeature = (state: AppStateInterface) => state.audio;

export const audioIsLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const audioSelectorByUserId = (userId: number) =>
  createSelector(selectFeature, (state) =>
    state.audio.filter((audio) => audio.userId === userId)
  );
