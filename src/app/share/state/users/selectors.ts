import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app-state-interface';

export const selectFeature = (state: AppStateInterface) => state.users;

export const usersSelector = createSelector(
  selectFeature,
  (state) => state.users
);

export const userSelectorById = (id: number) =>
  createSelector(selectFeature, (state) =>
    state.users.find((user) => user.id === id)
  );
