import { validateBody } from '../validateBody';
import { ringSchema } from './../../../modules/rings/ring.dto';
import { CustomException } from './../../CustomException';

describe('ValidateBody', () => {
  const validationSchema = ringSchema;

  it('should validate body', () => {
    const body = {
      ring_name: 'ring 1',
      ring_image: 'ring image',
      ring_power: 'this is the ring power',
      forger_id: 3,
      carrier_id: 2,
    };
    const validationResult = validateBody(body, validationSchema);
    expect(validationResult).toEqual(body);
  });

  it('should be an instance of custom exception', () => {
    try {
      validateBody(
        {
          ring_name: 'ring 1',
          ring_power: 'this is the ring power',
          forger_id: 3,
          carrier_id: 2,
        },
        validationSchema,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });
});
