import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import InvalidUuidError from '#core/@shared/errors/invalid-uuid.error';
import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId Unit Tests', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('FAKE_ID')).toThrow(new InvalidUuidError());
    expect(validateSpy).toBeCalledTimes(1);
  });

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const uuid = 'e5d49fe4-0dfb-4b6f-a7ff-9c8618e7510b';
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toBeCalledTimes(1);
  });

  it('should generate a valid uuid', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const vo = new UniqueEntityId();

    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toBeCalledTimes(1);
  });
});
