import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { FriendInterface } from '../types/friend-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private friendsApi = environment.apiUrl + 'friends/';

  constructor(private http: HttpClient) {}

  getFriends(): Observable<FriendInterface[]> {
    return this.http.get<FriendInterface[]>(this.friendsApi);
  }

  addFriend(friend: FriendInterface): Observable<FriendInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<FriendInterface>(this.friendsApi, friend, {
      headers,
    });
  }

  deleteFriend(id: number): Observable<number> {
    return this.http.delete(this.friendsApi + id).pipe(map(() => id));
  }
}
