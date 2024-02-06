import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

import * as PostsActions from './actions';
import { PostsService } from 'src/app/share/services/posts.service';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map(
            (posts) => PostsActions.getPostsSuccess({ posts }),
            catchError((error) =>
              of(PostsActions.getPostsFailure({ error: error.message }))
            )
          )
        );
      })
    );
  });

  patchPhoto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.patchPhoto),
      switchMap((action) => {
        return this.postsService.patchPhoto(action.id, action.photo).pipe(
          map((post) => PostsActions.patchPhotoSuccess({ post })),
          catchError((error) => of(PostsActions.patchPhotoFailure({ error })))
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.addPost),
      switchMap((action) => {
        return this.postsService.addPost(action.post, action.photo).pipe(
          map(
            (post) => PostsActions.addPostSuccess({ post }),
            catchError((error) =>
              of(PostsActions.addPostFailure({ error: error.message }))
            )
          )
        );
      })
    );
  });

  editPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.editPost),
      switchMap((action) => {
        return this.postsService.editPost(action.post).pipe(
          map((post) => {
            return PostsActions.editPostSuccess({ post });
          }),
          catchError((error) =>
            of(PostsActions.editPostFailure({ error: error.message }))
          )
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((id) => PostsActions.deletePostSuccess({ id })),
          catchError((error) =>
            of(PostsActions.deletePostFailure({ error: error.message }))
          )
        );
      })
    );
  });

  deletePosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.deletePostsByUserId),
      switchMap((action) =>
        this.postsService.deletePostsByUserId(action.userId, action.ids).pipe(
          map((userId) => PostsActions.deletePostsByUserIdSuccess({ userId })),
          catchError((error) =>
            of(
              PostsActions.deletePostsByUserIdFailure({ error: error.message })
            )
          )
        )
      )
    );
  });
}
