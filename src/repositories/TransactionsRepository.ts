import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const allTransaction = this.transactions;

    return allTransaction;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (saldo: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            saldo.income += transaction.value;
            break;
          case 'outcome':
            saldo.outcome += transaction.value;
            break;
          default:
            break;
        }
        return saldo;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
