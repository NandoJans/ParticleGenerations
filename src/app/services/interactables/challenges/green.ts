import {Challenge} from "../../../globals";
import {Num} from "../../../num";
import {Action} from "../../../action";


export const darkAge:Challenge[] = [{
  name: 'dark-age', displayName: 'Dark Age', description: 'while every generator is raised to the power of 0.45.', goal: new Num(1, 110), currency: 'yellowParticles', completed: false, disabled: false,
  rewardDescription: 'Increase the amount of dark energy produced by compressing.', style: 'dark-age', resetId: 'dark-age', type: 'dark-age', prestige: 'green', unlocked: false, instantComplete: false,
  requirement: ['greenParticles', new Num(1, 10)],
  reward: new Action('', ''),
  nerfs: []},
]
