import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PostInterface } from '../types/post-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsApi = environment.apiUrl + 'posts/';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(this.postsApi);
  }

  patchPhoto(postId: number, photo: FormData): Observable<PostInterface> {
    console.log('PostsService', postId);
    return this.http.patch<PostInterface>(this.postsApi + postId, photo);
  }

  addPost(post: PostInterface, photo: FormData): Observable<PostInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    console.log('PostService Add', post);

    return this.http.post<PostInterface>(
      this.postsApi,
      { ...post, photo: post.photo.name },
      { headers }
    );

    // newPost.pipe(
    //   map((data) => this.http.patch(this.postsApi + data.id, photo))
    // );
  }

  editPost(post: PostInterface): Observable<PostInterface> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<PostInterface>(this.postsApi + post.id, post, {
      headers,
    });
  }

  deletePost(id: number): Observable<number> {
    return this.http
      .delete<number | any>(this.postsApi + id)
      .pipe(map(() => id));
  }

  deletePostsByUserId(userId: number, ids: Array<number>): Observable<number> {
    ids.map((id) =>
      this.http
        .delete(this.postsApi + id)
        .subscribe((data) => console.log(data))
    );
    return of(userId);
  }
}
