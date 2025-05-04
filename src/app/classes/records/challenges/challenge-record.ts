import {Record} from "../record";
import {Challenge} from "../../features/challenge";
import { ProximaCentauriStarChallenge } from "../../features/challenges/proxima-centauri-star-challenge";

export class ChallengeRecord extends Record {
  // Yellow phase 1
  static proximaCentauriStar: ProximaCentauriStarChallenge = new ProximaCentauriStarChallenge('proximaCentauriStar');

  static override list: Challenge[] = [
    ChallengeRecord.proximaCentauriStar
  ];

  static currentChallenges: {[key: string]: Challenge} = {};

  override getList(): Challenge[] {
    return ChallengeRecord.list;
  }
}
