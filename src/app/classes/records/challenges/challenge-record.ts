import {Record} from "../record";
import {Challenge} from "../../features/challenge";
import { ProximaCentauriStarChallenge } from "../../features/challenges/proxima-centauri-star-challenge";
import {LalandeStarChallenge} from "../../features/challenges/lalande-star-challenge";
import {SunStarChallenge} from "../../features/challenges/sun-star-challenge";
import {SiriusStarChallenge} from "../../features/challenges/sirius-star-challenge";

export class ChallengeRecord extends Record {
  // Yellow phase 1
  static proximaCentauriStar: ProximaCentauriStarChallenge = new ProximaCentauriStarChallenge('proximaCentauriStar');
  static lalandeStar: LalandeStarChallenge = new LalandeStarChallenge('lalandeStar');
  static sunStar: SunStarChallenge = new SunStarChallenge('sunStar');
  static siriusStar: SiriusStarChallenge = new SiriusStarChallenge('siriusStar');

  static override list: Challenge[] = [
    ChallengeRecord.proximaCentauriStar,
    ChallengeRecord.lalandeStar,
    ChallengeRecord.sunStar,
    ChallengeRecord.siriusStar,
  ];

  static currentChallenges: {[key: string]: Challenge} = {};

  override getList(): Challenge[] {
    return ChallengeRecord.list;
  }
}
