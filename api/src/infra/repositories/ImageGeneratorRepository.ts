import { ImageGeneratorRepository } from '@/application/contracts/imageGeneratorRepository'
import { env } from '@/env'
import { Buffer } from 'buffer'

export class StableDiffusionImageGeneratorRepository
  implements ImageGeneratorRepository
{
  private readonly apiEndpoint =
    'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4'

  private readonly apiToken = env.HUGGING_FACE_TOKEN

  async generate(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Erro na resposta da API:', errorText)
        throw new Error('Erro ao gerar imagem')
      }

      const imageBuffer = await this.streamToBuffer(response.body)

      const base64Image = imageBuffer.toString('base64')

      return base64Image
    } catch (error) {
      console.error('Erro ao gerar imagem:', error)
      throw new Error('Erro ao gerar imagem')
    }
  }

  private async streamToBuffer(
    stream: ReadableStream<Uint8Array> | null,
  ): Promise<Buffer> {
    if (!stream) {
      throw new Error('O stream é nulo')
    }

    return new Promise((resolve, reject) => {
      const reader = stream.getReader()
      const chunks: Uint8Array[] = []

      reader
        .read()
        .then(function processText({ done, value }) {
          if (done) {
            resolve(Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))))
            return
          }
          chunks.push(value!)
          reader.read().then(processText).catch(reject)
        })
        .catch(reject)
    })
  }
}
