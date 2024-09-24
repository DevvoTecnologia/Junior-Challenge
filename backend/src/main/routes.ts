import { Router } from 'express'
import { makeCreateRingController, makeDeleteRingController, makeFetchRingController, makeUpdateRingController } from './factories/rings'
import { makeFetchForgerController } from './factories/forgers/make-fetch-forger-controller'

const routes = Router()

routes.post("/rings", (req, res) => makeCreateRingController().handle(req, res))
routes.put("/rings/:ringId", (req, res) => makeUpdateRingController().handle(req, res))
routes.delete("/rings/:ringId", (req, res) => makeDeleteRingController().handle(req, res))
routes.get("/rings", (req, res) => makeFetchRingController().handle(req, res))

routes.get("/forgers", (req, res) => makeFetchForgerController().handle(req, res))

export { routes }