import ListPosts from '#core/posts/application/list-posts';

export class ListPostDto implements ListPosts.Input {
  all: boolean;
  endDate: string;
  limit: number;
  offset: number;
  order: [[string, string]];
  startDate: string;
  user_id: string;
}
