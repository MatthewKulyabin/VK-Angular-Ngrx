import { createReducer, on } from '@ngrx/store';

import * as FollowersActions from './actions';
import { FollowersStateInterface } from './types/followers-state-interface';

const initialState: FollowersStateInterface = {
  isLoading: false,
  followers: [],
  error: null,
};

export const reducers = createReducer(
  initialState,

  // [Followers] Get Followers
  on(FollowersActions.getFollowers, (state) => ({ ...state, isLoading: true })),
  on(FollowersActions.getFollowersSuccess, (state, action) => ({
    ...state,
    followers: action.followers,
    isLoading: false,
  })),
  on(FollowersActions.getFollowersFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // [Followers] Add Follower
  on(FollowersActions.addFollowerSuccess, (state, action) => ({
    ...state,
    followers: [...state.followers, action.follower],
  })),
  on(FollowersActions.addFollowerFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Followers] Delete Follower
  on(FollowersActions.deleteFollowerSuccess, (state, action) => ({
    ...state,
    followers: [
      ...state.followers.filter(
        (follower) => follower.id !== Number(action.id)
      ),
    ],
  })),
  on(FollowersActions.deleteFollowerFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Followers] Delete Followers by UserId
  on(FollowersActions.deleteFollowersByUserIdSuccess, (state, action) => ({
    ...state,
    followers: [
      ...state.followers.filter(
        (follower) => follower.userId !== action.userId
      ),
    ],
  })),
  on(FollowersActions.deleteFollowersByUserIdFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
