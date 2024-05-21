import {Router} from 'express';
import { UserController } from '../controller/UserController';
import { ForumController } from '../controller/DiscussionTopics';

const userController = new UserController();
const forumController = new ForumController();


export const router = Router();

router.post("/createuser", userController.store)
router.get("/users", userController.index)

// forum routes
router.post("/foruns", forumController.create);
router.get("/foruns", forumController.list);