import { validate } from 'class-validator';
import { Owner } from '../../models/Owner';

describe('Owner Model', () => {
  it('should create a valid Owner instance', () => {
    const owner = new Owner();
    owner.name = 'Frodo';

    expect(owner).toBeInstanceOf(Owner);
    expect(owner.name).toBe('Frodo');
  });

  it('should fail validation with empty fields', async () => {
    const owner = new Owner();
    const errors = await validate(owner);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation with name exceeding max length', async () => {
    const owner = new Owner();
    owner.name = 'a'.repeat(256);

    const errors = await validate(owner);
    const nameError = errors.find((error) => error.property === 'name');
    expect(nameError).toBeDefined();
  });

  it('should pass validation with valid data', async () => {
    const owner = new Owner();
    owner.name = 'Gandalf';

    const errors = await validate(owner);
    expect(errors.length).toBe(0);
  });
});
