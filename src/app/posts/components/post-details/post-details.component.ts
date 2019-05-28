import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { Post } from '../../models/post.model';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import { switchMap, tap, mergeMap, map, flatMap, catchError } from 'rxjs/operators';
import { PostComment } from '../../models/post-comment.model';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  public post: Post = new Post();
  public postComment: PostComment = new PostComment();
  public topLevelComments: Array<PostComment> = [];
  public replies: Array<PostComment> = [];
  public commentForm: FormGroup;
  private parentCommentId: number;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private fb: FormBuilder,
    public modalService: NgxSmartModalService
  ) {}

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.getPostDetailsWithComments(id);
    });

    this.commentForm = this.fb.group({
      user: ['', [Validators.required]],
      comment: [null, [Validators.required]]
    });
  }

  public addComment(): void {
    if (!this.commentForm.valid) {
      return;
    } else {
      this.setCommentDetails();
      this.postsService.addComment(this.post.id, this.postComment).subscribe(
        (response) => {
          if (response) {
            this.postsService.getCommentsById(this.post.id).subscribe((comments) => {
              this.updateComments(comments);
            });

            this.commentForm.reset();
            this.modalService.toggle('commentModal');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  public getReplies(commentId: number): Array<PostComment> {
    this.replies = this.post.comments.filter((c) => c.parent_id === commentId);
    return this.replies;
  }

  public setParentId(commentId): void {
    this.parentCommentId = commentId;
  }

  private setCommentDetails(parentId?: number): void {
    this.postComment = new PostComment();

    this.postComment.user = this.commentForm.get('user').value;
    this.postComment.content = this.commentForm.get('comment').value;
    this.postComment.postId = this.post.id;
    this.postComment.date = new Date();

    if (this.parentCommentId) {
      this.postComment.parent_id = this.parentCommentId;
    } else {
      this.postComment.parent_id = null;
    }

    this.parentCommentId = null;
  }

  private getPostDetailsWithComments(id: any): void {
    this.postsService
      .getPost(id)
      .pipe(
        tap((post) => (this.post = post)),
        flatMap((post) => this.postsService.getCommentsById(post.id))
      )
      .subscribe((comments) => {
        this.updateComments(comments);
      });
  }

  private updateComments(comments: PostComment[]): void {
    this.post.comments = [];
    this.post.comments = comments;
    this.topLevelComments = comments.filter((c) => c.parent_id === null || c.parent_id === undefined);
  }
}
