import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostComment } from '../../models/post-comment.model';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts$: Observable<Post[]>;

  constructor(private postsService: PostsService) {}

  public ngOnInit() {
    this.getAllPostsWithComments();
  }

  public setPosts(posts: Post[]): Observable<Post[]> {
    return (this.posts$ = of(_.orderBy(posts, (p) => new Date(p.publish_date), 'desc')));
  }

  private getAllPostsWithComments(): void {
    this.postsService
      .getAllPosts()
      .pipe(
        tap((posts) => {
          posts.forEach((post) => {
            this.getPostComments(post);
          });
        })
      )
      .subscribe((posts) => this.setPosts(posts));
  }

  private getPostComments(post: Post): Post {
    this.postsService.getCommentsById(post.id).subscribe((comments: PostComment[]) => {
      post.comments = comments;
      post.commentCount = comments.length;
    });
    return post;
  }
}
