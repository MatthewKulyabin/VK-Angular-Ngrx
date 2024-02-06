import { createAction, props } from '@ngrx/store';

import { FollowersInterface } from '../../types/followers-interface';

// [Followers] Get Followers
export const getFollowers = createAction('[Followers] Get Followers');
export const getFollowersSuccess = createAction(
  '[Followers] Get Followers success',
  props<{ followers: FollowersInterface[] }>()
);
export const getFollowersFailure = createAction(
  '[Followers] Get Followers failure',
  props<{ error: string }>()
);

// [Followers] Add Follower
export const addFollower = createAction(
  '[Followers] Add Follower',
  props<{ follower: FollowersInterface }>()
);
export const addFollowerSuccess = createAction(
  '[Followers] Add Follower success',
  props<{ follower: FollowersInterface }>()
);
export const addFollowerFailure = createAction(
  '[Followers] Add Follower failure',
  props<{ error: string }>()
);

// [Followers] Delete Follower
export const deleteFollower = createAction(
  '[Followers] Delete Follower',
  props<{ id: number }>()
);
export const deleteFollowerSuccess = createAction(
  '[Followers] Delete Follower success',
  props<{ id: number }>()
);
export const deleteFollowerFailure = createAction(
  '[Followers] Delete Follower failure',
  props<{ error: string }>()
);

// [Followers] Delete Followers by UserId
export const deleteFollowersByUserId = createAction(
  '[Followers] Delete Followers by UserId',
  props<{ userId: number; ids: Array<number> }>()
);
export const deleteFollowersByUserIdSuccess = createAction(
  '[Followers] Delete Followers by UserId Success',
  props<{ userId: number }>()
);
export const deleteFollowersByUserIdFailure = createAction(
  '[Followers] Delete Followers by UserId Failure',
  props<{ error: string }>()
);
