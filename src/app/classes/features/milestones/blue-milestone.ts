import {Milestone} from '../milestone';
import {Num} from '../../../num';
import {Requirement} from '../interfaces/requirement';
import {HoldingRecord} from '../../records/holdings/holding-record';
import {ResetHelper} from '../../helpers/reset-helper';
import {ResetKey} from '../../enums/reset-key';
import {Holding} from '../holding';
import {Styles} from '../../enums/styles';

export class BlueMilestone extends Milestone {
  type = 'blue-milestone';
  style = Styles.BLUE;
  currency: Holding = HoldingRecord.neutrons;
  resetId: ResetKey;
  requirement: Requirement[];

  constructor(
    public name: string,
    public displayName: string,
    public goal: Num,
    private readonly description: string
  ) {
    super(name);
    this.requirement = [new Requirement(this.currency, goal, this)];
    this.resetId = ResetHelper.registerReset(ResetKey.PURPLE, this);
  }

  getDescription(): string {
    return this.description;
  }
}
