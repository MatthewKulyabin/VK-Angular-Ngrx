import { Component, Directive, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AppStateInterface } from '../../state/app-state-interface';
import * as PostsActions from '../../state/posts/actions';
import { PostInterface } from '../../types/post-interface';
import {
  postIsLoadingSelector,
  postsSelector,
} from '../../state/posts/selectors';
import { PostEmitInterface } from '../../types/post-emit-interface';

class Greeter {
  greet(name: string): string {
    return `Hello ${name}!`;
  }
}

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent {
  postsIsLoading$: Observable<boolean>;
  postsList$: Observable<PostInterface[]>;
  photo: any;
  filename = '';
  postIdToEdit: number | undefined;
  @ViewChild('newPostId') newPostId: any;

  postForm: FormGroup;
  postFormMethod: 'ADD' | 'EDIT';

  openModal: boolean = false;

  constructor(private store: Store<AppStateInterface>) {
    this.postsIsLoading$ = store.pipe(select(postIsLoadingSelector));
    this.postsList$ = store.pipe(select(postsSelector));

    this.postForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      text: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(250)],
      }),
      photo: new FormControl<any>(null),
    });
    this.postFormMethod = 'ADD';
  }

  onImagePicked(event: Event): void {
    let file: any = event.target;
    this.photo = file.files[0];
  }

  postFormReset(): void {
    this.postForm.reset({
      title: '',
      text: '',
      photo: null,
    });
  }

  closeModal(): void {
    this.openModal = false;
    this.postFormReset();
  }

  // onSubmit(): void {
  //   if (this.postFormMethod === 'ADD') {
  //     this.addPost();
  //   }
  //   if (this.postFormMethod === 'EDIT') {
  //   }
  // }

  onSubmit(): void {
    let id!: number;
    this.postsList$.subscribe((posts) => {
      id = posts[posts.length - 1].id + 1;
    });

    let newPost: PostInterface = {
      id: Number(new Date().toString),
      userId: 1,
      header: 'Header',
      title: this.postForm.value.title as string,
      text: this.postForm.value.text as string,
      photo: this.photo?.name ?? '/assets/img/profile-icon.png',
    };

    this.filename = this.photo?.name;
    const formData = new FormData();
    formData.append('photo', this.photo);

    if (this.postFormMethod === 'ADD') {
      this.store.dispatch(
        PostsActions.addPost({ post: newPost, photo: formData })
      );
      if (this.filename) {
        this.store.dispatch(
          PostsActions.patchPhoto({
            id,
            photo: formData,
          })
        );
      }
    }
    if (this.postFormMethod === 'EDIT') {
      console.log('EDIT submit');
      newPost.id = this.postIdToEdit as number;
      this.store.dispatch(
        PostsActions.editPost({
          post: newPost,
        })
      );
      if (this.filename) {
        this.store.dispatch(
          PostsActions.patchPhoto({
            id: this.postIdToEdit as number,
            photo: formData,
          })
        );
      }
    }

    this.closeModal();
  }

  getId(postEmit: PostEmitInterface): void {
    if (postEmit.method === 'EDIT') {
      this.openModal = true;
      this.postFormMethod = 'EDIT';
      console.log('Get Id Posts-lists.component ', this.postFormMethod);
      let postToEdit: PostInterface | undefined;
      this.postsList$.subscribe(
        (posts) => (postToEdit = posts.find((post) => post.id === postEmit.id))
      );
      this.postForm.reset({
        title: postToEdit?.title,
        text: postToEdit?.text,
        photo: null,
      });
      this.postIdToEdit = postToEdit?.id;
    }
    if (postEmit.method === 'DELETE') {
      this.deletePost(postEmit.id);
    }
  }

  deletePost(id: number): void {
    this.store.dispatch(PostsActions.deletePost({ id }));
  }
}
