import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap } from 'rxjs';

import * as PostsActions from '../../../state/posts/actions';
import { PostInterface } from 'src/app/share/types/post-interface';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { UserInterface } from 'src/app/share/types/user-interface';
import { userSelectorById } from 'src/app/share/state/users/selectors';
import { PostEmitInterface } from 'src/app/share/types/post-emit-interface';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnDestroy {
  @Input() openModal!: boolean;
  @Input() closeModal!: () => void;
  @Input() onOpenModal!: () => void;
  @Input() postsListByUserId$!: Observable<PostInterface[]>;
  postForm: FormGroup;

  photo: any;
  filename = '';

  postIdToEdit: number | undefined;
  postFormMethod: 'ADD' | 'EDIT';
  postToEdit?: PostInterface;

  currentUser: Observable<UserInterface | undefined>;
  currentUserFirstName: string | undefined;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {
    this.currentUser = route.paramMap.pipe(
      switchMap((params) =>
        store.select(userSelectorById(Number(params.get('id'))))
      )
    );
    this.subscriptions.push(
      this.currentUser.subscribe(
        (user) => (this.currentUserFirstName = user?.name)
      )
    );

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

  onCloseModal(): void {
    this.closeModal();
    this.postForm.reset();
  }

  onImagePicked(event: Event): void {
    let file: any = event.target;
    this.photo = file.files[0];
  }

  onSubmit(): void {
    let newPost: PostInterface = {
      id: Number(new Date()),
      userId: Number(this.route.snapshot.paramMap.get('id')),
      header: this.currentUserFirstName as string,
      title: this.postForm.value.title as string,
      text: this.postForm.value.text as string,
      photo: this.photo?.name ?? this.postToEdit?.photo,
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
            id: newPost.id,
            photo: formData,
          })
        );
      }
    }
    if (this.postFormMethod === 'EDIT') {
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
      this.onOpenModal();
      this.postFormMethod = 'EDIT';
      this.subscriptions.push(
        this.postsListByUserId$.subscribe(
          (posts) =>
            (this.postToEdit = posts.find((post) => post.id === postEmit.id))
        )
      );
      this.postForm.reset({
        title: this.postToEdit?.title,
        text: this.postToEdit?.text,
        photo: null,
      });
      this.postIdToEdit = this.postToEdit?.id;
    }
    if (postEmit.method === 'DELETE') {
      this.deletePost(postEmit.id);
    }
  }

  deletePost(id: number): void {
    this.store.dispatch(PostsActions.deletePost({ id }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
