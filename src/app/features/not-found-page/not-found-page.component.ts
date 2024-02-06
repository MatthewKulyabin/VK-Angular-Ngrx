import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from 'src/app/share/services/local.storage.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  goHome(): string {
    if (this.localStorageService.getCurrentUserId()) {
      return `/profile/${this.localStorageService.getCurrentUserId()}`;
    }
    return '/login';
  }
}
