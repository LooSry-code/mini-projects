import { User } from "./user";
import readline from "readline";

export class Atm {
  private currentUser: User | null = null;
  private users: User[] = [
    new User("Megan", "1234", 1000),
    new User("Leo", "0000", 2000),
  ];

  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  login(username: string, pin: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.pin === pin
    );
    if (user) {
      this.currentUser = user;
      console.log(`Welcome, ${user.username}!`);
      return true;
    }
    console.log(`Invalid username or PIN. Please try again.`);
    return false;
  }

  logout(): void {
    this.currentUser = null;
    console.log(`You have been logged out`);
  }

  checkBalance(): void {
    if (this.currentUser) {
      console.log(`Your balance is: $${this.currentUser.checkBalance()}`);
    } else {
      console.log(`Please login first.`);
    }
  }

  deposit(amount: number): void {
    if (this.currentUser) {
      this.currentUser.deposit(amount);
      console.log(
        `You have deposited $${amount}. Your new balance is: $${this.currentUser.checkBalance()}`
      );
    }
    console.log(`Please login first.`);
  }

  withdraw(amount: number): void {
    if (this.currentUser) {
      const success = this.currentUser.withdraw(amount);
      if (success) {
        console.log(
          `You have withdrawn $${amount}. Your new balance is: $${this.currentUser.checkBalance()}`
        );
      }
      console.log(
        `Insufficient funds. Your balance is: $${this.currentUser.checkBalance()}`
      );
      console.log(`please login first`);
    }
  }

  run(): void {
    this.rl.question(
      "Welcome to the ATM , Please enter your username: ",
      (username) => {
        this.rl.question(`Please enter your pin: `, (pin) => {
          if (this.login(username, pin)) {
            this.mainMenu();
          } else {
            this.rl.close();
          }
        });
      }
    );
  }

  mainMenu(): void {
    console.log(`Main menu displayed`);
    console.log(`
  1. Check Balance : 
  2. Deposit : 
  3. Withdraw : 
  4. Logout : 
  `);
    this.rl.question("Choose an option: ", (option) => {
      switch (option) {
        case "1":
          this.checkBalance();
          this.mainMenu();
          break;
        case "2":
          this.rl.question("Enter amount to deposit: ", (amount) => {
            this.deposit(Number(amount));
            this.mainMenu();
          });
          break;
        case "3":
          this.rl.question("Enter amount to withdraw: ", (amount) => {
            this.withdraw(Number(amount));
            this.mainMenu();
          });
          break;
        case "4":
          this.logout();
          this.rl.close();
          break;
        default:
          console.log("Invalid option");
          this.mainMenu();
      }
    });
  }
}
