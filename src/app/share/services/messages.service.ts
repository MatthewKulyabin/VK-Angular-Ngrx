import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { MessageInterface } from '../types/message-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messageApi = environment.apiUrl + 'messages/';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<MessageInterface[]> {
    return this.http.get<MessageInterface[]>(this.messageApi);
  }

  addMessage(message: MessageInterface): Observable<MessageInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<MessageInterface>(this.messageApi, message, {
      headers,
    });
  }

  editMessage(message: MessageInterface): Observable<MessageInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<MessageInterface>(
      this.messageApi + message.id,
      message,
      {
        headers,
      }
    );
  }

  deleteMessage(id: number): Observable<number> {
    return this.http.delete<number>(this.messageApi + id).pipe(map(() => id));
  }

  deleteMessagesByUserId(
    userId: number,
    ids: Array<number>
  ): Observable<number> {
    ids.map((id) => this.http.delete(this.messageApi + id));
    return of(userId);
  }
}
