import {Router} from 'express';
import { UserController } from '../controller/UserController';
import { ForumController } from '../controller/DiscussionTopics';
import { CommentsController } from '../controller/CommentController';

const userController = new UserController();
const forumController = new ForumController();
const commentsController = new CommentsController();

export const router = Router();

router.post("/createuser", userController.store)
router.get("/users", userController.index)

// forum routes
router.post("/foruns", forumController.create);
router.get("/foruns", forumController.list);

// comments routes
router.post("/comments", commentsController.create);
router.get("/comments/:discussionId", commentsController.list);