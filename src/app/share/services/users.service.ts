import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UserInterface } from '../types/user-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersApi = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.usersApi);
  }

  addUser(user: UserInterface): Observable<UserInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<UserInterface>(this.usersApi, user, { headers });
  }

  editUser(user: UserInterface): Observable<UserInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<UserInterface>(this.usersApi + user.id, user, {
      headers,
    });
  }

  deleteUser(id: number): Observable<number> {
    return this.http
      .delete<number | any>(this.usersApi + id)
      .pipe(map(() => id));
  }
}
