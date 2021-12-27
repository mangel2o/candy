import { Router } from "express";
import * as accountController from "../controllers/account.controller.js";

const router = Router();

// Account
router.put('/security/password', accountController.changePassword);
router.get('/:userId', accountController.getUserById);

export default router;