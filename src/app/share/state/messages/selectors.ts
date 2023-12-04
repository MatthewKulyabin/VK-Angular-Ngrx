import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app-state-interface';

export const selectFeature = (state: AppStateInterface) => state.messages;

export const messagesIsLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const messageSelectorById = (messageId: number) =>
  createSelector(selectFeature, (state) =>
    state.messages.find((message) => message.id === messageId)
  );

export const messagesSelectorByUserId = (userId: number) =>
  createSelector(selectFeature, (state) => {
    const sentMessages = state.messages.filter(
      (messages) => messages.userId === userId
    );
    const receivedMessages = state.messages.filter(
      (messages) => messages.receiverId === userId
    );
    return [...sentMessages, ...receivedMessages];
  });

export const messagesSelectorDiolog = (userId: number, receiverId: number) =>
  createSelector(selectFeature, (state) =>
    state.messages.filter(
      (message) =>
        message.userId === userId && message.receiverId === receiverId
    )
  );
