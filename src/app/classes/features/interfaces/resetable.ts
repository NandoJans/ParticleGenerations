import {ResetKey} from "../../enums/reset-key";

export interface Resetable {
  name: string;
  displayName: string;
  softResetId: ResetKey;
  softReset(): void;
  resetId: ResetKey;
  reset(): void;
}
