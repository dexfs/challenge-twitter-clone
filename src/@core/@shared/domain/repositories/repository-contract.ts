import Entity from '../entities/entity';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export interface RepositoryInterface<E extends Entity> {
  insert(entitiy: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}
