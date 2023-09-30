import { createReducer, on } from '@ngrx/store';
import { UsersStateInterface } from './types/users-state-interface';
import * as UsersActions from './actions';

export const initialState: UsersStateInterface = {
  isLoading: false,
  users: [],
  error: null,
};

export const reducers = createReducer(
  initialState,

  // [Users] Get Users
  on(UsersActions.getUsers, (state) => ({ ...state, isLoading: true })),
  on(UsersActions.getUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
    isLoading: false,
  })),
  on(UsersActions.getUsersFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // [Users] Add User
  on(UsersActions.addUserSuccess, (state, action) => ({
    ...state,
    users: [...state.users, action.user],
  })),
  on(UsersActions.addUserFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Users] Edit User
  on(UsersActions.editUserSuccess, (state, action) => ({
    ...state,
    users: [
      ...state.users.map((user) =>
        user.id === action.user.id ? action.user : user
      ),
    ],
  })),
  on(UsersActions.editUserFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Users] Delete User
  on(UsersActions.deleteUserSuccess, (state, action) => ({
    ...state,
    users: [...state.users.filter((user) => user.id !== action.id)],
  })),
  on(UsersActions.deleteUserFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
