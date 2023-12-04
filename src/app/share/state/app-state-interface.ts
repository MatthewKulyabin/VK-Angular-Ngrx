import { AudioStateInterface } from './audio/types/audio-state-interface';
import { FriendsStateInterface } from './friends/types/friends-state-interface';
import { MessageStateInterface } from './messages/types/message-state-interface';
import { PostsStateInterface } from './posts/types/posts-state-interface';
import { UsersStateInterface } from './users/types/users-state-interface';

export interface AppStateInterface {
  posts: PostsStateInterface;
  users: UsersStateInterface;
  friends: FriendsStateInterface;
  audio: AudioStateInterface;
  messages: MessageStateInterface;
}
