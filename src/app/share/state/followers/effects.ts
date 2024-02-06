import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as FollowersActions from './actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { FollowersService } from '../../services/followers.service';

@Injectable()
export class FollowersEffects {
  constructor(
    private actions$: Actions,
    private followersService: FollowersService
  ) {}

  getFollowers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowersActions.getFollowers),
      mergeMap((action) =>
        this.followersService.getFollowers().pipe(
          map((followers) =>
            FollowersActions.getFollowersSuccess({ followers })
          ),
          catchError((error) =>
            of(FollowersActions.getFollowersFailure({ error: error.message }))
          )
        )
      )
    );
  });

  addFollower$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowersActions.addFollower),
      switchMap((action) =>
        this.followersService.addFollower(action.follower).pipe(
          map((follower) => FollowersActions.addFollowerSuccess({ follower })),
          catchError((error) =>
            of(FollowersActions.addFollowerFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteFollower$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowersActions.deleteFollower),
      switchMap((action) =>
        this.followersService.deleteFollower(action.id).pipe(
          map((id) => FollowersActions.deleteFollowerSuccess({ id })),
          catchError((error) =>
            of(FollowersActions.deleteFollowerFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteFollowers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FollowersActions.deleteFollowersByUserId),
      switchMap((action) =>
        this.followersService
          .deleteFollowersByUserId(action.userId, action.ids)
          .pipe(
            map((userId) =>
              FollowersActions.deleteFollowersByUserIdSuccess({ userId })
            ),
            catchError((error) =>
              of(
                FollowersActions.deleteFollowersByUserIdFailure({
                  error: error.message,
                })
              )
            )
          )
      )
    );
  });
}
