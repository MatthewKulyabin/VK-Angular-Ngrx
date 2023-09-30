import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as FriendsActions from './actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { FriendsService } from '../../services/friends.service';

@Injectable()
export class FriendsEffects {
  constructor(
    private actions$: Actions,
    private friendsService: FriendsService
  ) {}

  getFriends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendsActions.getFriends),
      mergeMap((action) =>
        this.friendsService.getFriends().pipe(
          map((friends) => FriendsActions.getFriendsSuccess({ friends })),
          catchError((error) =>
            of(FriendsActions.getFriendsFailure({ error: error.message }))
          )
        )
      )
    );
  });

  addFriend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendsActions.addFriend),
      switchMap((action) =>
        this.friendsService.addFriend(action.friend).pipe(
          map((friend) => FriendsActions.addFriendSuccess({ friend })),
          catchError((error) =>
            of(FriendsActions.addFriendFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteFriend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FriendsActions.deleteFriend),
      switchMap((action) =>
        this.friendsService.deleteFriend(action.id).pipe(
          map((id) => FriendsActions.deleteFriendSuccess({ id })),
          catchError((error) =>
            of(FriendsActions.deleteFriendFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
