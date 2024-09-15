export default function idGenerator(length: number = 6): string {
  const id: string[] = [];
  const lettersAndSymbols: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&";
  const lettersAndSymbolsSize: number = lettersAndSymbols.length;

  for (let i: number = 0; i < length; i++) {
    const randomIndex: number = Math.floor(
      Math.random() * (lettersAndSymbolsSize - 1)
    );
    const randomLetterOrSymbol: string = lettersAndSymbols.charAt(randomIndex);

    id.push(randomLetterOrSymbol);
  }

  return id.join("");
}
