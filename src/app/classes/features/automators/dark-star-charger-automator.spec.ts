import {DarkStarChargerAutomator} from "./dark-star-charger-automator";
import {ChargerRecord} from "../../records/charger/charger-record";
import {ChallengeRecord} from "../../records/challenges/challenge-record";
import {ChallengeService} from "../../../services/interactables/challenge.service";
import {Num} from "../../../num";
import {HoldingRecord} from "../../records/holdings/holding-record";

describe("DarkStarChargerAutomator", () => {
  let automator: DarkStarChargerAutomator;

  beforeEach(() => {
    automator = new DarkStarChargerAutomator("test-dark-star-automator");
    automator.unlock();
    automator.active = true;
    automator.steps = [
      {
        id: 1,
        name: "Charge red",
        goalType: "time",
        goal: "5",
        delaySeconds: 0,
        startDarkGalaxy: false,
        completionAction: "collect",
        activeChargers: [ChargerRecord.redGeneratorDarkCharger.saveName],
      },
      {
        id: 2,
        name: "Wait",
        goalType: "time",
        goal: "5",
        delaySeconds: 0,
        startDarkGalaxy: false,
        completionAction: "leave",
        activeChargers: [],
      }
    ];
    ChargerRecord.darkStarChargerList.forEach(charger => {
      charger.unlocked = true;
      charger.stopCharging();
    });
    ChallengeRecord.darkGalaxy.currentDarkStarGain = Num.ZERO;
    delete ChallengeRecord.currentChallenges["green"];
  });

  afterEach(() => {
    ChargerRecord.darkStarChargerList.forEach(charger => charger.stopCharging());
    delete ChallengeRecord.currentChallenges["green"];
  });

  it("waits for the configured delay before applying a step", () => {
    automator.steps[0].delaySeconds = 2;

    automator.run(new Num(1, 0));
    expect(ChargerRecord.redGeneratorDarkCharger.charging).toBeFalse();

    automator.run(new Num(1, 0));
    expect(ChargerRecord.redGeneratorDarkCharger.charging).toBeTrue();
  });

  it("applies the exact charger selection", () => {
    ChargerRecord.redAcceleratorDarkCharger.startCharging();

    automator.run(Num.ZERO);

    expect(ChargerRecord.redGeneratorDarkCharger.charging).toBeTrue();
    expect(ChargerRecord.redAcceleratorDarkCharger.charging).toBeFalse();
  });

  it("advances after the configured time goal", () => {
    automator.steps[0].goal = "2";

    automator.run(new Num(1, 0));
    automator.run(new Num(1, 0));

    expect(automator.currentStepIndex).toBe(1);
    expect(automator.stepApplied).toBeFalse();
  });

  it("advances after reaching the configured Dark Star goal", () => {
    automator.steps[0].goalType = "darkStars";
    automator.steps[0].goal = "10";
    ChallengeRecord.darkGalaxy.currentDarkStarGain = new Num(1, 1);

    automator.run(Num.ZERO);

    expect(automator.currentStepIndex).toBe(1);
  });

  it("collects earned Dark Stars before advancing", () => {
    ChallengeRecord.currentChallenges["green"] = ChallengeRecord.darkGalaxy;
    ChallengeRecord.darkGalaxy.currentDarkStarGain = Num.ONE;
    spyOn(ChallengeService, "completeChallenge");

    automator.steps[0].goal = "1";
    automator.run(new Num(1, 0));

    expect(ChallengeService.completeChallenge).toHaveBeenCalledWith("green");
    expect(automator.currentStepIndex).toBe(1);
  });

  it("leaves Dark Galaxy when a collect step earns less than one Dark Star", () => {
    ChallengeRecord.currentChallenges["green"] = ChallengeRecord.darkGalaxy;
    ChallengeRecord.darkGalaxy.currentDarkStarGain = new Num(5, -1);
    spyOn(ChallengeService, "completeChallenge");
    spyOn(ChallengeService, "leaveChallenge");

    automator.steps[0].goal = "1";
    automator.run(new Num(1, 0));

    expect(ChallengeService.completeChallenge).not.toHaveBeenCalled();
    expect(ChallengeService.leaveChallenge).toHaveBeenCalledWith("green");
    expect(automator.currentStepIndex).toBe(1);
  });

  it("leaves Dark Galaxy without collecting before advancing", () => {
    ChallengeRecord.currentChallenges["green"] = ChallengeRecord.darkGalaxy;
    automator.steps[0].completionAction = "leave";
    spyOn(ChallengeService, "leaveChallenge");

    automator.steps[0].goal = "1";
    automator.run(new Num(1, 0));

    expect(ChallengeService.leaveChallenge).toHaveBeenCalledWith("green");
    expect(automator.currentStepIndex).toBe(1);
  });

  it("starts Dark Galaxy when requested and inactive", () => {
    automator.steps[0].startDarkGalaxy = true;
    spyOn(ChallengeService, "startChallenge");

    automator.run(Num.ZERO);

    expect(ChallengeService.startChallenge).toHaveBeenCalledWith(ChallengeRecord.darkGalaxy);
  });

  it("unlocks at 1e6 Nuclear Potential", () => {
    HoldingRecord.nuclearPotential.amount = new Num(1, 6);

    expect(automator.requirementsMet()).toBeTrue();
    expect(automator.task().equals(new Num(1, 6))).toBeTrue();
  });
});
