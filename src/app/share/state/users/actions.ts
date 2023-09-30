import { createAction, props } from '@ngrx/store';
import { UserInterface } from '../../types/user-interface';

// [Users] Get Users
export const getUsers = createAction('[Users] Get Users');
export const getUsersSuccess = createAction(
  '[Users] Get Users success',
  props<{ users: UserInterface[] }>()
);
export const getUsersFailure = createAction(
  '[Users] Get Users failure',
  props<{ error: string }>()
);

// [Users] Add User
export const addUser = createAction(
  '[Users] Add User',
  props<{ user: UserInterface }>()
);
export const addUserSuccess = createAction(
  '[Users] Add User success',
  props<{ user: UserInterface }>()
);
export const addUserFailure = createAction(
  '[Users] Add User failure',
  props<{ error: string }>()
);

// [Users] Edit User
export const editUser = createAction(
  '[Users] Edit User',
  props<{ user: UserInterface }>()
);
export const editUserSuccess = createAction(
  '[Users] Edit User success',
  props<{ user: UserInterface }>()
);
export const editUserFailure = createAction(
  '[Users] Edit User failure',
  props<{ error: string }>()
);

// [Users] Delete User
export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);
export const deleteUserSuccess = createAction(
  '[Users] Delete User success',
  props<{ id: number }>()
);
export const deleteUserFailure = createAction(
  '[Users] Delete User failure',
  props<{ error: string }>()
);
