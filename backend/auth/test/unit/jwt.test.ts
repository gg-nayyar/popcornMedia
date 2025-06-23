import jwt from 'jsonwebtoken';

const payload = { id: 'user123', email: 'test@example.com' };
const secret = process.env.JWT_SECRET || 'testsecret';

describe('JWT utils', () => {
  it('generates a JWT token', () => {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    expect(typeof token).toBe('string');
  });

  it('verifies a JWT token', () => {
    const token = jwt.sign(payload, secret);
    const decoded = jwt.verify(token, secret) as typeof payload;
    expect(decoded.email).toBe(payload.email);
  });

  it('throws error on invalid token', () => {
    expect(() => jwt.verify('invalid.token', secret)).toThrow();
  });
});
