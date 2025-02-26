const Account = require('./Account');

/**
 * CheckingAccount class extending the base Account
 */
class CheckingAccount extends Account {
  /**
   * Create a checking account
   * @param {string} id - Unique identifier for the account
   * @param {string} userId - ID of the user who owns the account
   * @param {number} balance - Initial balance
   * @param {number} overdraftLimit - Maximum overdraft limit (optional)
   */
  constructor(id, userId, balance = 0, overdraftLimit = 0) {
    super(id, userId, 'checking', balance);
    this.overdraftLimit = overdraftLimit;
    this.monthlyFee = 5.00;
    this.transactionLimit = null; // No transaction limit for checking
  }

  /**
   * Override withdraw to handle overdraft
   * @param {number} amount - Amount to withdraw
   * @returns {Transaction} - The transaction object
   * @throws {Error} - If amount is invalid or exceeds overdraft limit
   */
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }

    // Check if withdrawal would exceed overdraft limit
    if (amount > (this.balance + this.overdraftLimit)) {
      throw new Error('Exceeds available balance and overdraft limit');
    }

    return super.withdraw(amount);
  }

  /**
   * Apply monthly maintenance fee
   * @returns {Transaction} - The fee transaction
   */
  applyMonthlyFee() {
    this.balance -= this.monthlyFee;
    const transaction = new Transaction(
      Transaction.generateTransactionId(),
      'fee',
      this.monthlyFee,
      this.id,
      null,
      'Monthly maintenance fee'
    );
    
    this.transactions.push(transaction);
    return transaction;
  }

  /**
   * Get checking account details
   * @returns {Object} - Account details with checking-specific info
   */
  getAccountInfo() {
    const baseInfo = super.getAccountInfo();
    return {
      ...baseInfo,
      overdraftLimit: this.overdraftLimit,
      monthlyFee: this.monthlyFee
    };
  }
}

module.exports = CheckingAccount; 