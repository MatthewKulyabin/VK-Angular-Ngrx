import { AudioStateInterface } from './audio/types/audio-state-interface';
import { FollowersStateInterface } from './followers/types/followers-state-interface';
import { MessageStateInterface } from './messages/types/message-state-interface';
import { PostsStateInterface } from './posts/types/posts-state-interface';
import { UsersStateInterface } from './users/types/users-state-interface';

export interface AppStateInterface {
  posts: PostsStateInterface;
  users: UsersStateInterface;
  followers: FollowersStateInterface;
  audio: AudioStateInterface;
  messages: MessageStateInterface;
}
