export interface CrypterRepository {
  crypt: (text: string) => Promise<string>
  compare: (text: string, hash: string) => Promise<boolean>
}
