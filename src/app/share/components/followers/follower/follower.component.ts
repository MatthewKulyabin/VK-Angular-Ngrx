import { AfterViewInit, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppStateInterface } from 'src/app/share/state/app-state-interface';
import { UserInterface } from 'src/app/share/types/user-interface';
import { userSelectorById } from 'src/app/share/state/users/selectors';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss'],
})
export class FollowerComponent implements AfterViewInit {
  user$!: Observable<UserInterface>;
  @Input() followerUserId!: number;
  @Input() chooseFollowerAudio!: (id: number) => void;
  @Input() chooseFollowerProfile!: (id: number) => void;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}

  onChoose(id: number): void {
    if (this.router.url === '/audio') {
      this.chooseFollowerAudio(id);
      return;
    }
    this.chooseFollowerProfile(id);
  }

  ngAfterViewInit(): void {
    this.user$ = this.store.select(userSelectorById(this.followerUserId));
  }
}
