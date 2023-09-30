import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import * as UserActions from '../../share/state/users/actions';
import { UserInterface } from 'src/app/share/types/user-interface';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  constructor(private store: Store<AppStateInterface>) {}

  addUser(): void {
    const newUser: UserInterface = {
      email: 'newUser@gmail.com',
      password: 'newUser',
      firstName: 'newUser',
      lastName: 'newUser',
      middleName: 'newUser',
      age: 20,
    };
    this.store.dispatch(UserActions.addUser({ user: newUser }));
  }
}
