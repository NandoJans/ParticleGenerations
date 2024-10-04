import {Num} from "../../../num";
import {Upgrade} from "../upgrade";
import {Transaction} from "../interfaces/transaction";

export abstract class RespecializableUpgrade extends Upgrade {
  totalSpent: Num = new Num(0, 0);

  respec(): void {
    this.currency.add(this.totalSpent);
    this.totalSpent = new Num(0, 0);
    this.reset();
  }

  override action(): Num {
    this.currency.sub(this.totalSpent);
    return new Num(0, 0);
  }

  override buy(amount: Num): Transaction {
    this.totalSpent.add(this.cost);
    const transaction = super.buy(amount);
    this.totalSpent.add(transaction.cost);
    return transaction;
  }
}
