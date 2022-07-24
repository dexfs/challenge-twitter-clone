import UseCaseInterface from '#core/@shared/application/use-case';
import { PostOutput } from '#core/@shared/application/dto/posts/post-output';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { User } from '#core/users';
import DomainError from '#core/@shared/errors/domain-error';
import { defaultSearchInput } from '#core/@shared/application/dto/posts/post-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '#core/@shared/application/dto/pagination-output';

namespace GetUserFeed {
  export class UseCase
    implements UseCaseInterface<Input, PaginationOutput<Post>>
  {
    constructor(
      private userRepository: UserRepository.Repository<User>,
      private postRepository: PostRepository.Repository<Post>,
    ) {}

    async execute(input: Input): Promise<PaginationOutput<Post>> {
      const user = await this.userRepository.findByUsername(input.username);
      if (!user) throw new DomainError('User not found');
      const { posts, count } = await this.postRepository.search({
        ...defaultInput,
        ...input,
        user_id: user.id,
      });

      const items = posts ? posts.map((p) => p.toJSON()) : [];

      return PaginationOutputMapper.toOuput(items, {
        count,
        page: input.page || defaultInput.page,
        pageSize: input.size || defaultInput.size,
      });
    }
  }

  const defaultInput = {
    ...defaultSearchInput,
    size: 5,
    page: 1,
  };

  export type Input = {
    username: string;
    page?: number;
    size?: number;
  };

  export type Output = PostOutput[];
}

export default GetUserFeed;
