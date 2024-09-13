import { Router } from 'express'
import { RegisterRing } from '@/controllers/ring/register'
import { FetchRing } from './controllers/ring/fetch'

const routes = Router()

routes.post("/rings", new RegisterRing().execute)
routes.get("/rings/fetch", new FetchRing().execute)

export { routes }