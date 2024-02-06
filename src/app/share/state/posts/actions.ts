import { createAction, props } from '@ngrx/store';

import { PostInterface } from '../../types/post-interface';

// [Posts] Get Posts
export const getPosts = createAction('[Posts] Get Posts');
export const getPostsSuccess = createAction(
  '[Posts] Get Posts success',
  props<{ posts: PostInterface[] }>()
);
export const getPostsFailure = createAction(
  '[Posts] Get Posts failure',
  props<{ error: string }>()
);

// [Posts] Patch Photo
export const patchPhoto = createAction(
  '[Posts] Patch Photo',
  props<{ id: number; photo: FormData }>()
);
export const patchPhotoSuccess = createAction(
  '[Posts] Patch Photo success',
  props<{ post: PostInterface }>()
);
export const patchPhotoFailure = createAction(
  '[Posts] Patch Photo failure',
  props<{ error: string }>()
);

// [Posts] [Add Post]
export const addPost = createAction(
  '[Posts] Add Post',
  props<{ post: PostInterface; photo: FormData }>()
);
export const addPostSuccess = createAction(
  '[Posts] Add Post success',
  props<{ post: PostInterface }>()
);
export const addPostFailure = createAction(
  '[Posts] Add Post failure',
  props<{ error: string }>()
);

// [Posts] Edit Post
export const editPost = createAction(
  '[Posts] Edit Post',
  props<{ post: PostInterface }>()
);
export const editPostSuccess = createAction(
  '[Posts] Edit Post success',
  props<{ post: PostInterface }>()
);
export const editPostFailure = createAction(
  '[Posts] Edit Post failure',
  props<{ error: string }>()
);

// [Posts] Delete Post
export const deletePost = createAction(
  '[Posts] Delete Post',
  props<{ id: number }>()
);
export const deletePostSuccess = createAction(
  '[Posts] Delete Post success',
  props<{ id: number }>()
);
export const deletePostFailure = createAction(
  '[Posts] Delete Post failure',
  props<{ error: string }>()
);

// [Posts] Delete Posts by UserId
export const deletePostsByUserId = createAction(
  '[Posts] Delete Posts by UserId',
  props<{ userId: number; ids: Array<number> }>()
);
export const deletePostsByUserIdSuccess = createAction(
  '[Posts] Delete Posts by UserId Success',
  props<{ userId: number }>()
);
export const deletePostsByUserIdFailure = createAction(
  '[Posts] Delete Posts by UserId Failure',
  props<{ error: string }>()
);
