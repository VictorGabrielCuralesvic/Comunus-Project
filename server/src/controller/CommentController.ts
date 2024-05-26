import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class CommentsController {
    async create(req: Request, res: Response) {
        const { content, authorId, discussionId} = req.body;

        try {
            const comment = await prisma.comment.create({
                data: {
                    content,
                    authorId,
                    discussionId
                }
            });
            return res.json({ comment });
        } catch (error) {
            return res.status(400).json({ error: "Error creating comment" });
        }
    }

    async list(req: Request, res: Response) {
        const { discussionId } = req.params;

        try {
            const comments = await prisma.comment.findMany({
                where: { discussionId: Number(discussionId) },
                include: {
                    author: true
                }
            });
            return res.json({ comments });
        } catch (error) {
            return res.status(400).json({ error: "Error fetching comments" });
        }
    }
}