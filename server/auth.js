import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const secretKey = process.env.SECRET_KEY;

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            },
        });
        res.json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar usuário.' });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida.' });
        }
    
        const token = jwt.sign({ userId: user.id }, secretKey);
        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Erro ao autenticar usuário.' });
    }
});
