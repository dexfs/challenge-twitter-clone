import { User } from '#core/users/domain/entities/user';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';

describe('Domain -> User', () => {
  it('should return user correctly', () => {
    const id = new UniqueEntityId();
    const user = new User({ username: 'user test' }, id);
    expect(user.id).toBe(id.value);
    expect(user.username).toBe('user test');
  });
});
