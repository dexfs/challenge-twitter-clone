import UseCaseInterface from '#core/@shared/application/use-case';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { User } from '#core/users/domain/entities/user';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import {
  InfoUserDtoOutput,
  InfoUserOutputMapper,
} from '../../../users/dto/info-user.dto';

namespace GetUserInfoUseCase {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository<User>,
      private postRepository: PostRepository.Repository<Post>,
    ) {}

    async execute(input: Input): Promise<Output | null> {
      const user = await this.userRepository.findByUsername(input.username);
      if (!user) return null;
      const userCountPosts = await this.postRepository.countPostsByUser(
        user.id,
      );
      return InfoUserOutputMapper.toOutput(user, userCountPosts);
    }
  }

  export type Input = {
    username: string;
  };

  export type Output = InfoUserDtoOutput;
}

export default GetUserInfoUseCase;
