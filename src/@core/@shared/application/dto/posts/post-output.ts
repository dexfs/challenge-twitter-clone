import { Post } from '#core/posts';

export type PostOutput = {
  id: string;
  content: string | null;
  user_id: string;
  is_quote: boolean;
  is_repost: boolean;
  created_at: Date;
  original_post_id: string | null;
  original_post_content: string | null;
  original_post_user_id: string | null;
  original_post_screen_name?: string | null;
};

export class PostOutputMapper {
  static toOutput(entity: Post): PostOutput {
    return entity.toJSON();
  }
}
