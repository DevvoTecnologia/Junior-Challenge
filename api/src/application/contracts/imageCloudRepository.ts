export interface ImageCloudRepository {
  uploadImage(imagePath: string): Promise<string>
}
