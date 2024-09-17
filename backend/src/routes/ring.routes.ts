import express from "express";
import { createRing, deleteRing, listAllRings, findRing, updateRing } from "../controllers/ring.controller";

const router = express.Router();

router.post('/', createRing);

router.get('/:id', findRing);

router.get('/', listAllRings);

router.put('/:id', updateRing);

router.delete('/:id', deleteRing);

export default router;