import { Router } from 'express'
import { DeleteController, RegisterController, UpdaterController } from './controllers/ring'
import { FetchController } from './controllers/ring/fetch'

const routes = Router()

routes.get("/rings/fetch", new FetchController().execute)
routes.post("/rings", new RegisterController().execute)
routes.put("/rings/:ringId", new UpdaterController().execute)
routes.delete("/rings/:ringId", new DeleteController().execute)

export { routes }