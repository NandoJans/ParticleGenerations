import {ResetKey} from "../../enums/reset-key";

export interface Resetable {
  softResetId: ResetKey;
  softReset(): void;
  resetId: ResetKey;
  reset(): void;
}
