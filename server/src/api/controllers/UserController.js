import UserService from '../services/UserService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;

export default {
    async createUser(req, res) {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserService.createUser(username, hashedPassword);
            const token = jwt.sign({ userId: user.id }, secretKey);
            res.json({ message: 'Usuário registrado com sucesso.', token });
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await UserService.getUserByUsername(username);

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
            res.status(400).json({ message: 'Erro ao autenticar usuário.' });
        }
    },

    async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await UserService.updateUser(req.params.id, req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.json({ message: 'Usuário deletado com sucesso.' });
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async verifyToken(req, res) {
        try {
            res.json({ valid: true, userId: req.user.userId });
        } catch (error) {
            res.status(401).json({ valid: false, message: 'Token inválido.' });
        }
    }
}