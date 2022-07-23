import CreatePost from '#core/posts/application/create-post';

export class CreatePostDto implements CreatePost.Input {
  content: string;
  user_id: string;
}
