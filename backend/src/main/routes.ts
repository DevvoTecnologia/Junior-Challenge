import { Router } from 'express'
import { makeCreateRingController, makeDeleteRingController, makeFetchRingController, makeUpdateRingController } from './factories/rings'

const routes = Router()

routes.post("/rings", (req, res) => makeCreateRingController().handle(req, res))
routes.put("/rings/:ringId", (req, res) => makeUpdateRingController().handle(req, res))
routes.delete("/rings/:ringId", (req, res) => makeDeleteRingController().handle(req, res))
routes.get("/rings/fetch", (req, res) => makeFetchRingController().handle(req, res))

export { routes }