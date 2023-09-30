import { createAction, props } from '@ngrx/store';
import { FriendInterface } from '../../types/friend-interface';

// [Friends] Get Friends
export const getFriends = createAction('[Friends] Get Friends');
export const getFriendsSuccess = createAction(
  '[Friends] Get Friends success',
  props<{ friends: FriendInterface[] }>()
);
export const getFriendsFailure = createAction(
  '[Friends] Get Friends failure',
  props<{ error: string }>()
);

// [Friends] Add Friend
export const addFriend = createAction(
  '[Friends] Add Friend',
  props<{ friend: FriendInterface }>()
);
export const addFriendSuccess = createAction(
  '[Friends] Add Friend success',
  props<{ friend: FriendInterface }>()
);
export const addFriendFailure = createAction(
  '[Friends] Add Friend failure',
  props<{ error: string }>()
);

// [Friends] Delete Friend
export const deleteFriend = createAction(
  '[Friends] Delete Friend',
  props<{ id: number }>()
);
export const deleteFriendSuccess = createAction(
  '[Friends] Delete Friend success',
  props<{ id: number }>()
);
export const deleteFriendFailure = createAction(
  '[Friends] Delete Friend failure',
  props<{ error: string }>()
);
