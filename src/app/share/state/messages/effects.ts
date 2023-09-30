import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MessagesActions from './actions';
import { MessagesService } from '../../services/messages.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: MessagesService
  ) {}

  getMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.getMessages),
      mergeMap(() =>
        this.messagesService.getMessages().pipe(
          map((messages) => MessagesActions.getMessagesSuccess({ messages })),
          catchError((error) =>
            of(MessagesActions.getMessagesFailure({ error: error.message }))
          )
        )
      )
    );
  });

  addMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.addMessage),
      switchMap((action) =>
        this.messagesService.addMessage(action.message).pipe(
          map((message) => MessagesActions.addMessageSuccess({ message })),
          catchError((error) =>
            of(MessagesActions.addMessageFailure({ error: error.message }))
          )
        )
      )
    );
  });

  editMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.editMessage),
      switchMap((action) =>
        this.messagesService.editMessage(action.message).pipe(
          map((message) => MessagesActions.editMessageSuccess({ message })),
          catchError((error) =>
            of(MessagesActions.editMessageFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.deleteMessage),
      switchMap((action) =>
        this.messagesService.deleteMessage(action.id).pipe(
          map((id) => MessagesActions.deleteMessageSuccess({ id })),
          catchError((error) =>
            of(MessagesActions.deleteMessageFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
