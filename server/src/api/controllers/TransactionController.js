import TransactionService from '../services/TransactionService.js';

export default {
    async getUserTransactions(req, res) {
        try {
            const transactions = TransactionService.getAllTransactions(req.params.userId);
            res.json(transactions);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async createTransaction(req, res) {
        try {
            const { description, amount, type, date, accountId, categoryId, userId } = req.body;
            const newTransaction = await TransactionService.createTransaction(description, amount, type, date, accountId, categoryId, userId);
            res.json(newTransaction);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async deleteTransaction(req, res) {
        try {
            await TransactionService.deleteTransaction(req.params.id);
            res.json({ message: 'Transação deletada com sucesso.' });
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    },

    async updateTransaction(req, res) {
        try {
            const updatedTransaction = await TransactionService.updateTransaction(req.params.id, req.body);
            res.json(updatedTransaction);
        } catch (error) {
            res.status(400).json({ error: true, message: error.message });
        }
    }
}