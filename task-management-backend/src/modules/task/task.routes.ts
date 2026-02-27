import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import * as controller from "./task.controller";

const router = Router();

router.use(authenticate);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);
router.patch("/:id/toggle", controller.toggle);

export default router;