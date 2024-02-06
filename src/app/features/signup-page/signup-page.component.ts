import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import * as UserActions from '../../share/state/users/actions';
import { UserInterface } from 'src/app/share/types/user-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { Observable, Subscription } from 'rxjs';
import { usersSelector } from 'src/app/share/state/users/selectors';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnDestroy {
  users$: Observable<UserInterface[]>;
  userForm: FormGroup;
  userExistsError: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.users$ = store.select(usersSelector);

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
    this.subscriptions.push(
      this.users$.subscribe((users) => {
        const userExists = users.find(
          (user) => user.email === this.userForm.value.email
        );
        if (!userExists) {
          this.userExistsError = false;
          const newUser: UserInterface = {
            id: Date.now(),
            email: this.userForm.value.email,
            password: this.userForm.value.password,
            name: 'Newbie',
            birthDate: new Date('1995-01-01'),
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
          this.router.navigate([`/profile/${newUser.id}`]);
        } else {
          this.userExistsError = true;
        }
      })
    );

    this.subscriptions[this.subscriptions.length - 1].unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
