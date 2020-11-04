import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('UserEntity', () => {
  describe('validatePassoword', () => {
    let user: User;

    beforeEach(() => {
      user = new User();
      user.password = 'test password';
      user.salt = 'test salt';
      bcrypt.hash = jest.fn();
      bcrypt.compare = jest.fn();
    });

    it('returns true and password is valid', async () => {
      bcrypt.compare.mockReturnValue(true);

      const result = await user.validatePassword('some password hash');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'some password hash',
        user.password,
      );
      expect(result).toEqual(true);
    });

    it('returns false and password is invalid', async () => {
      bcrypt.compare.mockReturnValue(false);

      const result = await user.validatePassword('some password hash');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'some password hash',
        user.password,
      );
      expect(result).toEqual(false);
    });
  });
});
