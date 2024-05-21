import {Router} from 'express';
import { UserController } from './controller/UserController';

const userController = new UserController();


export const router = Router();

router.post("/createuser", userController.store)
router.get("/users", userController.index)