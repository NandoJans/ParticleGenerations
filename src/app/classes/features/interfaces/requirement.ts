import {Num} from "../../../num";
import {Require} from "./require";

export interface Requirement {
  requirement: Require[];
  unlocked: boolean;
  amount: Num;
}
