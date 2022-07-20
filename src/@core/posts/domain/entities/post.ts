import DomainError from '../../../@shared/errors/domain-error';
import UniqueEntityId from '../../../@shared/domain/value-objects/unique-entity-id.vo';
import Entity from '../../../@shared/domain/entities/entity';

export type PostProps = {
  content: string;
  user_id: number;
  created_at?: Date;
  is_quote?: boolean;
  is_repost?: boolean;
  original_post_id?: UniqueEntityId;
  original_post_content?: string;
  original_post_user_id?: number;
  original_post_screen_name?: string;
};

export type OriginalPostProps = Pick<
  PostProps,
  'user_id' | 'content' | 'is_repost' | 'is_quote'
> & { screen_name: string; id: UniqueEntityId };

export class Post extends Entity<PostProps> {
  private _content: string;
  private _user_id: number;
  private _created_at?: Date;
  private _is_quote: boolean;
  private _is_repost: boolean;
  private _original_post_id?: UniqueEntityId;
  private _original_post_content?: string;
  private _original_post_user_id?: number;
  private _original_post_screen_name?: string;

  constructor(props: PostProps, id?: UniqueEntityId) {
    super(props, id);
    this._content = props.content;
    this._user_id = props.user_id;
    this._created_at = props.created_at || new Date();
    this._is_quote = props.is_quote || false;
    this._is_repost = props.is_repost || false;
  }

  get content(): string {
    return this._content;
  }

  get user_id(): number {
    return this._user_id;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get is_quote(): boolean {
    return this._is_quote;
  }

  get is_repost(): boolean {
    return this._is_repost;
  }

  get original_post_id(): UniqueEntityId {
    return this._original_post_id;
  }

  get original_post_content(): string {
    return this._original_post_content;
  }

  get original_post_user_id(): number {
    return this._original_post_user_id;
  }

  get original_post_screen_name(): string {
    return this._original_post_screen_name;
  }

  repost(originalPost: OriginalPostProps) {
    if (originalPost.is_repost) {
      throw new DomainError('It is not possible repost a repost post');
    }
    this._is_repost = true;
    this.addOriginalPostInfo(originalPost);
  }

  quotePost(quoteContent, originalPost: OriginalPostProps) {
    if (originalPost.is_quote) {
      throw new DomainError('It is not possible a quote post of a quote post');
    }

    this._is_quote = true;
    this._content = quoteContent;
    this.addOriginalPostInfo(originalPost);
  }

  private addOriginalPostInfo(originalPost: OriginalPostProps) {
    this._original_post_id = originalPost.id.value;
    this._original_post_content = originalPost.content;
    this._original_post_user_id = originalPost.user_id;
    this._original_post_screen_name = originalPost.screen_name;
  }
}
