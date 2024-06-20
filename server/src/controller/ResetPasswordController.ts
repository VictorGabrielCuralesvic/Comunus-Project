import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../utils/emailService";

export class ResetPasswordController {
    async requestPasswordReset(req: Request, res: Response) {
        
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: "1h" });

        await sendPasswordResetEmail(email, token);

        return res.status(200).json({ message: "Password reset email sent" });
    }

    async resetPassword(req: Request, res: Response) {
        
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: "Token and new password are required" });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { email: string };
            const email = decoded.email;

            const hashedPassword = await hash(newPassword, 8);

            await prisma.user.update({
                where: { email },
                data: { password: hashedPassword },
            });

            return res.status(200).json({ message: "Password reset successful" });
        } catch (error) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }
    }
}