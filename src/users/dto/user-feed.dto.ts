import GetUserFeed from '#core/users/application/get-user-feed';

export class UserFeedDto implements GetUserFeed.Input {
  username: string;
  limit: number;
}
