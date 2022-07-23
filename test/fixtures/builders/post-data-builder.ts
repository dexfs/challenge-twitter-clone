import { PostProps } from '#core/posts/domain/entities/post';
import * as chance from 'chance';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';

export class PostDataBuilder {
  private data: PostProps & { id: UniqueEntityId };
  private fakeData: Chance.Chance;

  private constructor() {
    this.fakeData = chance();
    this.data = {
      id: new UniqueEntityId(this.fakeData.guid({ version: 4 })),
      content: this.fakeData.paragraph({ sentences: 1 }),
      user_id: this.fakeData.guid({ version: 4 }),
      created_at: this.fakeData.date(),
      is_quote: false,
      is_repost: false,
    };
  }

  static aPost(): PostDataBuilder {
    const post = new PostDataBuilder();
    return post;
  }

  withQuotePost(quoteMessage: string) {
    this.data.content = quoteMessage;
    this.data.is_quote = true;
    this.createOriginalPost();
    return this;
  }

  withRepost() {
    this.data.is_repost = true;
    this.createOriginalPost();
    return this;
  }

  build(): PostProps {
    return this.data;
  }

  private createOriginalPost() {
    this.data.original_post_id = this.fakeData.guid({ version: 4 });
    this.data.original_post_content = this.fakeData.paragraph({ sentences: 1 });
    this.data.original_post_user_id = this.fakeData.guid({ version: 4 });
    this.data.original_post_screen_name = this.fakeData.name().substring(1, 14);
  }
}
