import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as MessagesActions from '../../../share/state/messages/actions';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { messageSelectorById } from 'src/app/share/state/messages/selectors';
import { MessageInterface } from 'src/app/share/types/message-interface';
import { UserInterface } from 'src/app/share/types/user-interface';

@Component({
  selector: 'app-message-right-side',
  templateUrl: './message-right-side.component.html',
  styleUrls: ['./message-right-side.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageRightSideComponent {
  @ViewChild('diolog') diolog: any;
  @Input() messagesDiologUser$!: Observable<UserInterface>;
  @Input() messagesDiolog$!: Observable<MessageInterface[]>;
  @Input() receiverUserId!: number;

  currentUserId: number;
  messageForm: FormGroup;

  isAddMessage: boolean = true;
  messageToEdit!: Observable<MessageInterface | undefined>;
  messageToEditId!: number;

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppStateInterface>
  ) {
    this.currentUserId = localStorageService.getCurrentUserId();

    this.messageForm = new FormGroup({
      message: new FormControl('', { validators: [Validators.required] }),
    });
  }

  sendMessage(): void {
    if (this.receiverUserId) {
      this.store.dispatch(
        MessagesActions.addMessage({
          message: {
            userId: this.localStorageService.getCurrentUserId(),
            receiverId: this.receiverUserId,
            message: this.messageForm.value.message,
            publish_date: new Date(),
          },
        })
      );
    }
    this.messageForm.reset();
  }
  updateMessage(messageId: number | undefined): void {
    this.isAddMessage = false;
    this.messageToEditId = messageId as number;

    if (messageId) {
      this.messageToEdit = this.store.select(messageSelectorById(messageId));
    }
    this.messageToEdit
      .subscribe((message) => {
        this.messageForm.reset({
          message: message?.message,
        });
      })
      .unsubscribe();
  }
  closeUpdateMessage(): void {
    this.isAddMessage = true;
    if (this.isAddMessage) {
      this.messageForm.reset();
      return;
    }
  }
  editMessage(): void {
    this.store.dispatch(
      MessagesActions.editMessage({
        message: {
          id: this.messageToEditId,
          userId: this.localStorageService.getCurrentUserId(),
          receiverId: this.receiverUserId,
          message: this.messageForm.value.message,
          publish_date: new Date(),
        },
      })
    );
    this.closeUpdateMessage();
  }

  deleteMessage(messageId: number | undefined): void {
    this.store.dispatch(
      MessagesActions.deleteMessage({ id: messageId as number })
    );
  }

  getLastMessageDateTime(messages: MessageInterface[] | null): string {
    messages = (messages as MessageInterface[]).filter(
      (message) =>
        message.userId !== this.localStorageService.getCurrentUserId()
    );
    if (!messages.length) return '';
    const date = new Date(
      messages[messages.length - 1].publish_date
    ).toLocaleDateString();
    const time = new Date(
      messages[messages.length - 1].publish_date
    ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `last seen ${date} at ${time}`;
  }

  checkNewDate(messages: MessageInterface[] | null, index: number): boolean {
    messages = messages as MessageInterface[];
    if (!index) return true;
    const firstDate = new Date(messages[index].publish_date).toDateString();
    const secondDate = new Date(
      messages[index - 1].publish_date
    ).toDateString();

    if (firstDate === secondDate) return false;
    return true;
  }
}
