import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { hash } from "bcrypt";

export class UserController {
    async index(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json({users});
    }
    
    async store(req: Request, res: Response) {
        const { name, email, password, interests} = req.body;

        const userExists = await prisma.user.findUnique({ where: { email } });
        
        if(userExists) {
            return res.json({ error: "User Exists" });
        }

        const hash_password = await hash(password, 8);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash_password,
                interests
            }
        });
        return res.json({ user })
    }

    async getUserDiscussion(req: Request, res: Response) {
        const { userId } = req.params;

        const discussion = await prisma.forum.findMany({
            where: {
                authorId: parseInt(userId)
            },
            include: {
                comments: true,
                author: true
            }
        });

        return res.json({ discussion });
    }

    async getUserComments(req: Request, res: Response) {
        const { userId } = req.params;

        const comments = await prisma.comment.findMany({
            where: {
                authorId: parseInt(userId)
            },
            include: {
                discussion: true,
                author: true
            }
        });

        return res.json({ comments });
    }

    async getUserResources(req: Request, res: Response) {
        const { userId } = req.params;

        const resources = await prisma.resource.findMany({
            where: {
                authorId: parseInt(userId)
            }
        });

        return res.json({ resources });
    }

    async show(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                },
                include: {
                    followers: {
                        include: {
                            follower: true
                        }
                    },
                    following: {
                        include: {
                            following: true
                        }
                    },
                    discussions: true,
                    comments: true,
                    resources: true,
                    bookmarks: true
                }
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.json({ user });
        } catch (error) {
            return res.status(500).json({ error: "Error fetching user profile" });
        }
    }
}