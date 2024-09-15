import express from "express";
import multer from "multer";

import { RingController } from "../controllers/ring-controller";
import { UserController } from "../controllers/user-controller";
import { storage } from "../lib/multer-config";

const router = express.Router();
const ringController = new RingController();
const userController = new UserController();
const upload = multer({ storage });

router.post("/ring/create", upload.single("image"), (req, res) =>
  ringController.executeCreate(req, res),
);

router.get("/rings", (req, res) => ringController.executeFindAll(req, res));

router.get("/ring/:id", (req, res) => ringController.executeFindOne(req, res));

router.put("/ring/update/:id", upload.single("image"), (req, res) =>
  ringController.executeUpdate(req, res),
);

router.delete("/ring/delete/:id", (req, res) =>
  ringController.executeDelete(req, res),
);

// user
router.post("/user/create", (req, res) =>
  userController.executeCreate(req, res),
);

router.post("/user/login", (req, res) => userController.executeLogin(req, res));

router.get("/user", (req, res) => userController.executeFindByToken(req, res));

export default router;
