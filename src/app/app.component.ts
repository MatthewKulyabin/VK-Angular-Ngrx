import { Component, OnInit } from '@angular/core';

import * as UsersActions from './share/state/users/actions';
import { AppStateInterface } from './share/state/app-state-interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'vk';

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
  }
}
