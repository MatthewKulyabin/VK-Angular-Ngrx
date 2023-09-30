import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UsersActions from './actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.getUsers),
      mergeMap(() => {
        return this.userService.getUsers().pipe(
          map((users) => UsersActions.getUsersSuccess({ users })),
          catchError((error) =>
            of(UsersActions.getUsersFailure({ error: error.message }))
          )
        );
      })
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap((action) => {
        return this.userService.addUser(action.user).pipe(
          map((user) => UsersActions.addUserSuccess({ user })),
          catchError((error) => of(UsersActions.addUserFailure(error.message)))
        );
      })
    );
  });

  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.editUser),
      switchMap((action) =>
        this.userService.editUser(action.user).pipe(
          map((user) => UsersActions.editUserSuccess({ user })),
          catchError((error) =>
            of(UsersActions.editUserFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap((action) =>
        this.userService
          .deleteUser(action.id)
          .pipe()
          .pipe(
            map((id) => UsersActions.deleteUserSuccess({ id })),
            catchError((error) =>
              of(UsersActions.deleteUserFailure({ error: error.message }))
            )
          )
      )
    );
  });
}
