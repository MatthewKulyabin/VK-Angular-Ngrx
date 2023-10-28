import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import * as UserActions from '../../share/state/users/actions';
import { UserInterface } from 'src/app/share/types/user-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  userForm: FormGroup;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      }),
    });
  }

  addUser(): void {
    const newUser: UserInterface = {
      id: Date.now(),
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      name: 'Newbie',
      age: 21,
      description: "I'm new here",
      mobile: '7 777 777 77 77',
      address: 'Novosibirsk',
    };
    this.store.dispatch(UserActions.addUser({ user: newUser }));
    this.userForm.reset({
      email: '',
      password: '',
    });
    this.localStorageService.setCurrentUserId(newUser.id);
    this.router.navigate(['/profile']);
  }
}
