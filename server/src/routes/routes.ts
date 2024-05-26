import {Router} from 'express';
import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController';
import { AuthMiddleware } from '../middlewares/auth';
import { ForumController } from '../controller/DiscussionTopics';
import { CommentsController } from '../controller/CommentController';

const userController = new UserController();
const authController = new AuthController();
const forumController = new ForumController();
const commentsController = new CommentsController();

export const router = Router();

// user routes
router.post("/createuser", userController.store);
router.get("/users", AuthMiddleware, userController.index);
router.post("/auth", authController.authenticate);

// forum routes
router.post("/foruns", AuthMiddleware, forumController.create);
router.get("/foruns", forumController.list);

// comments routes
router.post("/comments", AuthMiddleware, commentsController.create);
router.get("/comments/:discussionId", commentsController.list);