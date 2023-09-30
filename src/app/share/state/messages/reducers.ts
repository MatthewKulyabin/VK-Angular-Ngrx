import { createReducer, on } from '@ngrx/store';

import * as MessagesActions from './actions';
import { MessageStateInterface } from './types/message-state-interface';

const intialState: MessageStateInterface = {
  isLoading: false,
  messages: [],
  error: null,
};

export const reducers = createReducer(
  intialState,

  // [Messages] Get Messages
  on(MessagesActions.getMessages, (state) => ({ ...state, isLoading: true })),
  on(MessagesActions.getMessagesSuccess, (state, action) => ({
    ...state,
    messages: action.messages,
    isLoading: false,
  })),
  on(MessagesActions.getMessagesFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),

  // [Messages] Add Messages
  on(MessagesActions.addMessageSuccess, (state, action) => ({
    ...state,
    messages: [...state.messages, action.message],
  })),
  on(MessagesActions.addMessageFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Messages] Edit Messages
  on(MessagesActions.editMessageSuccess, (state, action) => ({
    ...state,
    messages: [
      ...state.messages.map((message) =>
        message.id === action.message.id ? action.message : message
      ),
    ],
  })),
  on(MessagesActions.editMessageFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // [Messages] Delete Messages
  on(MessagesActions.deleteMessageSuccess, (state, action) => ({
    ...state,
    messages: [...state.messages.filter((message) => message.id !== action.id)],
  })),
  on(MessagesActions.deleteMessageFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
