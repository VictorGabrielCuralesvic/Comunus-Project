import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class ForumController {
    async create(req: Request, res: Response) {
        const { title, content, authorId } = req.body;

        try {
            const forum = await prisma.forum.create({
                data: {
                    title,
                    content,
                    authorId
                }
            });
            return res.json({forum});
        } catch (error) {
            return res.status(400).json({ error: "Error creating forum"});
        }
    }

    async list(req: Request, res: Response) {

        try {
            const foruns = await prisma.forum.findMany({
                include: {
                    comments: true,
                    author: true
                }
            });
            return res.json({ foruns })
        } catch (error) {
            return res.status(400).json({ error: "Error fetching forums "});
        }
    }
}