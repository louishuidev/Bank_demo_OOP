const Transaction = require('./Transaction');

/**
 * Base Account class
 */
class Account {
  /**
   * Create an account
   * @param {string} id - Unique identifier for the account
   * @param {string} userId - ID of the user who owns the account
   * @param {string} type - Type of account (e.g., 'checking', 'savings')
   * @param {number} balance - Initial balance
   */
  constructor(id, userId, type, balance = 0) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.balance = balance;
    this.transactions = [];
    this.openDate = new Date();
    this.isActive = true;
  }

  /**
   * Deposit money into the account
   * @param {number} amount - Amount to deposit
   * @returns {Transaction} - The transaction object
   * @throws {Error} - If amount is invalid
   */
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }

    this.balance += amount;
    const transaction = new Transaction(
      Transaction.generateTransactionId(),
      'deposit',
      amount,
      null,
      this.id,
      'Deposit into account'
    );
    
    this.transactions.push(transaction);
    return transaction;
  }

  /**
   * Withdraw money from the account
   * @param {number} amount - Amount to withdraw
   * @returns {Transaction} - The transaction object
   * @throws {Error} - If amount is invalid or insufficient funds
   */
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }

    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }

    this.balance -= amount;
    const transaction = new Transaction(
      Transaction.generateTransactionId(),
      'withdrawal',
      amount,
      this.id,
      null,
      'Withdrawal from account'
    );
    
    this.transactions.push(transaction);
    return transaction;
  }

  /**
   * Get account details
   * @returns {Object} - Account details
   */
  getAccountInfo() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      balance: this.balance,
      openDate: this.openDate,
      isActive: this.isActive,
      transactionCount: this.transactions.length
    };
  }

  /**
   * Get transaction history
   * @returns {Array} - List of transactions
   */
  getTransactionHistory() {
    return this.transactions;
  }
}

module.exports = Account; 