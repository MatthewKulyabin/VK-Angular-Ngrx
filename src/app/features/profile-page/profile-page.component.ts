import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as PostsActions from '../../share/state/posts/actions';
import * as UsersActions from '../../share/state/users/actions';
import * as AudioActions from '../../share/state/audio/actions';
import * as MessagesActions from '../../share/state/messages/actions';
import { postIsLoadingSelector } from '../../share/state/posts/selectors';
import { AppStateInterface } from '../../share/state/app-state-interface';
import { UserInterface } from 'src/app/share/types/user-interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = store.pipe(select(postIsLoadingSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts());
    this.store.dispatch(AudioActions.getAudio());
    this.store.dispatch(MessagesActions.getMessages());
  }

  editUser(): void {
    const newUser: UserInterface = {
      id: 3,
      email: 'newUser@gmail.com',
      password: 'newUser',
      firstName: 'Matthew123123',
      lastName: 'newUser',
      middleName: 'newUser',
      age: 20,
    };
    this.store.dispatch(UsersActions.editUser({ user: newUser }));
  }
  deleteUser(): void {
    this.store.dispatch(UsersActions.deleteUser({ id: 2 }));
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
    this.store.dispatch(AudioActions.deleteAudio({ id: 2 }));
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
