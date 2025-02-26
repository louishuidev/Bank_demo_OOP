const Bank = require('./models/Bank');

/**
 * This file demonstrates how to use the Bank System
 */

// Create a new bank
const myBank = new Bank('Modern Bank');
console.log(`Welcome to ${myBank.name}!`);

// Create some users
console.log('\n--- Creating Users ---');
const john = myBank.createUser('John Doe', 'john@example.com', '555-123-4567');
const jane = myBank.createUser('Jane Smith', 'jane@example.com', '555-765-4321');

console.log(`Created user: ${john.name} with ID: ${john.id}`);
console.log(`Created user: ${jane.name} with ID: ${jane.id}`);

// Create accounts for users
console.log('\n--- Creating Accounts ---');
const johnsChecking = myBank.createCheckingAccount(john.id, 1000, 200);
const johnsSavings = myBank.createSavingsAccount(john.id, 5000, 1.25);
const janesChecking = myBank.createCheckingAccount(jane.id, 2500);

console.log(`Created checking account for ${john.name}: ${johnsChecking.id}, Balance: $${johnsChecking.balance}`);
console.log(`Created savings account for ${john.name}: ${johnsSavings.id}, Balance: $${johnsSavings.balance}`);
console.log(`Created checking account for ${jane.name}: ${janesChecking.id}, Balance: $${janesChecking.balance}`);

// Perform some transactions
console.log('\n--- Performing Transactions ---');

// Deposit
const deposit = johnsChecking.deposit(500);
console.log(`Deposited $${deposit.amount} into ${john.name}'s checking account`);
console.log(`New Balance: $${johnsChecking.balance}`);

// Withdraw
try {
  const withdrawal = johnsSavings.withdraw(1000);
  console.log(`Withdrew $${withdrawal.amount} from ${john.name}'s savings account`);
  console.log(`New Balance: $${johnsSavings.balance}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// Transfer between accounts
try {
  const transfer = myBank.transferMoney(johnsSavings.id, janesChecking.id, 1500);
  console.log(`Transferred $${transfer.amount} from ${john.name}'s savings to ${jane.name}'s checking`);
  console.log(`${john.name}'s savings balance: $${johnsSavings.balance}`);
  console.log(`${jane.name}'s checking balance: $${janesChecking.balance}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// Apply interest to savings account
console.log('\n--- Applying Interest ---');
const interest = johnsSavings.applyInterest();
console.log(`Applied interest to ${john.name}'s savings account: $${interest.amount.toFixed(2)}`);
console.log(`New Balance: $${johnsSavings.balance.toFixed(2)}`);

// Get account information
console.log('\n--- Account Information ---');
console.log(`John's checking account info:`, johnsChecking.getAccountInfo());
console.log(`John's savings account info:`, johnsSavings.getAccountInfo());

// Get transaction history
console.log('\n--- Transaction History ---');
console.log(`John's checking account transactions:`, johnsChecking.getTransactionHistory().map(t => t.getDetails()));
console.log(`John's savings account transactions:`, johnsSavings.getTransactionHistory().map(t => t.getDetails()));

// Demonstrate error handling
console.log('\n--- Error Handling Demo ---');
try {
  // Try to withdraw more than available balance
  johnsChecking.withdraw(10000);
} catch (error) {
  console.error(`Expected error: ${error.message}`);
}

try {
  // Try to make too many withdrawals from savings
  for (let i = 0; i < 10; i++) {
    johnsSavings.withdraw(1);
  }
} catch (error) {
  console.error(`Expected error: ${error.message}`);
}

console.log('\nBank System Demo Completed!'); 