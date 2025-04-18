import CategoryService from '../services/CategoryService.js';

// Buscar Todas Categorias
// Criar nova Categoria (podendo ou não estar associando essa categoria com um usuário)
// Deletar Categoria por ID
// Atualizar Categoria por ID

export default {
    async getAll(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            throw new Error(`Erro ao buscar categorias: ${error.message}`);
        }
    },

    async createCategory(req, res) {
        try {
            const { name, type, userId } = req.body;
            const newCategory = await CategoryService.createCategory(name, type, userId);
            res.json(newCategory);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async deleteCategory(req, res) {
        try {
            await CategoryService.deleteCategory(req.params.id);
            res.json({ message: 'Categoria deletada com sucesso.' });
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async updateCategory(req, res) {
        try {
            const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body);
            res.json(updatedCategory);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }
}