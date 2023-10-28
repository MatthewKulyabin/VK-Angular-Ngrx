import { createReducer, on } from '@ngrx/store';

import { PostsStateInterface } from './types/posts-state-interface';
import * as PostsActions from './actions';

export const initialState: PostsStateInterface = {
  isLoading: false,
  posts: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  // [Posts] Get Posts
  on(PostsActions.getPosts, (state) => ({ ...state, isLoading: true })),
  on(PostsActions.getPostsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    posts: action.posts,
  })),
  on(PostsActions.getPostsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // [Posts] Patch Photo
  on(PostsActions.patchPhoto, (state, action) => ({ ...state })),
  on(PostsActions.patchPhotoSuccess, (state, action) => ({
    ...state,
    posts: [
      ...state.posts.map((post) =>
        post.id === action.post.id ? action.post : post
      ),
    ],
  })),
  on(PostsActions.patchPhotoFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Posts] Add Post
  on(PostsActions.addPostSuccess, (state, action) => ({
    ...state,
    posts: [action.post, ...state.posts],
  })),
  on(PostsActions.addPostFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Posts] Edit Post
  on(PostsActions.editPostSuccess, (state, action) => {
    return {
      ...state,
      posts: [
        ...state.posts.map((post) =>
          post.id === action.post.id ? action.post : post
        ),
      ],
    };
  }),
  on(PostsActions.editPostFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Posts] Delete Post
  on(PostsActions.deletePostSuccess, (state, action) => ({
    ...state,
    posts: [...state.posts.filter((post) => post.id !== action.id)],
  })),
  on(PostsActions.deletePostFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
