import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { FollowersInterface } from '../types/followers-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowersService {
  private followersApi = environment.apiUrl + 'followers/';

  constructor(private http: HttpClient) {}

  getFollowers(): Observable<FollowersInterface[]> {
    return this.http.get<FollowersInterface[]>(this.followersApi);
  }

  addFollower(follower: FollowersInterface): Observable<FollowersInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<FollowersInterface>(this.followersApi, follower, {
      headers,
    });
  }

  deleteFollower(id: number): Observable<number> {
    return this.http.delete(this.followersApi + id).pipe(map(() => id));
  }

  deleteFollowersByUserId(
    userId: number,
    ids: Array<number>
  ): Observable<number> {
    ids.map((id) => this.http.delete(this.followersApi + id));
    return of(userId);
  }
}
