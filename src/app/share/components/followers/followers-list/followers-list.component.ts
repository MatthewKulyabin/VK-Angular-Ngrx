import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'src/app/share/services/local.storage.service';
import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { selectFollowersByLoggedInUser } from 'src/app/share/state/followers/selectors';
import { FollowersInterface } from 'src/app/share/types/followers-interface';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.scss'],
})
export class FollowersListComponent {
  followers$: Observable<FollowersInterface[]>;
  @Input() chooseFollowerAudio!: (id: number) => void;
  @Input() chooseFollowerProfile!: (id: number) => void;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {
    this.followers$ = store.select(
      selectFollowersByLoggedInUser(localStorage.getCurrentUserId())
    );
  }
}
