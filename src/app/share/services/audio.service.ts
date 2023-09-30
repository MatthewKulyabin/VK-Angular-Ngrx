import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AudioInterface } from '../types/audio-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioApi = environment.apiUrl + 'audio/';

  constructor(private http: HttpClient) {}

  getAudio(): Observable<AudioInterface[]> {
    return this.http.get<AudioInterface[]>(this.audioApi);
  }

  addAudio(audio: AudioInterface): Observable<AudioInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<AudioInterface>(this.audioApi, audio, { headers });
  }

  editAudio(audio: AudioInterface): Observable<AudioInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<AudioInterface>(this.audioApi + audio.id, audio, {
      headers,
    });
  }

  deleteAudio(id: number): Observable<number> {
    return this.http.delete<number>(this.audioApi + id).pipe(map(() => id));
  }
}
