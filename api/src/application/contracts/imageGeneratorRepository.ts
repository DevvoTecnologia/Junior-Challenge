export interface ImageGeneratorRepository {
  generate(prompt: string): Promise<string>
}
