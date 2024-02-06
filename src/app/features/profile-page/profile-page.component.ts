import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import * as PostsActions from '../../share/state/posts/actions';
import * as UsersActions from '../../share/state/users/actions';
import * as AudioActions from '../../share/state/audio/actions';
import * as MessagesActions from '../../share/state/messages/actions';
import * as FollowersActions from '../../share/state/followers/actions';
import {
  postIsLoadingSelector,
  postsSelectorByUserId,
} from '../../share/state/posts/selectors';
import { AppStateInterface } from '../../share/state/app-state-interface';
import { UserInterface } from 'src/app/share/types/user-interface';
import { userSelectorById } from 'src/app/share/state/users/selectors';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { PostInterface } from 'src/app/share/types/post-interface';
import { audioSelectorByUserId } from 'src/app/share/state/audio/selectors';
import { selectFollowersByLoggedInUser } from 'src/app/share/state/followers/selectors';
import { messagesSelectorByUserId } from 'src/app/share/state/messages/selectors';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  isLoading$: Observable<boolean>;

  currentUser$: Observable<UserInterface | undefined>;

  showFollowBtn: boolean = true;

  postsByUserId$: Observable<PostInterface[]>;
  postsByUserIdIds: number[] | undefined;

  audioByUserIdIds: number[] | undefined;
  followersByUserIdIds: number[] | undefined;
  messagesByUserIdIds: number[] | undefined;

  openModal: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    protected store: Store<AppStateInterface>,
    private router: Router,
    private cdref: ChangeDetectorRef,
    protected localStorageService: LocalStorageService,
    protected route: ActivatedRoute
  ) {
    this.currentUser$ = route.paramMap.pipe(
      switchMap((params) =>
        store.select(userSelectorById(Number(params.get('id'))))
      )
    );

    this.isLoading$ = store.select(postIsLoadingSelector);

    this.postsByUserId$ = route.paramMap.pipe(
      switchMap((params) =>
        store.select(postsSelectorByUserId(Number(params.get('id'))))
      )
    );

    this.subscriptions.push(
      this.postsByUserId$.subscribe(
        (posts) => (this.postsByUserIdIds = posts.map((post) => post.id))
      )
    );

    this.subscriptions.push(
      store
        .select(audioSelectorByUserId(localStorageService.getCurrentUserId()))
        .subscribe(
          (audio) => (this.audioByUserIdIds = audio.map((audio) => audio.id))
        )
    );
    this.subscriptions.push(
      store
        .select(
          selectFollowersByLoggedInUser(localStorageService.getCurrentUserId())
        )
        .subscribe(
          (followers) =>
            (this.followersByUserIdIds = followers.map(
              (follower) => follower.id
            ))
        )
    );
    this.subscriptions.push(
      store
        .select(
          messagesSelectorByUserId(localStorageService.getCurrentUserId())
        )
        .subscribe(
          (messages) =>
            (this.messagesByUserIdIds = messages.map(
              (message) => message.id as number
            ))
        )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts());
    this.store.dispatch(MessagesActions.getMessages());
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  chooseFollowerProfile(id: number): void {
    this.router.navigate([`/profile/${id}`]);
  }

  deleteUser(): void {
    this.store.dispatch(
      UsersActions.deleteUser({
        id: this.localStorageService.getCurrentUserId(),
      })
    );
    this.localStorageService.deleteCurrentUserId();
    this.store.dispatch(
      PostsActions.deletePostsByUserId({
        userId: this.localStorageService.getCurrentUserId(),
        ids: this.postsByUserIdIds as number[],
      })
    );
    this.store.dispatch(
      AudioActions.deleteAudioByUserId({
        userId: this.localStorageService.getCurrentUserId(),
        ids: this.audioByUserIdIds as number[],
      })
    );
    this.store.dispatch(
      FollowersActions.deleteFollowersByUserId({
        userId: this.localStorageService.getCurrentUserId(),
        ids: this.followersByUserIdIds as number[],
      })
    );
    this.store.dispatch(
      MessagesActions.deleteMessagesByUserId({
        userId: this.localStorageService.getCurrentUserId(),
        ids: this.messagesByUserIdIds as number[],
      })
    );
    this.router.navigate(['/login']);
  }

  goHome(): string {
    return `/profile/${this.localStorageService.getCurrentUserId()}`;
  }

  closeModal(): void {
    this.openModal = false;
  }

  onOpenModal(): void {
    this.openModal = true;
  }

  isProfileOfCurrentUser(userId?: number): boolean {
    return (
      this.localStorageService.getCurrentUserId() ===
      Number(this.route.snapshot.paramMap.get('id'))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
