import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../app-state-interface';

export const selectPosts = (state: AppStateInterface) => state.posts;

export const postIsLoadingSelector = createSelector(
  selectPosts,
  (state) => state.isLoading
);

export const postsSelector = createSelector(
  selectPosts,
  (state) => state.posts
);

export const postsSelectorByUserId = (userId: number) =>
  createSelector(selectPosts, (state) =>
    state.posts.filter((post) => post.userId === userId)
  );

export const errorSelector = createSelector(
  selectPosts,
  (state) => state.error
);

// export const newPostId = createSelector(
//   selectPosts,
//   (state) => state.posts[state.posts.length - 1].id
// );
