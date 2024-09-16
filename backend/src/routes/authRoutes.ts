import { Router, Request, Response } from "express";

const router = Router();

router.get("/register", (req: Request, res: Response) => {
  res.json({
    message: "Register route",
  });
});

export default router;
