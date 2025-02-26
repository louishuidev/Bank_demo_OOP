/**
 * User class representing a bank customer
 */
class User {
  /**
   * Create a user
   * @param {string} id - Unique identifier for the user
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} phone - User's phone number
   */
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.accounts = [];
    this.createdAt = new Date();
  }

  /**
   * Add an account to the user
   * @param {Account} account - The account to add
   */
  addAccount(account) {
    this.accounts.push(account);
  }

  /**
   * Get all accounts belonging to the user
   * @returns {Array} - List of user's accounts
   */
  getAccounts() {
    return this.accounts;
  }

  /**
   * Get user information
   * @returns {Object} - User details
   */
  getUserInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      accountCount: this.accounts.length,
      createdAt: this.createdAt
    };
  }
}

module.exports = User; 