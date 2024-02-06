import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';

import * as FollowersActions from '../../../share/state/followers/actions';
import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { isAlreadyFollowed } from 'src/app/share/state/followers/selectors';
import { FollowersInterface } from 'src/app/share/types/followers-interface';
import { UserInterface } from 'src/app/share/types/user-interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() currentUser$!: Observable<UserInterface | undefined>;

  isAlreadyFollowed$!: Observable<FollowersInterface | undefined>;

  openMessageModal: boolean = false;

  showUserDescription: boolean = false;

  constructor(
    protected localStorageService: LocalStorageService,
    protected route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {
    router.events.subscribe((val) => {
      this.isAlreadyFollowed$ = route.paramMap.pipe(
        switchMap((params) =>
          store.select(
            isAlreadyFollowed(
              Number(params.get('id')),
              localStorageService.getCurrentUserId()
            )
          )
        )
      );
    });
  }

  closeMessageModal(): void {
    this.openMessageModal = false;
  }

  follow(): void {
    const id = Date.now();
    this.store.dispatch(
      FollowersActions.addFollower({
        follower: {
          id,
          userId: Number(this.route.snapshot.paramMap.get('id')),
          followedById: this.localStorageService.getCurrentUserId(),
        },
      })
    );
    this.isAlreadyFollowed$ = of({
      id,
      userId: Number(this.route.snapshot.paramMap.get('id')),
      followedById: this.localStorageService.getCurrentUserId(),
    });
  }

  unFollow(event: Event): void {
    const id = (event.target as any).getAttribute('isAlreadyFollowed-id');
    this.store.dispatch(
      FollowersActions.deleteFollower({
        id: id as number,
      })
    );
    this.isAlreadyFollowed$ = of(undefined);
  }

  showUserFullDescription(description?: string): boolean {
    description = description as string;
    return this.showUserDescription && description.length > 25;
  }

  toNumber(value: any): number {
    return Number(value);
  }
}
