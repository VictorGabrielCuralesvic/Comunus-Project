import { Request, Response } from "express";
import prisma from "../utils/prisma";
import path from 'path';

export class ResourceController {
    async create(req: Request, res: Response) {
        const { title, content, type, authorId } = req.body;
        const file = req.file;

        console.log(file);

        try {
            const resource = await prisma.resource.create({
                data: {
                    title,
                    content,
                    type,
                    url: file ? `uploads/${file.filename}` : null,
                    authorId
                }
            });
            console.log(req.file);
            return res.json({ resource });
        } catch (error) {
            return res.status(400).json({ error: "Error creating resource" });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const resource = await prisma.resource.findMany({
                include: {
                    author: true
                }
            });
            return res.json({ resource });
        } catch (error) {
            return res.status(400).json({ error: "Erro fetching resources" });
        }
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const resource = await prisma.resource.findUnique({
                where: { id: Number(id) },
                include: {
                    author: true
                }
            });
            if (!resource) {
                return res.status(404).json({ error: "Resource not found" });
            }
            return res.json({ resource });
        } catch (error) {
            return res.status(400).json({ error: "Error fetching resource" });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const resource = await prisma.resource.delete({
                where: { id: Number(id) }
            });
            // Opcional: Apagar o arquivo associado ao recurso
            if (resource.url) {
                const filePath = path.join(__dirname, '..', '..', resource.url);
                require('fs').unlinkSync(filePath);
            }
            return res.json({ message: "Resource deleted" });
        } catch (error) {
            return res.status(400).json({ error: "Error deleting resource" });
        }
    }
}