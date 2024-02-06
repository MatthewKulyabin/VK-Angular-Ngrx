import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../app-state-interface';

const selectFollowers = (state: AppStateInterface) => state.followers;

export const selectFollowersByLoggedInUser = (id: number) =>
  createSelector(selectFollowers, (state) =>
    state.followers.filter((follower) => follower.followedById === id)
  );

export const isAlreadyFollowed = (userId: number, followedById: number) =>
  createSelector(selectFollowers, (state) =>
    state.followers.find(
      (follower) =>
        follower.userId === userId && follower.followedById === followedById
    )
  );
