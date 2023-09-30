import { FriendInterface } from 'src/app/share/types/friend-interface';

export interface FriendsStateInterface {
  isLoading: boolean;
  friends: FriendInterface[];
  error: string | null;
}
