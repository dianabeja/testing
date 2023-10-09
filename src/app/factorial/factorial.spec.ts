import { factorial } from './factorial';

describe('Factorial', () => {
  it('should return 1 for factorial of 1', () => {
    const result = factorial(1);
    expect(result).toBe(1);
  });

  it('should return 6 for factorial of 3', () => {
    const result = factorial(3);
    expect(result).toBe(6);
  });
});