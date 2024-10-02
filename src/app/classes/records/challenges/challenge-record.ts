import {FirstYellowChallenge} from "../../features/challenges/first-yellow-challenge";
import {SecondYellowChallenge} from "../../features/challenges/second-yellow-challenge";
import {ThirdYellowChallenge} from "../../features/challenges/third-yellow-challenge";
import {FifthYellowChallenge} from "../../features/challenges/fifth-yellow-challenge";
import {FourthYellowChallenge} from "../../features/challenges/fourth-yellow-challenge";
import {SixthYellowChallenge} from "../../features/challenges/sixth-yellow-challenge";
import {SeventhYellowChallenge} from "../../features/challenges/seventh-yellow-challenge";
import {EighthYellowChallenge} from "../../features/challenges/eighth-yellow-challenge";
import {Record} from "../record";
import {Challenge} from "../../features/challenge";

export class ChallengeRecord extends Record {
  // Yellow phase 1
  static firstYellowChallenge: FirstYellowChallenge = new FirstYellowChallenge();
  static secondYellowChallenge: SecondYellowChallenge = new SecondYellowChallenge();
  static thirdYellowChallenge: ThirdYellowChallenge = new ThirdYellowChallenge();
  static fourthYellowChallenge: FourthYellowChallenge = new FourthYellowChallenge();
  static fifthYellowChallenge: FifthYellowChallenge = new FifthYellowChallenge();
  static sixthYellowChallenge: SixthYellowChallenge = new SixthYellowChallenge();
  static seventhYellowChallenge: SeventhYellowChallenge = new SeventhYellowChallenge();
  static eighthYellowChallenge: EighthYellowChallenge = new EighthYellowChallenge();

  static override list: Challenge[] = [
    ChallengeRecord.firstYellowChallenge,
    ChallengeRecord.secondYellowChallenge,
    ChallengeRecord.thirdYellowChallenge,
    ChallengeRecord.fourthYellowChallenge,
    ChallengeRecord.fifthYellowChallenge,
    ChallengeRecord.sixthYellowChallenge,
    ChallengeRecord.seventhYellowChallenge,
    ChallengeRecord.eighthYellowChallenge
  ];

  override getList(): Challenge[] {
    return ChallengeRecord.list;
  }
}
