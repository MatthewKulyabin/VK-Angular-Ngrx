import { createReducer, on } from '@ngrx/store';

import * as FriendsActions from './actions';
import { FriendsStateInterface } from './types/friends-state-interface';

const initialState: FriendsStateInterface = {
  isLoading: false,
  friends: [],
  error: null,
};

export const reducers = createReducer(
  initialState,

  // [Friends] Get Friends
  on(FriendsActions.getFriends, (state) => ({ ...state, isLoading: true })),
  on(FriendsActions.getFriendsSuccess, (state, action) => ({
    ...state,
    friends: action.friends,
    isLoading: false,
  })),
  on(FriendsActions.getFriendsFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // [Friends] Add Friend
  on(FriendsActions.addFriendSuccess, (state, action) => ({
    ...state,
    friends: [...state.friends, action.friend],
  })),
  on(FriendsActions.addFriendFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Friends] Delete Friend
  on(FriendsActions.deleteFriendSuccess, (state, action) => ({
    ...state,
    friends: [...state.friends.filter((friend) => friend.id !== action.id)],
  })),
  on(FriendsActions.deleteFriendFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
