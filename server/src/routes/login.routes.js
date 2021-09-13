import { Router } from "express";
import * as loginController from "../controllers/login.controller";

const router = Router();

router.post('/', loginController.signIn);

export default router;