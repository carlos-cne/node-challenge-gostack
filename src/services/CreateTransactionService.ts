import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  type: 'outcome' | 'income';
  value: number;
  title: string;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, value, title }: CreateTransaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw Error('You do not have sufficient balance');
    }
    const transaction = new Transaction({ type, value, title });
    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
