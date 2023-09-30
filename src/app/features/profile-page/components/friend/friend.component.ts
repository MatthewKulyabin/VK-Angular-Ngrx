import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FriendsActions from 'src/app/share/state/friends/actions';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { FriendInterface } from 'src/app/share/types/friend-interface';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent {
  @Input() src?: string;
  @Input() name?: string;

  constructor(private store: Store<AppStateInterface>) {}

  addFriend(): void {
    const friend: FriendInterface = {
      userId: 1,
      friendId: 1,
    };
    this.store.dispatch(FriendsActions.addFriend({ friend }));
  }

  deleteFriend(): void {
    this.store.dispatch(FriendsActions.deleteFriend({ id: 2 }));
  }
}
