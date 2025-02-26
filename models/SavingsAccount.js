const Account = require('./Account');
const Transaction = require('./Transaction');

/**
 * SavingsAccount class extending the base Account
 */
class SavingsAccount extends Account {
  /**
   * Create a savings account
   * @param {string} id - Unique identifier for the account
   * @param {string} userId - ID of the user who owns the account
   * @param {number} balance - Initial balance
   * @param {number} interestRate - Annual interest rate (in percentage)
   */
  constructor(id, userId, balance = 0, interestRate = 0.5) {
    super(id, userId, 'savings', balance);
    this.interestRate = interestRate;
    this.monthlyWithdrawalLimit = 6;
    this.withdrawalsThisMonth = 0;
    this.lastInterestApplicationDate = new Date();
  }

  /**
   * Override withdraw to enforce withdrawal limits
   * @param {number} amount - Amount to withdraw
   * @returns {Transaction} - The transaction object
   * @throws {Error} - If withdrawal limit reached or other errors
   */
  withdraw(amount) {
    if (this.withdrawalsThisMonth >= this.monthlyWithdrawalLimit) {
      throw new Error('Monthly withdrawal limit reached');
    }
    
    const transaction = super.withdraw(amount);
    this.withdrawalsThisMonth++;
    return transaction;
  }

  /**
   * Apply interest to the account
   * @returns {Transaction} - The interest transaction
   */
  applyInterest() {
    const monthlyRate = this.interestRate / 12 / 100;
    const interestAmount = this.balance * monthlyRate;
    this.balance += interestAmount;
    
    const transaction = new Transaction(
      Transaction.generateTransactionId(),
      'interest',
      interestAmount,
      null,
      this.id,
      'Monthly interest'
    );
    
    this.transactions.push(transaction);
    this.lastInterestApplicationDate = new Date();
    return transaction;
  }

  /**
   * Reset monthly withdrawal counter
   */
  resetMonthlyWithdrawals() {
    this.withdrawalsThisMonth = 0;
  }

  /**
   * Get savings account details
   * @returns {Object} - Account details with savings-specific info
   */
  getAccountInfo() {
    const baseInfo = super.getAccountInfo();
    return {
      ...baseInfo,
      interestRate: this.interestRate,
      monthlyWithdrawalLimit: this.monthlyWithdrawalLimit,
      withdrawalsThisMonth: this.withdrawalsThisMonth,
      lastInterestApplicationDate: this.lastInterestApplicationDate
    };
  }
}

module.exports = SavingsAccount; 