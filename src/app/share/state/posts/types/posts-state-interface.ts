import { PostInterface } from '../../../types/post-interface';

export interface PostsStateInterface {
  isLoading: boolean;
  posts: PostInterface[];
  error: string | null;
}
