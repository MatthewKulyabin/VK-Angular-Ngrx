import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { messagesLatestSelector } from 'src/app/share/state/messages/selectors';
import { UserInterface } from 'src/app/share/types/user-interface';

@Component({
  selector: 'app-message-left-side',
  templateUrl: './message-left-side.component.html',
  styleUrls: ['./message-left-side.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageLeftSideComponent {
  @Input() users$!: Observable<UserInterface[]>;
  @Input() chooseDiolog!: (id: number) => void;

  searchForm: FormGroup;
  foundUsers?: UserInterface[];

  constructor(
    private store: Store<AppStateInterface>,
    protected localStorageSercice: LocalStorageService
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  showResult(): void {
    this.users$
      .subscribe(
        (users) =>
          (this.foundUsers = users.filter((user) =>
            user?.name
              .toLowerCase()
              .includes(this.searchForm.value.search.toLowerCase())
          ))
      )
      .unsubscribe();
  }

  closeResult(): void {
    this.foundUsers = undefined;
    this.searchForm.reset();
  }

  getLastMessage(
    userId: number
  ): Observable<{ lastMessage: string; lastMessageTime: string }> {
    return this.store.select(
      messagesLatestSelector(
        userId,
        this.localStorageSercice.getCurrentUserId()
      )
    );
  }
}
