import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  currentRoute?: string;

  constructor(private router: Router) {
    this.currentRoute = router.url;
  }

  getClass(url: string): string {
    if (url === this.currentRoute) return 'nav-link active';
    return 'nav-link';
  }
}
