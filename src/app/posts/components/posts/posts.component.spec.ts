import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { By } from '@angular/platform-browser';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: PostsService;

  const mockPosts: Post[] = [
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      providers: [PostsService]
    }).compileComponents();
  }));

  beforeEach(inject([PostsService], (s) => {
    postsService = s;
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initialize and return list of posts', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    component.setPosts(mockPosts).subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });
  }));
});
