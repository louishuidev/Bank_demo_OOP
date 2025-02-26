const User = require('./User');
const CheckingAccount = require('./CheckingAccount');
const SavingsAccount = require('./SavingsAccount');
const Transaction = require('./Transaction');

/**
 * Bank class to manage the entire banking system
 */
class Bank {
  constructor(name) {
    this.name = name;
    this.users = {};
    this.accounts = {};
    this.transactions = [];
  }

  /**
   * Create a new user
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} phone - User's phone
   * @returns {User} - The created user
   */
  createUser(name, email, phone) {
    const userId = `USER${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const user = new User(userId, name, email, phone);
    this.users[userId] = user;
    return user;
  }

  /**
   * Get a user by ID
   * @param {string} userId - User ID
   * @returns {User} - The user object
   * @throws {Error} - If user not found
   */
  getUser(userId) {
    const user = this.users[userId];
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  /**
   * Create a checking account for a user
   * @param {string} userId - User ID
   * @param {number} initialDeposit - Initial deposit amount
   * @param {number} overdraftLimit - Overdraft limit
   * @returns {CheckingAccount} - The created account
   * @throws {Error} - If user not found
   */
  createCheckingAccount(userId, initialDeposit = 0, overdraftLimit = 0) {
    const user = this.getUser(userId);
    const accountId = `ACCT${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const account = new CheckingAccount(accountId, userId, initialDeposit, overdraftLimit);
    this.accounts[accountId] = account;
    user.addAccount(account);
    
    return account;
  }

  /**
   * Create a savings account for a user
   * @param {string} userId - User ID
   * @param {number} initialDeposit - Initial deposit amount
   * @param {number} interestRate - Annual interest rate
   * @returns {SavingsAccount} - The created account
   * @throws {Error} - If user not found
   */
  createSavingsAccount(userId, initialDeposit = 0, interestRate = 0.5) {
    const user = this.getUser(userId);
    const accountId = `ACCT${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const account = new SavingsAccount(accountId, userId, initialDeposit, interestRate);
    this.accounts[accountId] = account;
    user.addAccount(account);
    
    return account;
  }

  /**
   * Get an account by ID
   * @param {string} accountId - Account ID
   * @returns {Account} - The account object
   * @throws {Error} - If account not found
   */
  getAccount(accountId) {
    const account = this.accounts[accountId];
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  /**
   * Transfer money between accounts
   * @param {string} fromAccountId - Source account ID
   * @param {string} toAccountId - Destination account ID
   * @param {number} amount - Amount to transfer
   * @returns {Transaction} - The transfer transaction
   * @throws {Error} - If accounts not found or transfer invalid
   */
  transferMoney(fromAccountId, toAccountId, amount) {
    if (amount <= 0) {
      throw new Error('Transfer amount must be positive');
    }
    
    const fromAccount = this.getAccount(fromAccountId);
    const toAccount = this.getAccount(toAccountId);
    
    // Check if source account has sufficient funds
    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds for transfer');
    }
    
    // Perform the transfer
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    
    // Create a transfer transaction
    const transaction = new Transaction(
      Transaction.generateTransactionId(),
      'transfer',
      amount,
      fromAccountId,
      toAccountId,
      'Transfer between accounts'
    );
    
    // Add transaction to accounts and bank records
    fromAccount.transactions.push(transaction);
    toAccount.transactions.push(transaction);
    this.transactions.push(transaction);
    
    return transaction;
  }

  /**
   * Get all accounts for a user
   * @param {string} userId - User ID
   * @returns {Array} - List of user's accounts
   * @throws {Error} - If user not found
   */
  getUserAccounts(userId) {
    const user = this.getUser(userId);
    return user.getAccounts();
  }

  /**
   * Apply interest to all savings accounts
   * @returns {Array} - List of interest transactions
   */
  applyInterestToAllSavingsAccounts() {
    const interestTransactions = [];
    
    Object.values(this.accounts).forEach(account => {
      if (account.type === 'savings') {
        const transaction = account.applyInterest();
        interestTransactions.push(transaction);
        this.transactions.push(transaction);
      }
    });
    
    return interestTransactions;
  }

  /**
   * Reset monthly withdrawal counts for all savings accounts
   */
  resetAllSavingsAccountWithdrawalLimits() {
    Object.values(this.accounts).forEach(account => {
      if (account.type === 'savings') {
        account.resetMonthlyWithdrawals();
      }
    });
  }
}

module.exports = Bank; 