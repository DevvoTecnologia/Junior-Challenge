import { validate } from 'class-validator';
import { Ring } from '../../models/Ring';

export const RING_MOCK = {
  name: 'The One Ring',
  power: 'Rule them all',
  forgedBy: 'Sauron',
  image: 'https://example.com/one-ring.jpg',
} as Ring;

describe('Ring Model', () => {
  it('should create a valid Ring instance', () => {
    const ring = new Ring();
    Object.assign(ring, RING_MOCK);

    expect(ring).toBeInstanceOf(Ring);
    expect(ring.name).toBe('The One Ring');
    expect(ring.power).toBe('Rule them all');
    expect(ring.forgedBy).toBe('Sauron');
    expect(ring.image).toBe('https://example.com/one-ring.jpg');
  });

  it('should fail validation with empty fields', async () => {
    const ring = new Ring();
    const errors = await validate(ring);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with invalid forgedBy value', async () => {
    const ring = new Ring();
    ring.name = 'Invalid Ring';
    ring.power = 'None';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ring.forgedBy = 'Hobbits' as any;
    ring.image = 'https://example.com/invalid-ring.jpg';

    const errors = await validate(ring);
    const forgedByError = errors.find((error) => error.property === 'forgedBy');
    expect(forgedByError).toBeDefined();
  });

  it('should pass validation with valid data', async () => {
    const ring = new Ring();
    Object.assign(ring, RING_MOCK);
    const errors = await validate(ring);
    expect(errors.length).toBe(0);
  });
});
