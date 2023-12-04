import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app-state-interface';
import {
  messagesIsLoadingSelector,
  messagesSelectorByUserId,
} from '../messages/selectors';
import { UserInterface } from '../../types/user-interface';

export const selectFeature = (state: AppStateInterface) => state.users;
export const selectMessages = (state: AppStateInterface) => state.messages;

export const usersSelector = createSelector(
  selectFeature,
  (state) => state.users
);

export const userSelectorById = (id: number) =>
  createSelector(
    selectFeature,
    (state) => state.users.find((user) => user.id === id) as UserInterface
  );

export const usersSelectorByIds = (userId: number) =>
  // createSelector(selectFeature, (state) => {
  //   console.log(ids.map((id) => state.users.find((user) => user.id === id)));
  //   return ids.map((id) => state.users.find((user) => user.id === id));
  // });
  createSelector(
    selectFeature,
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
// createSelector(selectFeature, (state) =>
//   state.users.filter((user) => user.id === userId)
// );
