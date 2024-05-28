import {Router} from 'express';
import { UserController } from '../controller/UserController';
import { ForumController } from '../controller/DiscussionTopics';
import { CommentsController } from '../controller/CommentController';
import { ResourceController } from '../controller/ResourceController';
import upload from '../utils/multerConfig';

const userController = new UserController();
const forumController = new ForumController();
const commentsController = new CommentsController();    
const resourceController = new ResourceController();

export const router = Router();

router.post("/createuser", userController.store)
router.get("/users", userController.index)

// forum routes
router.post("/foruns", forumController.create);
router.get("/foruns", forumController.list);

// comments routes
router.post("/comments", commentsController.create);
router.get("/comments/:discussionId", commentsController.list);

// resource routes
router.post("/post-resources", upload.single('file'), resourceController.create);
router.get("/resources", resourceController.list);
router.get("/resources/:id", resourceController.get);
router.delete("/resources/:id", resourceController.delete);