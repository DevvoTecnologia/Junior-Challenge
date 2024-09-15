import { ImageCloudRepository } from '@/application/contracts/imageCloudRepository'
import cloudinary from '../config/cloudnary'

export class CloudinaryImageCloudRepository implements ImageCloudRepository {
  async uploadImage(base64Image: string): Promise<string> {
    try {
      const response = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: 'image', format: 'png' },
            (error, result) => {
              if (error) {
                return reject(error)
              }
              resolve(result)
            },
          )
          .end(Buffer.from(base64Image, 'base64'))
      })

      return response.secure_url
    } catch (error) {
      console.error('Erro ao enviar imagem para o Cloudinary:', error)
      throw new Error('Erro ao enviar imagem para o Cloudinary')
    }
  }
}
