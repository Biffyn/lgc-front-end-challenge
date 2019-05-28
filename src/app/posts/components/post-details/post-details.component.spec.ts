import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSmartModalModule } from 'ngx-smart-modal';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSmartModalModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Comment Form', () => {
    it(`should be visible`, async(() => {
      const addCommentButton = fixture.debugElement.query(By.css('button')).nativeElement;
      addCommentButton.click();
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css('h4')).nativeElement.textContent;
      expect(title).toContain('Join the conversation');
    }));

    it(`form should be invalid`, async(() => {
      component.commentForm.controls.user.setValue('');
      component.commentForm.controls.comment.setValue('');
      expect(component.commentForm.valid).toBeFalsy();
    }));

    it(`form should be valid`, async(() => {
      component.commentForm.controls.user.setValue('James');
      component.commentForm.controls.comment.setValue('This is a test comment');
      expect(component.commentForm.valid).toBeTruthy();
    }));
  });
});
