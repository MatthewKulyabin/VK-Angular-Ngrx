import { MessageInterface } from 'src/app/share/types/message-interface';

export interface MessageStateInterface {
  isLoading: boolean;
  messages: MessageInterface[];
  error: string | null;
}
