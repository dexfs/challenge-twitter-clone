import { Post } from '#core/posts/domain/entities/post';
import chance from 'chance';
import 'jest-extended';
import { PostDataBuilder } from '../../../../fixtures/builders/post-data-builder';
import { EntityValidationError } from '#core/@shared/errors/validation-error';

const getOriginalPostParam = (post: Post) => ({
  id: post.id,
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
    it('should return errors when a content length is more than 777 characters', async () => {
      expect.assertions(2);
      try {
        new Post({
          content: chanceInstance.pad(1, 778),
          user_id: chanceInstance.guid({ version: 4 }),
        });
      } catch (e) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.error).toStrictEqual({
          content: ['content must be shorter than or equal to 777 characters'],
        });
      }
    });

    it('create a valid entity with sent values and default', () => {
      const post = new Post({
        content: chanceInstance.paragraph({ sentences: 1 }),
        user_id: chanceInstance.guid({ version: 4 }),
      });

      expect(post.id).not.toBeEmpty();
      expect(post.content).not.toBeEmpty();
      expect(post.content).not.toBeEmpty();
      expect(post.user_id).toBeString();
      expect(post.created_at).not.toBeEmpty();
      expect(post.created_at).toBeInstanceOf(Date);
      expect(post.original_post_id).toBeNull();
      expect(post.original_post_content).toBeNull();
      expect(post.original_post_user_id).toBeNull();
      expect(post.original_post_screen_name).toBeNull();
    });

    it('should not allow create a repost of a repost post', () => {
      const originalPost = new Post(
        PostDataBuilder.aPost().withRepost().build(),
      );
      const sut = new Post(PostDataBuilder.aPost().build());
      expect(() => sut.repost(getOriginalPostParam(originalPost))).toThrow(
        EntityValidationError,
      );
    });

    it('should not allow create a quote post of a quote post', () => {
      const originalPost = new Post(
        PostDataBuilder.aPost().withQuotePost('teste').build(),
      );

      const sut = new Post(PostDataBuilder.aPost().build());
      expect(() =>
        sut.quotePost('teste', getOriginalPostParam(originalPost)),
      ).toThrow(EntityValidationError);
    });

    it('should create a repost correctly', () => {
      const originalPost = new Post(PostDataBuilder.aPost().build());
      const sut = new Post(PostDataBuilder.aPost().build());
      sut.repost(getOriginalPostParam(originalPost));
      expect(sut.original_post_id).toBe(originalPost.id);
      expect(sut.original_post_content).toBe(originalPost.content);
      expect(sut.original_post_user_id).toBe(originalPost.user_id);
      expect(sut.original_post_screen_name).toBe('test');
      expect(sut.is_repost).toBeTrue();
    });

    it('should create a quote post correctly', () => {
      const originalPost = new Post(PostDataBuilder.aPost().build());
      const sut = new Post(PostDataBuilder.aPost().build());
      sut.quotePost('test', getOriginalPostParam(originalPost));
      expect(sut.original_post_id).toBe(originalPost.id);
      expect(sut.original_post_content).toBe(originalPost.content);
      expect(sut.original_post_user_id).toBe(originalPost.user_id);
      expect(sut.original_post_screen_name).toBe('test');
      expect(sut.is_quote).toBeTrue();
    });
  });
});
