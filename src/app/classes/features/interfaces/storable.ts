import {LocalStorageHelper} from "../../helpers/local-storage-helper";

export interface Storable {
  localStorageHelper: LocalStorageHelper;
  getSaveCategory(): string;
  getSaveKey(): string;
  tryLoad(): void;
  save(): void;
}
