import { createAction, props } from '@ngrx/store';
import { MessageInterface } from '../../types/message-interface';

// [Messages] Get Messages
export const getMessages = createAction('[Messages] Get Messages');
export const getMessagesSuccess = createAction(
  '[Messages] Get Messages success',
  props<{ messages: MessageInterface[] }>()
);
export const getMessagesFailure = createAction(
  '[Messages] Get Messages failure',
  props<{ error: string }>()
);

// [Messages] Add Messages
export const addMessage = createAction(
  '[Messages] Add Message',
  props<{ message: MessageInterface }>()
);
export const addMessageSuccess = createAction(
  '[Messages] Add Message success',
  props<{ message: MessageInterface }>()
);
export const addMessageFailure = createAction(
  '[Messages] Add Message failure',
  props<{ error: string }>()
);

// [Messages] Edit Messages
export const editMessage = createAction(
  '[Messages] Edit Message',
  props<{ message: MessageInterface }>()
);
export const editMessageSuccess = createAction(
  '[Messages] Edit Message success',
  props<{ message: MessageInterface }>()
);
export const editMessageFailure = createAction(
  '[Messages] Edit Message failure',
  props<{ error: string }>()
);

// [Messages] Delete Messages
export const deleteMessage = createAction(
  '[Messages] Delete Message',
  props<{ id: number }>()
);
export const deleteMessageSuccess = createAction(
  '[Messages] Delete Message success',
  props<{ id: number }>()
);
export const deleteMessageFailure = createAction(
  '[Messages] Delete Message failure',
  props<{ error: string }>()
);
