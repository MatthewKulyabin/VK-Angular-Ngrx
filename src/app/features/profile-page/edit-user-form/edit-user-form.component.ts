import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as UsersActions from '../../../share/state/users/actions';
import { birthDateValidation } from 'src/app/share/custom-validators/birthDateValidation';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { UserInterface } from 'src/app/share/types/user-interface';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent implements OnInit, OnDestroy {
  @Input() currentUser$!: Observable<UserInterface | undefined>;
  @Input() openModal!: boolean;
  @Input() closeModal!: () => void;
  @Input() onOpenModal!: () => void;

  updateImage: boolean = false;

  userForm: FormGroup;

  isPasswordShown: boolean = false;

  photo!: any;
  filename = '';

  subscriptions: Subscription[] = [];

  constructor(
    protected store: Store<AppStateInterface>,
    protected route: ActivatedRoute
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
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(70),
        ],
      }),
      birthDate: new FormControl('', {
        validators: [Validators.required, birthDateValidation],
      }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      mobile: new FormControl('', {
        validators: [Validators.minLength(4), Validators.maxLength(15)],
      }),
      address: new FormControl('', { validators: [Validators.maxLength(50)] }),
      photo: new FormControl<any>(null),
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.currentUser$.subscribe((user) => {
        this.userForm.reset({
          name: user?.name,
          email: user?.email,
          password: user?.password,
          birthDate: user?.birthDate,
          description: user?.description,
          mobile: user?.mobile,
          address: user?.address,
        });
        this.photo = user?.photo;
      })
    );
  }

  onImagePicked(event: Event): void {
    let file: any = event.target;
    this.photo = file.files[0];
    this.updateImage = true;
  }

  onSubmit(): void {
    this.filename = this.photo?.name;
    const formData = new FormData();
    formData.append('photo', this.photo);

    const editedUser: UserInterface = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      name: this.userForm.value.name,
      birthDate: this.userForm.value.birthDate,
      description: this.userForm.value.description,
      mobile: this.userForm.value.mobile,
      address: this.userForm.value.address,
      photo: this.photo,
    };

    this.store.dispatch(UsersActions.editUser({ user: editedUser }));

    if (this.filename && this.updateImage) {
      this.store.dispatch(
        UsersActions.patchPhoto({
          id: Number(this.route.snapshot.paramMap.get('id')),
          photo: formData,
        })
      );
    }

    this.closeModal();
  }

  showPassword(): void {
    this.isPasswordShown = !this.isPasswordShown;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
