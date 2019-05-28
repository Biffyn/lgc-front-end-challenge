import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { PostComment } from '../models/post-comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  // GET /posts - List all blog posts
  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Array<Post>>('posts');
  }
  // GET /posts/{id} - View single blog post
  public getPost(id: number) {
    return this.http.get<Post>(`posts/${id}`);
  }
  // GET /posts/{id}/comments - List all comments for single blog post
  public getCommentsById(id: number) {
    return this.http.get<Array<PostComment>>(`posts/${id}/comments`);
  }
  // POST /posts/{id}/comments - Add comment to single blog post
  public addComment(id: number, comment: PostComment): Observable<PostComment> {
    return this.http.post<PostComment>(`posts/${id}/comments`, comment);
  }
}
