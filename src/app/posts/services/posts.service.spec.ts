import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostsService } from './posts.service';
import { of } from 'rxjs';
import { Post } from '../models/post.model';
import { PostComment } from '../models/post-comment.model';
import { environment } from '../../../environments/environment';

describe('PostsService', () => {
  let postsService: PostsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });

    postsService = TestBed.get(PostsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be initialized', () => {
    expect(postsService).toBeTruthy();
  });

  describe('getAllPosts', () => {
    it('should return a list of Posts via GET', () => {
      const postsResponse: Array<Post> = [
        {
          id: 1,
          title: 'Blog post #1',
          author: 'Melissa Manges',
          publish_date: new Date(),
          slug: 'blog-post-1',
          description: 'Utroque denique invenire et has.',
          content: '<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p>',
          comments: [],
          commentCount: 0
        },
        {
          id: 2,
          title: 'Blog post #2',
          author: 'Olene Ogan',
          publish_date: new Date(),
          slug: 'blog-post-2',
          description: 'Ex legere perpetua electram vim, per nisl inermis quaestio ea.',
          content: '<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea.</p>',
          comments: [],
          commentCount: 0
        }
      ];

      postsService.getAllPosts().subscribe((posts) => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(postsResponse);
      });

      const req = httpMock.expectOne('posts');
      expect(req.request.method).toBe('GET');
      req.flush(postsResponse);
    });
  });

  describe('getPost', () => {
    it('should return a single Post by id via GET', () => {
      const postResponse: Post = {
        id: 1,
        title: 'Blog post #1',
        author: 'Melissa Manges',
        publish_date: new Date(),
        slug: 'blog-post-1',
        description: 'Utroque denique invenire et has.',
        content: '<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p>',
        comments: [],
        commentCount: 0
      };

      postsService.getPost(1).subscribe((post: Post) => {
        expect(post.id).toBe(1);
        expect(post).toEqual(postResponse);
      });

      const req = httpMock.expectOne('posts/1');
      expect(req.request.method).toBe('GET');
      req.flush(postResponse);
    });
  });

  describe('getCommentsById', () => {
    it('should return a list of PostComments via GET', () => {
      const commentsResponse: Array<PostComment> = [
        {
          id: 1,
          postId: 1,
          parent_id: null,
          user: 'Amelia',
          date: new Date(),
          content: 'Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor.'
        },
        {
          id: 2,
          postId: 1,
          parent_id: 1,
          user: 'Jake',
          date: new Date(),
          content: 'Cras lectus nisl, scelerisque quis elit ut, luctus scelerisque purus.'
        },
        {
          id: 3,
          postId: 2,
          parent_id: null,
          user: 'Amelia',
          date: new Date(),
          content: 'Cras est nunc, tempus eget risus vitae, vulputate ornare magna.'
        }
      ];

      postsService.getCommentsById(1).subscribe((comments: PostComment[]) => {
        expect(comments.length).toBe(3);
        expect(comments).toEqual(commentsResponse);
      });

      const req = httpMock.expectOne('posts/1/comments');
      expect(req.request.method).toBe('GET');
      req.flush(commentsResponse);
    });
  });

  describe('addComment', () => {
    it('should add a PostComment via POST', () => {
      const comment: PostComment = {
        id: 5,
        postId: 1,
        parent_id: null,
        user: 'Amelia',
        date: new Date(),
        content: 'Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor.'
      };

      postsService.addComment(1, comment).subscribe((res: PostComment) => {
        expect(res.id).toBeDefined();
        expect(res).toEqual(comment);
      });

      const req = httpMock.expectOne('posts/1/comments');
      expect(req.request.method).toBe('POST');
      req.flush(comment);
    });
  });
});
