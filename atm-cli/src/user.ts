export class User {
  constructor(
    public username: string,
    public pin: string,
    public balance: number = 0
  ) { }
  
  checkBalance(): number {
    return this.balance
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount > this.balance) {
      return false
    } this.balance -= amount
    return true
  }
}