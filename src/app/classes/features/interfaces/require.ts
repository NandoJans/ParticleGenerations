import {Num} from "../../../num";

export interface Require {
  requirementSatisfied(amount: Num): boolean;
}
