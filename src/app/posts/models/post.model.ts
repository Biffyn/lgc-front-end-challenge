import { PostComment } from './post-comment.model';

export class Post {
  id: number;
  title: string;
  author: string;
  publish_date: Date;
  slug: string;
  description: string;
  content: string;
  comments: PostComment[] = new Array<PostComment>();
  commentCount: number;

  public constructor(post?: Post) {
    if (!post) {
      return;
    }
    this.id = post.id;
    this.title = post.title;
    this.author = post.author;
    this.publish_date = post.publish_date;
    this.slug = post.slug;
    this.description = post.description;
    this.content = post.content;
    this.commentCount = post.commentCount;

    if (post.comments) {
      post.comments.forEach((comment: PostComment) => this.comments.push(new PostComment(comment)));
    }
  }
}
