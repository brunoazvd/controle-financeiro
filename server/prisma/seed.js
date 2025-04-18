import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.create({
    data: {
      email: 'usuario@teste.com',
      password: hashedPassword,
    },
  });

  const [contaBanco, contaCarteira] = await Promise.all([
    prisma.account.create({
      data: { name: 'Banco Inter', type: 'BANK', userId: user.id },
    }),
    prisma.account.create({
      data: { name: 'Cartão de Crédito - Mercado Pago', type: 'CREDIT_CARD', userId: user.id },
    }),
  ]);

  const categoriasData = [
    // INCOME
    { name: 'Salário', type: 'INCOME' },
    { name: 'Freelancer', type: 'INCOME' },
    { name: 'Rendimentos', type: 'INCOME' },
    { name: 'Reembolsos', type: 'INCOME' },
    { name: 'Venda de Itens', type: 'INCOME' },
    { name: 'Outros Recebimentos', type: 'INCOME' },

    // EXPENSE
    { name: 'Alimentação', type: 'EXPENSE' },
    { name: 'Transporte', type: 'EXPENSE' },
    { name: 'Moradia', type: 'EXPENSE' },
    { name: 'Educação', type: 'EXPENSE' },
    { name: 'Lazer', type: 'EXPENSE' },
    { name: 'Saúde', type: 'EXPENSE' },
    { name: 'Compras', type: 'EXPENSE' },
    { name: 'Assinaturas', type: 'EXPENSE' },
    { name: 'Impostos e Taxas', type: 'EXPENSE' },
    { name: 'Doações', type: 'EXPENSE' },
    { name: 'Outros Gastos', type: 'EXPENSE' },
  ];

  const categorias = await Promise.all(
    categoriasData.map((cat) =>
      prisma.category.create({
        data: {
          name: cat.name,
          type: cat.type,
          userId: user.id,
        },
      })
    )
  );

  const agora = new Date();
  const diasAtras = (dias) => new Date(agora.getTime() - dias * 24 * 60 * 60 * 1000);

  const getCategoriaId = (name) =>
    categorias.find((c) => c.name === name)?.id;

  const transacoesData = [
    // INCOME
    { description: 'Salário Mensal', amount: 5000, type: 'INCOME', category: 'Salário', dias: 2 },
    { description: 'Freelancer Site', amount: 1200, type: 'INCOME', category: 'Freelancer', dias: 6 },
    { description: 'Venda de Notebook', amount: 1500, type: 'INCOME', category: 'Venda de Itens', dias: 10 },
    { description: 'Cashback Cartão', amount: 50, type: 'INCOME', category: 'Rendimentos', dias: 3 },
    { description: 'Reembolso Uber', amount: 70, type: 'INCOME', category: 'Reembolsos', dias: 7 },
    { description: 'Recebimento Aleatório', amount: 250, type: 'INCOME', category: 'Outros Recebimentos', dias: 15 },

    // EXPENSE
    { description: 'Supermercado', amount: 300, type: 'EXPENSE', category: 'Alimentação', dias: 1 },
    { description: 'Almoço', amount: 45, type: 'EXPENSE', category: 'Alimentação', dias: 4 },
    { description: 'Uber para reunião', amount: 38, type: 'EXPENSE', category: 'Transporte', dias: 5 },
    { description: 'Gasolina', amount: 200, type: 'EXPENSE', category: 'Transporte', dias: 9 },
    { description: 'Aluguel', amount: 1200, type: 'EXPENSE', category: 'Moradia', dias: 14 },
    { description: 'Curso de Programação', amount: 350, type: 'EXPENSE', category: 'Educação', dias: 8 },
    { description: 'Academia', amount: 90, type: 'EXPENSE', category: 'Saúde', dias: 11 },
    { description: 'Netflix', amount: 55, type: 'EXPENSE', category: 'Assinaturas', dias: 12 },
    { description: 'Compra Roupas', amount: 270, type: 'EXPENSE', category: 'Compras', dias: 13 },
    { description: 'Cineminha', amount: 60, type: 'EXPENSE', category: 'Lazer', dias: 3 },
    { description: 'Doação ONG', amount: 100, type: 'EXPENSE', category: 'Doações', dias: 6 },
    { description: 'Multa de Trânsito', amount: 180, type: 'EXPENSE', category: 'Impostos e Taxas', dias: 16 },
    { description: 'Gastos diversos', amount: 150, type: 'EXPENSE', category: 'Outros Gastos', dias: 17 },
    { description: 'Remédio Farmácia', amount: 80, type: 'EXPENSE', category: 'Saúde', dias: 2 },
  ];

  await Promise.all(
    transacoesData.map((t) =>
      prisma.transaction.create({
        data: {
          description: t.description,
          amount: t.amount,
          type: t.type,
          date: diasAtras(t.dias),
          accountId: t.amount > 1000 ? contaBanco.id : contaCarteira.id,
          categoryId: getCategoriaId(t.category),
          userId: user.id,
        },
      })
    )
  );

  console.log('Seed populada com sucesso com categorias e 20 transações!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
