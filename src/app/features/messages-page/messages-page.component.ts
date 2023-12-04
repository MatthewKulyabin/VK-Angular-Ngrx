import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as MessagesActions from '../../share/state/messages/actions';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import {
  messageSelectorById,
  messagesSelectorByUserId,
  messagesSelectorDiolog,
} from 'src/app/share/state/messages/selectors';
import { MessageInterface } from 'src/app/share/types/message-interface';
import { UserInterface } from 'src/app/share/types/user-interface';
import {
  userSelectorById,
  usersSelectorByIds,
} from 'src/app/share/state/users/selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent {
  @ViewChild('diolog') diolog!: any;
  users$: Observable<UserInterface[]>;

  messagesByCurrentUserId$!: Observable<MessageInterface[]>;
  messagesDiolog$!: Observable<MessageInterface[]>;
  messagesDiologUser$!: Observable<UserInterface>;

  currentUserId: number;
  receiverUserId!: number;

  messageForm: FormGroup;

  isAddMessage: boolean = true;
  messageToEdit!: Observable<MessageInterface | undefined>;
  messageToEditId!: number;

  photo: any;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserId = this.localStorageService.getCurrentUserId();
    this.store.dispatch(MessagesActions.getMessages());
    this.messagesByCurrentUserId$ = this.store.select(
      messagesSelectorByUserId(this.localStorageService.getCurrentUserId())
    );

    this.users$ = this.store.select(
      usersSelectorByIds(this.localStorageService.getCurrentUserId())
    );

    this.messageForm = new FormGroup({
      message: new FormControl('', { validators: [Validators.required] }),
    });
  }

  chooseDiolog(receiverId: number): void {
    this.receiverUserId = receiverId;
    this.messagesDiolog$ = this.store.select(
      messagesSelectorDiolog(
        this.localStorageService.getCurrentUserId(),
        receiverId
      )
    );

    this.messagesDiologUser$ = this.store.select(userSelectorById(receiverId));
    this.diolog.nativeElement.scrollTop =
      this.diolog.nativeElement.scrollHeight;
  }

  sentMessage(): void {
    this.diolog.nativeElement.scrollTop =
      this.diolog.nativeElement.scrollHeight;
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
    this.messageToEdit.subscribe((message) => {
      this.messageForm.reset({
        message: message?.message,
      });
    });
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
  }

  deleteMessage(messageId: number | undefined): void {
    this.store.dispatch(
      MessagesActions.deleteMessage({ id: messageId as number })
    );
  }

  onImagePicked(event: Event): void {
    let file: any = event.target;
    this.photo = file.files[0];
  }
}
