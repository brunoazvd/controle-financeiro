import { prisma } from '../../database/index.js';

// Buscar Todas Categorias
// Criar nova Categoria (podendo ou não estar associando essa categoria com um usuário)
// Deletar Categoria por ID
// Atualizar Categoria por ID

class CategoryService {
    constructor() {
        this.prisma = prisma;
    }

    async getAllCategories() {
        try {
            const categories = await this.prisma.category.findMany();
            return categories;
        } catch (error) {
            throw new Error(`Erro ao buscar categorias: ${error.message}`);
        }
    }

    async createCategory(name, type, userId) {
        try {
            const newCategory = await this.prisma.category.create({
                data: {
                    name,
                    type,
                    userId,
                }
            });
            return newCategory;
        } catch (error) {
            throw new Error(`Erro ao criar categoria: ${error.message}`);
        }
    }

    async deleteCategory(id) {
        try {
            await this.prisma.category.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(`Erro ao deletar categoria: ${error.message}`);
        }
    }

    async updateCategory(id, updates) {
        try {
            const updatedCategory = await this.prisma.category.update({
                where: {
                    id,
                },
                data: updates,
            });
            return updatedCategory;
        } catch (error) {
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        }
    }
}

const service = new CategoryService();

export default service;