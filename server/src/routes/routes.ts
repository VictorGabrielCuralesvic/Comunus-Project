import {Router} from 'express';
import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController';
import { AuthMiddleware } from '../middlewares/auth';
import { ForumController } from '../controller/DiscussionTopics';
import { CommentsController } from '../controller/CommentController';
import { FollowerController } from '../controller/FollowerController';
import { BookmarkController } from '../controller/BookMarkController';

const userController = new UserController();
const authController = new AuthController();
const forumController = new ForumController();
const commentsController = new CommentsController();
const followerController = new FollowerController();
const bookmarkController = new BookmarkController();

export const router = Router();

// user routes
router.post("/createuser", userController.store);
router.get("/users", AuthMiddleware, userController.index);
router.post("/auth", authController.authenticate);

// forum routes
router.post("/foruns", AuthMiddleware, forumController.create);
router.get("/foruns", forumController.list);

// comments routes
router.post("/comments/:discussionId", AuthMiddleware, commentsController.create);
router.get("/comments/:discussionId", commentsController.list);

// follower routes
router.post("/follow/:followingId", AuthMiddleware, followerController.follow);
router.delete("/unfollow/:followingId", AuthMiddleware, followerController.unfollow);
router.get("/followers/:userId", followerController.listFollowers);
router.get("/following/:userId", followerController.listFollowing);

// user routes
router.get("/user/:userId", userController.show);
router.get("/user/:userId/discussions", userController.getUserDiscussion);
router.get("/user/:userId/comments", userController.getUserComments);
router.get("/user/:userId/resources", userController.getUserResources);

// bookmark routes
router.post("/bookmarks/:resourceId", AuthMiddleware, bookmarkController.addBookmark);
router.delete("/bookmarks/:resourceId", AuthMiddleware, bookmarkController.removeBookmark);
router.get("/bookmarks", AuthMiddleware, bookmarkController.listBookmarks);
