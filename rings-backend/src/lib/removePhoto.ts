import fs from 'node:fs';
import path from 'node:path';

export const removePhoto = (photoPath: string) => {
  fs.unlink(path.resolve('uploads', photoPath), (err: unknown) => {
    if (err instanceof Error) throw err;
    console.log('File deleted!');
  });
};
