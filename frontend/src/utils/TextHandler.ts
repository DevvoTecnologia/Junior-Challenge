export const textLimiter = (text: string, numberOfCharacters: number) =>{
  return text.length > numberOfCharacters ? text.slice(0, numberOfCharacters) + '...' : text;
}
