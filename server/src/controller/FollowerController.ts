import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class FollowerController {
    async follow(req: Request, res: Response) {
        const { followerId, followingId } = req.body;

        if (followerId == followingId) {
            return res.status(400).json({ error: "Users cannot follow themselves"} );
        }

        const existingFollow = await prisma.userFollowers.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });

        if (existingFollow) {
            return res.status(400).json({ error: "You are already following this user" });
        }

        const follow = await prisma.userFollowers.create({
            data: {
                followerId,
                followingId
            }
        });

        return res.json({ follow });
    }

    async unfollow(req: Request, res: Response) {
        const { followerId, followingId } = req.body;

        const follow = await prisma.userFollowers.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });

        if (!follow) {
            return res.json(400).json({ error: "You are not following this user" });
        }

        await prisma.userFollowers.delete({
            where: {
                id: follow.id
            }
        });

        return res.json({ message: "Successfully unfollowed the user" });
    }

    async listFollowers(req: Request, res: Response) {
        const { userId } = req.params;

        const followers = await prisma.userFollowers.findMany({
            where: {
                followingId: parseInt(userId)
            },
            include: {
                follower: true
            }
        });

        return res.json({ followers });
    }

    async listFollowing(req: Request, res: Response) {
        const { userId } = req.params;

        const following = await prisma.userFollowers.findMany({
            where: {
                followerId: parseInt(userId)
            },
            include: {
                following: true
            }
        });

        return res.json({ following })
    }
}