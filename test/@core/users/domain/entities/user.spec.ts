import { User } from '#core/users/domain/entities/user';

describe('Domain -> User', () => {
  it('should return user correctly', () => {
    const user = new User({ id: 1, username: 'user test' });
    expect(user.id).toBe(1);
    expect(user.username).toBe('user test');
  });
});
