import { prisma } from '../../database/index.js';

class UserService {
    constructor() {
        this.prisma = prisma;
    }

    async createUser(email, password) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email,
                    password,
                }
            });
            return newUser;
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email,
                }
            });
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                }
            });
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }

    async updateUser(id, updates) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    id,
                },
                data: updates,
            });
            return updatedUser;
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            await this.prisma.user.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }

}


const service = new UserService();

export default service;