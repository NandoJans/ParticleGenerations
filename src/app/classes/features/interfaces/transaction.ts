import {Num} from "../../../num";
import {Holding} from "../holding";

export interface Transaction {
  amount: Num,
  cost: Num,
  currency: Holding,
}
