import { Controller } from '@/presentation/contracts/controller'
import { HealthController } from '@/presentation/controllers/HealthController'

export const makeHealthController = (): Controller => {
  const controller = new HealthController()
  return controller
}
