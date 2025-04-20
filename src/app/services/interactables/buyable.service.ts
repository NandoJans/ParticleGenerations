import {Injectable} from '@angular/core';
import {Buyable} from "../../classes/features/buyable";

@Injectable({
  providedIn: 'root'
})
export class BuyableService {
  buy(buyable: Buyable): void {
    if (buyable.isBuyable()) {
      buyable.buy()
    }
  }
}
