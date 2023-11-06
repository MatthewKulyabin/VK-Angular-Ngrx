import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import * as FriendsActions from 'src/app/share/state/friends/actions';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(FriendsActions.getFriends());
  }
}
