import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as PostsActions from '../../share/state/posts/actions';
import * as UsersActions from '../../share/state/users/actions';
import * as AudioActions from '../../share/state/audio/actions';
import * as MessagesActions from '../../share/state/messages/actions';
import {
  postIsLoadingSelector,
  postsSelectorByUserId,
} from '../../share/state/posts/selectors';
import { AppStateInterface } from '../../share/state/app-state-interface';
import { UserInterface } from 'src/app/share/types/user-interface';
import { userSelectorById } from 'src/app/share/state/users/selectors';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { birthDateValidation } from 'src/app/share/custom-validators/birthDateValidation';
import { Router } from '@angular/router';
import { PostInterface } from 'src/app/share/types/post-interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  currentUser$: Observable<UserInterface | undefined>;
  currentUser: UserInterface | undefined;

  postsByUserId$: Observable<PostInterface[]>;
  postsByUserIdIds: number[] | undefined;

  photo!: any;
  filename = '';

  userForm: FormGroup;

  openModal: boolean = false;
  showPassword: boolean = false;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.isLoading$ = store.pipe(select(postIsLoadingSelector));
    this.currentUser$ = store.pipe(
      select(userSelectorById(this.localStorageService.getCurrentUserId()))
    );
    this.currentUser$.subscribe((user) => console.log(user));

    this.postsByUserId$ = store.pipe(
      select(postsSelectorByUserId(this.localStorageService.getCurrentUserId()))
    );
    this.postsByUserId$.subscribe(
      (posts) => (this.postsByUserIdIds = posts.map((post) => post.id))
    );

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

  onOpenModal(): void {
    this.openModal = true;
    console.log(this.currentUser);
    this.userForm.reset({
      name: this.currentUser?.name,
      email: this.currentUser?.email,
      password: this.currentUser?.password,
      birthDate: this.currentUser?.age,
    });
  }

  closeModal(): void {
    this.openModal = false;
    console.log(this.postsByUserIdIds);
  }

  onImagePicked(event: Event): void {
    let file: any = event.target;
    this.photo = file.files[0];
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
    this.store.dispatch(PostsActions.getPosts());
    this.store.dispatch(AudioActions.getAudio());
    this.store.dispatch(MessagesActions.getMessages());

    this.userForm.reset({});
  }

  onSubmit(): void {
    this.filename = this.photo?.name;
    const formData = new FormData();
    formData.append('photo', this.photo);

    const editedUser: UserInterface = {
      id: this.localStorageService.getCurrentUserId(),
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      name: this.userForm.value.name,
      age: this.userForm.value.birthDate,
      description: this.userForm.value.description,
      mobile: this.userForm.value.mobile,
      address: this.userForm.value.address,
      photo: formData,
    };

    this.store.dispatch(UsersActions.editUser({ user: editedUser }));

    if (this.filename) {
      this.store.dispatch(
        UsersActions.patchPhoto({
          id: this.localStorageService.getCurrentUserId(),
          photo: formData,
        })
      );
    }
  }

  editUser(): void {}

  // editUser(): void {
  //   const newUser: UserInterface = {
  //     id: 3,
  //     email: 'newUser@gmail.com',
  //     password: 'newUser',
  //     firstName: 'Matthew123123',
  //     lastName: 'newUser',
  //     middleName: 'newUser',
  //     age: 20,
  //   };
  //   this.store.dispatch(UsersActions.editUser({ user: newUser }));
  // }
  deleteUser(): void {
    // this.store.dispatch(UsersActions.deleteUser({ id: 2 }));
    this.store.dispatch(
      PostsActions.deletePostsByUserId({
        userId: this.localStorageService.getCurrentUserId(),
        ids: this.postsByUserIdIds as number[],
      })
    );
    // this.router.navigate(['/signup']);
  }

  addAudio(): void {
    this.store.dispatch(
      AudioActions.addAudio({
        audio: {
          userId: 1,
          title: 'New Audio Title',
          author: 'New Audio Author',
          src: '/assets/audio/Snailkick.mp3',
        },
      })
    );
  }
  editAudio(): void {
    this.store.dispatch(
      AudioActions.editAudio({
        audio: {
          id: 2,
          userId: 1,
          title: 'New Audio Title',
          author: 'New Audio Author',
          src: '/assets/audio/Snailkick.mp3',
        },
      })
    );
  }
  deleteAudio(): void {
    this.store.dispatch(
      AudioActions.deleteAudio({
        id: this.localStorageService.getCurrentUserId(),
      })
    );
  }

  addMessage(): void {
    this.store.dispatch(
      MessagesActions.addMessage({
        message: {
          userId: 1,
          receiverId: 1,
          message:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt, molestias ut. Autem temporibus magnam iusto voluptates ipsum dignissimos eligendi molestias accusamus sit. Culpa maxime minus corporis magnam aliquam, repellendus ullam?',
        },
      })
    );
  }
  editMessage(): void {
    this.store.dispatch(
      MessagesActions.editMessage({ message: { id: 2, message: 'Насвай' } })
    );
  }
  deleteMessage(): void {
    this.store.dispatch(MessagesActions.deleteMessage({ id: 2 }));
  }
}
