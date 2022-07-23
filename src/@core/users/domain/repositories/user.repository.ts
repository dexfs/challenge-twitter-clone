import { RepositoryInterface } from '#core/@shared/domain/repositories/repository-contract';
import Entity from '#core/@shared/domain/entities/entity';

namespace UserRepository {
  export interface Repository<E extends Entity = any>
    extends RepositoryInterface<E> {
    findByUsername(username: string): E | Promise<E> | null;
  }
}

export default UserRepository;
