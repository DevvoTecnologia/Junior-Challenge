export const info = (...params: (string | object)[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

export const error = (...params: (string | object)[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};
