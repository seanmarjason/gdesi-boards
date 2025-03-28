import jest from 'jest-mock'
import { 
    hashPassword,
    isPasswordValid
} from '../hashPassword'

test('hashPassword returns object with salt iterations and hash', () => {
  const result = hashPassword('some password')

  expect(result).toMatchObject({
    salt: expect.any(String),
    iterations: expect.any(Number),
    hash: expect.any(String),
  });

  expect(result.hash).not.toEqual('some password')

});

test('isPasswordValid returns true if password is valid', () => {
  const user = {
    salt: 'salt',
    iterations: 10,
    pwhash: 'ded5fd36ace28019108070acb5acc9db892eb04230f71ecda77c0dbf97e38a8dd7cd384c0b3a5a903fa8137516563d12c6666db019ef7781ef996b4fcd6b62ca',
  }
  expect(isPasswordValid(user, 'password')).toBe(true);
});

test('isPasswordValid returns false if password is not valid', () => {
    const user = {
        salt: 'salt',
        iterations: 10,
        pwhash: 'ded5fd36ace28019108070acb5acc9db892eb04230f71ecda77c0dbf97e38a8dd7cd384c0b3a5a903fa8137516563d12c6666db019ef7781ef996b4fcd6b62ca',
      }
    expect(isPasswordValid(user, 'invalid password')).toBe(false);
});
