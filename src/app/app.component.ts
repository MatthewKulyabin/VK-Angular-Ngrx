import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as UsersActions from './share/state/users/actions';
import * as FollowersActions from './share/state/followers/actions';
import { AppStateInterface } from './share/state/app-state-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vk';

  constructor(private store: Store<AppStateInterface>) {
    store.dispatch(FollowersActions.getFollowers());
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
  }
}
