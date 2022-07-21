import DomainError from '../../../@shared/errors/domain-error';
import UniqueEntityId from '../../../@shared/domain/value-objects/unique-entity-id.vo';
import Entity from '../../../@shared/domain/entities/entity';

export type PostProps = {
  content?: string;
  user_id: string;
  created_at?: Date;
  is_quote?: boolean;
  is_repost?: boolean;
  original_post_id?: string;
  original_post_content?: string;
  original_post_user_id?: string;
  original_post_screen_name?: string;
};

export type OriginalPostProps = Pick<
  PostProps,
  'user_id' | 'content' | 'is_repost' | 'is_quote'
> & { screen_name: string; id: string };

export class Post extends Entity<PostProps> {
  constructor(readonly props: PostProps, id?: UniqueEntityId) {
    super(props, id);
    this.props.content = props.content || null;
    this.props.user_id = props.user_id;
    this.props.created_at = props.created_at || new Date();
    this.props.is_quote = props.is_quote || false;
    this.props.is_repost = props.is_repost || false;
    this.props.original_post_id = props?.original_post_id || null;
    this.props.original_post_content = props?.original_post_content || null;
    this.props.original_post_user_id = props?.original_post_user_id || null;
    this.props.original_post_screen_name =
      props?.original_post_screen_name || null;
  }

  get content(): string {
    return this.props.content;
  }

  get user_id(): string {
    return this.props.user_id;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get is_quote(): boolean {
    return this.props.is_quote;
  }

  get is_repost(): boolean {
    return this.props.is_repost;
  }

  get original_post_id(): string | null {
    return this.props.original_post_id;
  }

  get original_post_content(): string {
    return this.props.original_post_content;
  }

  get original_post_user_id(): string {
    return this.props.original_post_user_id;
  }

  get original_post_screen_name(): string {
    return this.props.original_post_screen_name;
  }

  repost(originalPost: OriginalPostProps) {
    if (originalPost.is_repost) {
      throw new DomainError('It is not possible repost a repost post');
    }
    this.props.is_repost = true;
    this.addOriginalPostInfo(originalPost);
  }

  quotePost(quoteContent, originalPost: OriginalPostProps) {
    if (originalPost.is_quote) {
      throw new DomainError('It is not possible a quote post of a quote post');
    }

    this.props.is_quote = true;
    this.props.content = quoteContent;
    this.addOriginalPostInfo(originalPost);
  }

  private addOriginalPostInfo(originalPost: OriginalPostProps) {
    this.props.original_post_id = originalPost.id;
    this.props.original_post_content = originalPost.content;
    this.props.original_post_user_id = originalPost.user_id;
    this.props.original_post_screen_name = originalPost.screen_name;
  }
}
