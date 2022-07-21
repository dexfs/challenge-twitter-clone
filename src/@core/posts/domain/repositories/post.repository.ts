import { RepositoryInterface } from '#core/@shared/domain/repositories/repository-contract';
import Entity from '#core/@shared/domain/entities/entity';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace PostRepository {
  export interface Repository<E extends Entity> extends RepositoryInterface<E> {
    search(query: any): any;

    countPostsByUser(userId: string): Promise<number>;
  }
}

export default PostRepository;
