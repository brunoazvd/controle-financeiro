import { prisma } from '../../database/index.js';


// Get All Transactions for a given User
// Create a new Transaction for a given User
// Delete a Transaction by ID
// Update a Transaction by ID


class TransactionService {
    constructor() {
        this.prisma = prisma;
    }

    async getAllTransactions(userId) {
        try {
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    userId,
                }
            });
            return transactions;
        } catch (error) {
            throw new Error(`Erro ao buscar transações: ${error.message}`);
        }
    }

    async createTransaction (description, amount, type, date, accountId, categoryId, userId) {
        try {
            const newTransaction = await this.prisma.transaction.create({
                data: {
                    description,
                    amount,
                    type,
                    date,
                    accountId,
                    categoryId,
                    userId,
                }
            });
            return newTransaction;
        } catch (error) {
            throw new Error(`Erro ao criar transação: ${error.message}`);
        }
    }

    async deleteTransaction(id) {
        try {
            await this.prisma.transaction.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            throw new Error(`Erro ao deletar transação: ${error.message}`);
        }
    }

    async updateTransaction(id, updates) {
        try {
            const updatedTransaction = await this.prisma.transaction.update({
                where: {
                    id,
                },
                data: updates,
            });
            return updatedTransaction;
        } catch (error) {
            throw new Error(`Erro ao atualizar transação: ${error.message}`);
        }
    }
}

const service = new TransactionService();

export default service;