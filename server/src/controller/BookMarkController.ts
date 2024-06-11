import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class BookmarkController {
    async addBookmark(req: Request, res: Response) {
        const { resourceId } = req.params;
        const userId = parseInt(req.headers['userId'] as string);

        try {
            const existingBookmark = await prisma.resource.findFirst({
                where: {
                    id: parseInt(resourceId),
                    bookmarks: {
                        some: {
                            id: userId
                        }
                    }
                }
            });

            if (existingBookmark) {
                return res.status(400).json({ error: "Resource already bookmarked" });
            }

            const bookmark = await prisma.resource.update({
                where: { id: parseInt(resourceId) },
                data: {
                    bookmarks: {
                        connect: { id: userId }
                    }
                }
            });

            return res.json({ bookmark });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Error adding bookmark" });
        }
    }

    async removeBookmark(req: Request, res: Response) {
        const { resourceId } = req.params;
        const userId = parseInt(req.headers['userId'] as string);

        try {
            const existingBookmark = await prisma.resource.findFirst({
                where: {
                    id: parseInt(resourceId),
                    bookmarks: {
                        some: {
                            id: userId
                        }
                    }
                }
            });

            if (!existingBookmark) {
                return res.status(400).json({ error: "Resource not bookmarked" });
            }
            
            const bookmark = await prisma.resource.update({
                where: { id: parseInt(resourceId) },
                data: {
                    bookmarks: {
                        disconnect: { id: userId }
                    }
                }
            });

            return res.json({ bookmark });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Error removing bookmark" });
        }
    }

    async listBookmarks(req: Request, res: Response) {
        const userId = parseInt(req.headers['userId'] as string);

        try {
            const bookmarks = await prisma.resource.findMany({
                where: {
                    bookmarks: {
                        some: {
                            id: userId
                        }
                    }
                }
            });

            return res.json({ bookmarks });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Error fetching bookmarks" });
        }
    }
}