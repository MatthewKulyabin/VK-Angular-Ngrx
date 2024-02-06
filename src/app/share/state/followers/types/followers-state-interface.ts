import { FollowersInterface } from 'src/app/share/types/followers-interface';

export interface FollowersStateInterface {
  isLoading: boolean;
  followers: FollowersInterface[];
  error: string | null;
}
