import { UserInterface } from 'src/app/share/types/user-interface';

export interface UsersStateInterface {
  isLoading: boolean;
  users: UserInterface[];
  error: string | null;
}
