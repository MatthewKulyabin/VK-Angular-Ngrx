import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private CURRENT_USER_ID = 'currentUserId';
  constructor() {}

  setCurrentUserId(id: number): void {
    localStorage.setItem(this.CURRENT_USER_ID, id.toString());
  }

  getCurrentUserId(): number {
    const currentUserId = localStorage.getItem(this.CURRENT_USER_ID);
    return Number(currentUserId);
  }

  deleteCurrentUserId(): void {
    localStorage.removeItem(this.CURRENT_USER_ID);
  }
}
