import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";

const router = Router();

// USERS
router.get('/:userId', usersController.getUserById);

export default router;