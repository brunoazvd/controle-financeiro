// prisma/seed.js
import { PrismaClient } from '@prisma/client'
import { subMonths, addMonths, addDays, startOfDay, endOfDay } from 'date-fns'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

function gerarDiaAleatorio() {
    return Math.floor(Math.random() * 21) - 10;
}

async function main() {
  const hashedPassword = await bcrypt.hash('teste', 10);

  const user = await prisma.user.create({
    data: {
      username: 'teste',
      password: hashedPassword,
    },
  })

  const categories = await prisma.category.createMany({
    data: [
      { name: 'Salário', type: 'INCOME', userId: user.id },
      { name: 'Freelancer', type: 'INCOME', userId: user.id },
      { name: 'Rendimentos', type: 'INCOME', userId: user.id },
      { name: 'Reembolsos', type: 'INCOME', userId: user.id },
      { name: 'Venda de Itens', type: 'INCOME', userId: user.id },
      { name: 'Outros Recebimentos', type: 'INCOME', userId: user.id },
      { name: 'Alimentação', type: 'EXPENSE', userId: user.id },
      { name: 'Transporte', type: 'EXPENSE', userId: user.id },
      { name: 'Moradia', type: 'EXPENSE', userId: user.id },
      { name: 'Educação', type: 'EXPENSE', userId: user.id },
      { name: 'Lazer', type: 'EXPENSE', userId: user.id },
      { name: 'Saúde', type: 'EXPENSE', userId: user.id },
      { name: 'Compras', type: 'EXPENSE', userId: user.id },
      { name: 'Assinaturas', type: 'EXPENSE', userId: user.id },
      { name: 'Impostos e Taxas', type: 'EXPENSE', userId: user.id },
      { name: 'Doações', type: 'EXPENSE', userId: user.id },
      { name: 'Outros Gastos', type: 'EXPENSE', userId: user.id },
    ],
  })

  const allCategories = await prisma.category.findMany({ where: { userId: user.id } })
  const findCategory = name => allCategories.find(c => c.name === name)

  const bankAccount = await prisma.account.create({
    data: {
      name: 'Conta Bancária',
      type: 'BANK',
      userId: user.id,
    },
  })

  const creditAccount = await prisma.account.create({
    data: {
      name: 'Cartão de Crédito',
      type: 'CREDIT_CARD',
      userId: user.id,
      closingDay: 10,
      dueDay: 20,
    },
  })

  const statementDates = [0, 1, 2].map(offset => {
    const closingDay = 10
    const dueDay = 20
    const today = new Date()
    const ref = addMonths(new Date(today.getFullYear(), today.getMonth(), closingDay), offset)
    const startDate = new Date(ref)
    startDate.setMonth(startDate.getMonth() - 1)
    const endDate = new Date(ref)
    const dueDate = new Date(endDate.getFullYear(), endDate.getMonth(), dueDay)
    return { startDate, endDate, dueDate }
  })

  const statements = await Promise.all(
    statementDates.map(d =>
      prisma.creditCardStatement.create({
        data: {
          accountId: creditAccount.id,
          startDate: d.startDate,
          endDate: d.endDate,
          dueDate: d.dueDate,
        },
      })
    )
  )

  const parent = await prisma.transaction.create({
    data: {
      description: 'Compra Parcelada: Notebook',
      amount: 300,
      type: 'EXPENSE',
      date: new Date(),
      accountId: creditAccount.id,
      categoryId: findCategory('Compras').id,
      userId: user.id,
      installment: 0,
      totalInstallments: 3,
    },
  })

  for (let i = 1; i <= 3; i++) {
    await prisma.transaction.create({
      data: {
        description: `Parcelamento Notebook (${i}/3)`,
        amount: 100,
        type: 'EXPENSE',
        date: addMonths(new Date(), i),
        accountId: creditAccount.id,
        categoryId: findCategory('Compras').id,
        userId: user.id,
        installment: i,
        totalInstallments: 3,
        installmentOf: parent.id,
        statementId: statements[i - 1].id,
      },
    })
  }

  await prisma.recurringTransaction.create({
    data: {
      userId: user.id,
      accountId: creditAccount.id,
      categoryId: findCategory('Assinaturas').id,
      description: 'Netflix',
      amount: 39.90,
      type: 'EXPENSE',
      startDate: new Date(),
      recurrenceRule: 'monthly',
      nextOccurrence: addMonths(new Date(), 1),
    },
  })

  await prisma.transaction.create({
    data: {
      description: 'Netflix',
      amount: 39.90,
      type: 'EXPENSE',
      date: new Date(),
      accountId: creditAccount.id,
      categoryId: findCategory('Assinaturas').id,
      userId: user.id,
      statementId: statements[0].id,
    },
  })

  const bankSpendingCategories = ['Alimentação', 'Transporte', 'Outros Gastos']
  for (let i = 0; i < 5; i++) {
    const cat = findCategory(bankSpendingCategories[i % bankSpendingCategories.length])
    await prisma.transaction.create({
      data: {
        description: `Despesa bancária ${i + 1}`,
        amount: (Math.random() * 100).toFixed(2),
        type: 'EXPENSE',
        date: addDays(new Date(), gerarDiaAleatorio()),
        accountId: bankAccount.id,
        categoryId: cat.id,
        userId: user.id,
      },
    })
  }

  const creditSpendingCategories = ['Moradia', 'Lazer', 'Saúde', 'Doações']
  for (let i = 0; i < 9; i++) {
    const cat = findCategory(creditSpendingCategories[i % creditSpendingCategories.length])
    await prisma.transaction.create({
      data: {
        description: `Compra crédito ${i + 1}`,
        amount: (Math.random() * 200).toFixed(2),
        type: 'EXPENSE',
        date: addDays(new Date(), gerarDiaAleatorio()),
        accountId: creditAccount.id,
        categoryId: cat.id,
        userId: user.id,
        statementId: statements[0].id,
      },
    })
  }

  console.log('Seed finalizado com sucesso.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
