import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../app-state-interface';

export const selectMessages = (state: AppStateInterface) => state.messages;

export const messagesIsLoadingSelector = createSelector(
  selectMessages,
  (state) => state.isLoading
);

export const messageSelectorById = (messageId: number) =>
  createSelector(selectMessages, (state) =>
    state.messages.find((message) => message.id === messageId)
  );

export const messagesSelectorByUserId = (userId: number) =>
  createSelector(selectMessages, (state) => {
    const sentMessages = state.messages.filter(
      (messages) => messages.userId === userId
    );
    const receivedMessages = state.messages.filter(
      (messages) => messages.receiverId === userId
    );
    return [...sentMessages, ...receivedMessages];
  });

export const messagesSelectorDiolog = (userId: number, receiverId: number) =>
  createSelector(selectMessages, (state) =>
    state.messages.filter((message) => {
      return (
        (message.userId === userId && message.receiverId === receiverId) ||
        (message.userId === receiverId && message.receiverId === userId)
      );
    })
  );

export const messagesLatestSelector = (userId: number, receiverId: number) =>
  createSelector(
    selectMessages,
    messagesSelectorDiolog(userId, receiverId),
    (state, messages) => {
      return {
        lastMessage: messages[messages.length - 1].message,
        lastMessageTime: new Date(
          messages[messages.length - 1].publish_date
        ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }
  );
