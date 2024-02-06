import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AppStateInterface } from '../../state/app-state-interface';
import { PostInterface } from '../../types/post-interface';
import {
  postIsLoadingSelector,
  postsSelectorByUserId,
} from '../../state/posts/selectors';
import { LocalStorageService } from '../../services/local.storage.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  postsIsLoading$: Observable<boolean>;
  postsListByUserId$: Observable<PostInterface[]>;

  photo: any;
  filename = '';
  postIdToEdit: number | undefined;
  @ViewChild('newPostId') newPostId: any;

  postFormMethod: 'ADD' | 'EDIT';

  openModal: boolean = false;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.postsIsLoading$ = store.select(postIsLoadingSelector);
    this.postsListByUserId$ = route.paramMap.pipe(
      switchMap((params) =>
        store.select(postsSelectorByUserId(Number(params.get('id'))))
      )
    );

    this.postFormMethod = 'ADD';
  }

  closeModal(): void {
    this.openModal = false;
  }

  onCloseModal(): void {
    this.closeModal();
  }

  onOpenModal(): void {
    this.openModal = true;
  }

  isProfileOfCurrentUser(): boolean {
    return (
      this.localStorageService.getCurrentUserId() ===
      Number(this.route.snapshot.paramMap.get('id'))
    );
  }
}
