import {Automator} from "../automator";

export abstract class OrderedExecutionAutomator extends Automator {
  executionOrder: string[] = [];

  abstract getAvailableExecutionItems(): string[];

  protected setInitialExecutionOrder(items: string[]) {
    if (this.executionOrder.length === 0) {
      this.executionOrder = [...items];
    }
  }

  protected syncExecutionOrder(items: string[]) {
    const uniqueItems = Array.from(new Set(items));
    const filteredSavedOrder = this.executionOrder.filter(item => uniqueItems.includes(item));
    const missingItems = uniqueItems.filter(item => !filteredSavedOrder.includes(item));
    this.executionOrder = [...filteredSavedOrder, ...missingItems];
  }

  getExecutionOrder(items: string[] = this.getAvailableExecutionItems()): string[] {
    this.syncExecutionOrder(items);
    return [...this.executionOrder];
  }

  setExecutionOrder(items: string[], availableItems: string[] = this.getAvailableExecutionItems()) {
    this.executionOrder = [...items];
    this.syncExecutionOrder(availableItems);
    this.save();
  }

  override tryLoad(): void {
    super.tryLoad();
    const storedOrder = this.localStorageHelper.load(this.executionOrder, 'executionOrder');
    if (Array.isArray(storedOrder)) {
      this.executionOrder = storedOrder.filter(item => typeof item === 'string');
    }
  }

  override save() {
    super.save();
    this.localStorageHelper.save(this.executionOrder, 'executionOrder');
  }
}
