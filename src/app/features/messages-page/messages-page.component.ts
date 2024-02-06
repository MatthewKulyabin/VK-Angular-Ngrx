import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as MessagesActions from '../../share/state/messages/actions';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { messagesSelectorDiolog } from 'src/app/share/state/messages/selectors';
import { MessageInterface } from 'src/app/share/types/message-interface';
import { UserInterface } from 'src/app/share/types/user-interface';
import {
  userSelectorById,
  usersSelectorByIds,
} from 'src/app/share/state/users/selectors';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesPageComponent {
  users$: Observable<UserInterface[]>;

  messagesDiolog$!: Observable<MessageInterface[]>;
  messagesDiologUser$!: Observable<UserInterface>;

  receiverUserId!: number;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService
  ) {
    store.dispatch(MessagesActions.getMessages());

    this.users$ = store.select(
      usersSelectorByIds(localStorageService.getCurrentUserId())
    );
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
  }
}
