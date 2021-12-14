import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";

const router = Router();

// STUDENTS
router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/:userId', usersController.getUserById);
router.put('/:userId', usersController.updateUserById);
router.delete('/:userId', usersController.deleteUserById);

export default router;