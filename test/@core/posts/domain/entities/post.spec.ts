import { User } from '#core/posts/domain/entities/user';
import * as chance from 'chance';
import 'jest-extended';
import { PostDataBuilder } from '../../../../fixtures/builders/post-data-builder';
import DomainError from '#core/@shared/errors/domain-error';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';

const getOriginalPostParam = (post: User) => ({
  id: new UniqueEntityId(post.id),
  content: post.content,
  user_id: post.user_id,
  is_repost: post.is_repost,
  is_quote: post.is_quote,
  screen_name: 'test',
});

describe('@core -> domain -> ', () => {
  let chanceInstance: Chance.Chance;
  beforeEach(() => {
    chanceInstance = chance();
  });
  describe('Post', () => {
    it('create a valid entity with sent values and default', () => {
      const post = new User({
        content: chanceInstance.paragraph({ sentences: 1 }),
        user_id: chanceInstance.integer(),
      });

      expect(post.id).not.toBeEmpty();
      expect(post.content).not.toBeEmpty();
      expect(post.content).not.toBeEmpty();
      expect(post.user_id).toBeNumber();
      expect(post.created_at).not.toBeEmpty();
      expect(post.created_at).toBeInstanceOf(Date);
      expect(post.original_post_id).toBeNull();
      expect(post.original_post_content).toBeNull();
      expect(post.original_post_user_id).toBeNull();
      expect(post.original_post_screen_name).toBeNull();
    });

    it('should not allow create a repost of a repost post', () => {
      const originalPost = new User(
        PostDataBuilder.aPost().withRepost().build(),
      );
      const sut = new User(PostDataBuilder.aPost().build());
      expect(() => sut.repost(getOriginalPostParam(originalPost))).toThrow(
        DomainError,
      );
    });

    it('should not allow create a quote post of a quote post', () => {
      const originalPost = new User(
        PostDataBuilder.aPost().withQuotePost('teste').build(),
      );
      const sut = new User(PostDataBuilder.aPost().build());
      expect(() =>
        sut.quotePost('teste', getOriginalPostParam(originalPost)),
      ).toThrow(DomainError);
    });

    it('should create a repost correctly', () => {
      const originalPost = new User(PostDataBuilder.aPost().build());
      const sut = new User(PostDataBuilder.aPost().build());
      sut.repost(getOriginalPostParam(originalPost));
      expect(sut.original_post_id).toBe(originalPost.id);
      expect(sut.original_post_content).toBe(originalPost.content);
      expect(sut.original_post_user_id).toBe(originalPost.user_id);
      expect(sut.original_post_screen_name).toBe('test');
      expect(sut.is_repost).toBeTrue();
    });

    it('should create a quote post correctly', () => {
      const originalPost = new User(PostDataBuilder.aPost().build());
      const sut = new User(PostDataBuilder.aPost().build());
      sut.quotePost('test', getOriginalPostParam(originalPost));
      expect(sut.original_post_id).toBe(originalPost.id);
      expect(sut.original_post_content).toBe(originalPost.content);
      expect(sut.original_post_user_id).toBe(originalPost.user_id);
      expect(sut.original_post_screen_name).toBe('test');
      expect(sut.is_quote).toBeTrue();
    });
  });
});
