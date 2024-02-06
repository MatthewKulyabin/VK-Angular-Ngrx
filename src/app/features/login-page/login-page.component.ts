import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { usersSelector } from 'src/app/share/state/users/selectors';
import { UserInterface } from 'src/app/share/types/user-interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnDestroy {
  usersList$: Observable<UserInterface[]>;
  loginError!: string;

  loginForm: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.usersList$ = store.select(usersSelector);
    this.loginForm = new FormGroup({
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

  loginUser(): void {
    let emailExists: boolean = false;
    let passwordIsCorrect: boolean = false;

    this.subscriptions.push(
      this.usersList$.subscribe((users) => {
        if (!users.length) {
          this.loginError = 'Email or Password are not correct';
          return;
        }
        users.map((user) => {
          user.email === this.loginForm.value.email
            ? (emailExists = true)
            : (emailExists = false);
          user.password === this.loginForm.value.password
            ? (passwordIsCorrect = true)
            : (passwordIsCorrect = false);
          if (emailExists && passwordIsCorrect) {
            this.localStorageService.setCurrentUserId(user.id);
            this.router.navigate([`/profile/${user.id}`]);
          } else {
            this.loginError = 'Email or Password are not correct';
          }
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
