import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local.storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  currentRoute?: string;
  currentUserRoute: string;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.currentRoute = router.url;
    this.currentUserRoute = `/profile/${localStorageService.getCurrentUserId()}`;
  }

  getClass(url: string): string {
    if (url === this.currentRoute) return 'nav-link active';
    return 'nav-link';
  }
}
