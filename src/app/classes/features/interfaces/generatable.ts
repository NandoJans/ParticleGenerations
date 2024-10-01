import {Num} from "../../../num";

export interface Generatable {
  generate(amount: Num): any;
}
