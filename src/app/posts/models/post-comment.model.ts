export class PostComment {
  id: number;
  postId: number;
  parent_id: number;
  user: string;
  date: Date;
  content: string;

  public constructor(comment?: PostComment) {
    if (!comment) {
      return;
    }
    this.id = comment.id;
    this.postId = comment.postId;
    this.parent_id = comment.parent_id;
    this.user = comment.user;
    this.date = comment.date;
    this.content = comment.content;
  }
}
