import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { UserInterface } from '../../types/user-interface';
import { AppStateInterface } from '../../state/app-state-interface';
import {
  userSelectorById,
  usersSelectorByName,
} from '../../state/users/selectors';
import { LocalStorageService } from '../../services/local.storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  openResult: boolean = false;
  foundUsers$!: Observable<UserInterface[]> | null;
  searchForm: FormGroup;

  currentUser$!: Observable<UserInterface>;
  currentUserDropdown: boolean = false;
  currentUserRoute: string;

  constructor(
    private store: Store<AppStateInterface>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.currentUser$ = store.select(
      userSelectorById(localStorageService.getCurrentUserId())
    );
    this.currentUserRoute = `/profile/${localStorageService.getCurrentUserId()}`;
  }

  closeResult(): void {
    this.openResult = false;
    this.foundUsers$ = null;
  }

  showResult(): void {
    if (this.searchForm.value.search)
      this.foundUsers$ = this.store.select(
        usersSelectorByName(this.searchForm.value.search)
      );
    this.openResult = true;
  }

  openCurrentUserDropdown(): void {
    this.currentUserDropdown = !this.currentUserDropdown;
  }

  logout(): void {
    this.localStorageService.deleteCurrentUserId();
    this.router.navigate(['/login']);
  }
}
