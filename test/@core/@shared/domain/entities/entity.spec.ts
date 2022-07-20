import Entity from '#core/@shared/domain/entities/entity';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import { validate as uuidValidate } from 'uuid';

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe('Entity Unit Tests', () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'prop1 value', prop2: 10 };
    const entity = new StubEntity(arrange);
    expect(entity.props).toEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const arrange = { prop1: 'prop1 value', prop2: 10 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toEqual(uniqueEntityId.value);
  });

  it('should convert an entity to a Javascript Object', () => {
    const arrange = { prop1: 'prop1 value', prop2: 10 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...arrange });
  });
});
