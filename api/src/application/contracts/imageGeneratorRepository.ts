export interface ImageGeneratorRepository {
  generate(itemName: string, itemPower: string): Promise<string>
}
