import { CrypterRepository } from '@/application/contracts/crypterRepository'
import bcrypt from 'bcrypt'

export class CrypterRepo implements CrypterRepository {
  async crypt(text: string): Promise<string> {
    const hash = await bcrypt.hash(text, 10)
    return hash
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash)
  }
}
