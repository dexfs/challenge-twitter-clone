import ListPosts from '#core/posts/application/list-posts';

export class ListPostDto implements ListPosts.Input {
  all: boolean;
  endDate: string;
  size: number;
  page: number;
  order: [[string, string]];
  startDate: string;
  user_id: string;
}

export class ListPostDtoOutput {
  static toOutput(data: ListPosts.Output[]): ListPostDtoOutput {
    return { items: data };
  }
}
