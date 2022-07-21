import { RepositoryInterface } from '#core/@shared/domain/repositories/repository-contract';
import Entity from '#core/@shared/domain/entities/entity';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace PostRepository {
  export type Repository<E extends Entity> = RepositoryInterface<E>;
}

export default PostRepository;
