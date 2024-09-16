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
      `
      Crie uma descrição detalhada de um artefato mágico chamado "${itemName}". O tipo de artefato será determinado pelo nome e pode incluir, mas não se limitar a: anel, elmo, espada, escudo, cajado, machado, bota, capa, ou qualquer outro item mágico. A descrição deve conter:

Aspecto Geral: Descreva o formato, o material e o design do artefato, refletindo sua aura mágica e beleza épica. Detalhe a aparência do item, sua construção e quaisquer características distintivas.

Detalhes Específicos:

Anel: Descreva a pedra preciosa (se houver), o design da bandagem e os símbolos mágicos gravados.
Elmo: Detalhe o formato, material, e quaisquer adornos ou símbolos que conferem proteção e poder.
Espada: Descreva a lâmina, o cabo, e as inscrições ou runas mágicas.
Escudo: Informe sobre o emblema, a forma, o material, e qualquer detalhe decorativo que confere proteção.
Cajado: Detalhe o formato, o material, e as inscrições mágicas ou gemas no topo.
Machado: Descreva o formato da lâmina, o cabo, e quaisquer símbolos que aumentam seu poder.
Bota: Descreva o material, design e quaisquer encantamentos que conferem habilidades especiais como agilidade ou resistência.
Capa: Detalhe o tecido, cor, e qualquer efeito mágico que ofereça ao portador, como invisibilidade ou proteção contra elementos.
Poderes e Efeitos: Explique como o poder "${itemPower}" se manifesta no artefato. Descreva como o poder influencia a aparência do item e seus efeitos mágicos ou habilidades especiais.

Ambiente e Atmosfera: Crie um ambiente que complemente o artefato e seu poder, evocando uma sensação de magia e grandiosidade.
      `,
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
