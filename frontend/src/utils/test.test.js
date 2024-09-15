import { textLimiter } from '@/utils';
import { expect, test } from 'vitest';

test('Should slice the text', () => {
  expect(textLimiter("teste", 2)).toBe("te...")
})