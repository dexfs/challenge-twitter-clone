import UseCaseInterface from '#core/@shared/application/use-case';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { User } from '#core/users/domain/entities/user';

namespace GetUserInfoUseCase {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private userRepository: UserRepository.Repository<User>) {}

    async execute(input: Input): Promise<Output | null> {
      const user = await this.userRepository.findByUsername(input.username);
      if (!user) return user;
      return user.toJSON();
    }
  }

  export type Input = {
    username: string;
  };

  export type Output = {
    id: string;
    username: string;
  };
}

export default GetUserInfoUseCase;
