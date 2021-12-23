import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";
import * as actionsController from "../controllers/actions.controller.js";

const router = Router();


// ADMIN
router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/actions', actionsController.getActions);
router.get('/:userId', usersController.getUserById);
router.put('/:userId', usersController.updateUserById);
router.delete('/:userId', usersController.deleteUserById);
router.get('/:userId/actions', actionsController.getActionsByUserId);

export default router;