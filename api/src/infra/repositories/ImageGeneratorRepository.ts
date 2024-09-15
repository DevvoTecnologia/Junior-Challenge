import { ImageGeneratorRepository } from '@/application/contracts/imageGeneratorRepository'
import { env } from '@/env'
import { Buffer } from 'buffer'
import translate from 'google-translate-api-x'

export class FluxImageGeneratorRepository implements ImageGeneratorRepository {
  private readonly apiEndpoint =
    'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell'

  private readonly apiToken = env.HUGGING_FACE_TOKEN

  async generate(itemName: string, itemPower: string): Promise<string> {
    const prompt = await this.generatePrompt(
      `Um anel mágico detalhado, elegante e com poderes de 
      ${itemPower}, chamado "${itemName}". O anel deve ter designs intrincados e artísticos, 
      pode ter ou não uma pedra preciosa brilhante, pode ser sem pedra as vezes, com material e formato representando seu poder. Foco na beleza e na aura mística do anel. 
      O fundo deve refletir o tema do poder "${itemPower}", mas de forma a não distrair do anel. 
      Use uma iluminação suave para destacar o formato e os detalhes do anel.`,
    )
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

  private async translateText(text: string) {
    try {
      const res = await translate(text, { from: 'pt', to: 'en' })
      return res.text
    } catch (error) {
      console.error('Erro ao traduzir:', error)
      throw error
    }
  }

  private async generatePrompt(promptInPtBR: string) {
    const translated = await this.translateText(promptInPtBR)
    console.log(translated)
    return translated
  }
}
