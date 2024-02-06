import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../app-state-interface';
import { messagesSelectorByUserId } from '../messages/selectors';
import { UserInterface } from '../../types/user-interface';

export const selectUsers = (state: AppStateInterface) => state.users;

export const usersSelector = createSelector(selectUsers, (state) => {
  return state.users;
});

export const userSelectorById = (id: number) =>
  createSelector(
    selectUsers,
    (state) => state.users.find((user) => user.id === id) as UserInterface
  );

export const usersSelectorByIds = (userId: number) =>
  createSelector(
    selectUsers,
    messagesSelectorByUserId(userId),
    (state, messages) => {
      const messagesUserIds = new Set(
        messages.map((message) => message.userId)
      );
      const messagesRecieverIds = new Set(
        messages.map((message) => message.receiverId)
      );
      const usersIdsToGet = Array.from(
        new Set([...messagesUserIds, ...messagesRecieverIds])
      ) as Array<number>;
      return usersIdsToGet.map((id) =>
        state.users.find((user) => user.id === id)
      ) as UserInterface[];
    }
  );

export const usersSelectorByName = (name: string) =>
  createSelector(selectUsers, (state) =>
    state.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    )
  );

export const userNameSelectorById = (id: number) =>
  createSelector(
    selectUsers,
    (state) => state.users.find((user) => user.id === id)?.name
  );
