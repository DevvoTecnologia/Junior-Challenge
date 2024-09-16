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
      `Crie uma descrição detalhada para um artefato mágico chamado "${itemName}". O tipo de artefato deve ser determinado pelo nome e pode incluir, mas não se limita a: anel, espada, escudo, arco e flecha, cajado, ou amuleto. A descrição deve incluir:
    
      - **Aspecto Geral**: Detalhes sobre o formato, material e design do artefato, refletindo a aura mágica e a beleza do item. O artefato deve ser descrito com uma estética que capture a essência de um item de fantasia épico.
    
      - **Detalhes Específicos**:
        - **Anel**: Descreva a pedra preciosa (se houver), o design da bandagem e os símbolos mágicos gravados. A bandagem pode ter intrincados detalhes e padrões que refletem a magia do anel.
        - **Espada**: Detalhe a lâmina, o cabo e as inscrições ou runas mágicas. A lâmina deve ter um brilho encantado e o cabo pode ter detalhes decorativos mágicos.
        - **Escudo**: Descreva o emblema, a forma, o material e qualquer detalhe decorativo. O escudo pode ter símbolos protetores e uma estrutura que irradia poder.
        - **Arco e Flecha**:
          - **Arco**:
            - **Formato e Material**: Descreva o formato do arco (reto, curvado, duplo) e o material usado (madeira, metal, cristal). Inclua detalhes sobre as texturas e acabamentos, como entalhes ou gemas embutidas.
            - **Cordas e Detalhes Ornamentais**: Informe sobre as cordas do arco (feitas de que material? têm algum detalhe mágico?). Adicione ornamentos, como inscrições, símbolos ou elementos decorativos que evidenciem a aura mágica do arco.
          - **Flechas**:
            - **Design e Material**: Descreva o design das flechas (simples, adornadas) e o material de que são feitas. Inclua detalhes sobre as pontas e penas das flechas, e qualquer característica mágica.
            - **Efeitos Mágicos**: Se o arco possui efeitos mágicos, descreva como esses efeitos se manifestam nas flechas. Por exemplo, flechas que se acendem em chamas ou que têm a capacidade de controlar o vento.
        - **Cajado**: Descreva o formato e o material do cajado (madeira antiga, cristal, metal). Inclua detalhes sobre as inscrições mágicas ou gemas no topo do cajado, e como eles amplificam os poderes do usuário.
        - **Amuleto**: Detalhe o design do amuleto (forma, material, símbolos). Descreva qualquer gema ou encantamento que o amuleto contenha e como ele protege ou confere poderes ao portador.
    
      - **Poderes e Efeitos**: Descreva os poderes mágicos e efeitos associados ao artefato, enfatizando como o poder de "${itemPower}" se manifesta no artefato. Por exemplo, se o poder é "domínio das chamas", explique como isso se reflete na aparência e nas habilidades do artefato.
    
      - **Tema e Ambiente**: O fundo deve refletir o tema do poder "${itemPower}" e o tipo de artefato, sem desviar a atenção do item principal. Utilize uma iluminação suave para destacar o formato e os detalhes do artefato.
    
      - **Atmosfera**: Crie uma atmosfera que remeta aos mundos de fantasia e misticismo, inspirada em obras como Senhor dos Anéis. A descrição deve capturar a essência mágica e a grandiosidade do artefato.
    
      Exemplo: Se o nome for "Cajado dos Ventos Sussurrantes" e o poder for "controle do vento", a descrição deve detalhar um cajado feito de cristal claro, com inscrições que giram em torno do topo e uma aura que parece se mover como uma brisa suave. O cajado pode emanar uma leve brisa quando em uso, e os poderes podem permitir manipular correntes de ar e criar tempestades.
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
