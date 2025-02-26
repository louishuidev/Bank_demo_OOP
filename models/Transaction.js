/**
 * Transaction class representing monetary transactions
 */
class Transaction {
  /**
   * Create a transaction
   * @param {string} id - Unique identifier for the transaction
   * @param {string} type - Type of transaction (deposit, withdrawal, transfer)
   * @param {number} amount - Transaction amount
   * @param {string} fromAccountId - Source account ID
   * @param {string} toAccountId - Destination account ID (for transfers)
   * @param {string} description - Transaction description
   */
  constructor(id, type, amount, fromAccountId, toAccountId = null, description = '') {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.description = description;
    this.timestamp = new Date();
    this.status = 'completed';
  }

  /**
   * Get transaction details
   * @returns {Object} - Transaction details
   */
  getDetails() {
    return {
      id: this.id,
      type: this.type,
      amount: this.amount,
      fromAccountId: this.fromAccountId,
      toAccountId: this.toAccountId,
      description: this.description,
      timestamp: this.timestamp,
      status: this.status
    };
  }

  /**
   * Static method to generate a unique transaction ID
   * @returns {string} - Unique transaction ID
   */
  static generateTransactionId() {
    return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
}

module.exports = Transaction; 