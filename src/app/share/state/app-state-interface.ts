import { FriendsStateInterface } from './friends/types/friends-state-interface';
import { PostsStateInterface } from './posts/types/posts-state-interface';
import { UsersStateInterface } from './users/types/users-state-interface';

export interface AppStateInterface {
  posts: PostsStateInterface;
  users: UsersStateInterface;
  friends: FriendsStateInterface;
}
