import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app-state-interface';

export const selectFeature = (state: AppStateInterface) => state.posts;

export const postIsLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const postsSelector = createSelector(
  selectFeature,
  (state) => state.posts
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

// export const newPostId = createSelector(
//   selectFeature,
//   (state) => state.posts[state.posts.length - 1].id
// );
