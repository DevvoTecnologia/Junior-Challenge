import { Router } from "express";
import { ringsRoute } from "./rings/rings.routes";
// import { transactionsRoute } from "./transactions/transactions.routes";

export const router = Router();

router.use("/rings", ringsRoute);
// router.use("/transactions", transactionsRoute);
