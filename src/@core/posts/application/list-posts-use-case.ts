export class ListPostsUseCase {
  execute(input: Input): Promise<void> {
    return Promise.resolve();
  }
}

export type Input = {
  content: string;
  user_id: number;
};
