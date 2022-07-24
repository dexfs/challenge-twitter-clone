import { User } from '#core/users';
import format from 'date-fns/format';

export class InfoUserDtoOutput {
  username: string;
  joinedAt: string;
  totalPosts: number;
}

export class InfoUserOutputMapper {
  static toOutput(entity: User, totalPosts: number): InfoUserDtoOutput {
    const user = entity.toJSON();
    return {
      username: user.username,
      joinedAt: format(user.created_at, 'MMM dd, yyyy'), //"March 25, 2021"
      totalPosts,
    };
  }
}
