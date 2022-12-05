import { Injectable } from '@angular/core';
import {TimelineEvent} from "../globals";
import {Num} from "../num";
import {HoldingsService} from "./holdings.service";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  static events: TimelineEvent[] = [
    {
      name: 'red-particles', displayName: 'A New Universe', description: 'A new type of particle has been discovered called: Red Particles.', hasProgress: false,
      unlocked: true, requirement: ['none'], type: 'red-timeline', reached: false, unlock: ['redParticles', new Num(1, 0)]
    },
    {
      name: 'red-accelerate', displayName: 'We need to accelerate', description: 'When red particle generators are too slow we need something new.', hasProgress: true,
      unlocked: true, requirement: ['redParticles', new Num(1, 0)], type: 'red-timeline', reached: false, unlock: ['redParticles', new Num(1, 20)]
    },
    {
      name: 'red-upgrades', displayName: 'Not powerfull enough', description: 'Why wouldn\'t we make our generators and upgrades more powerfull.', hasProgress: true,
      unlocked: false, requirement: ['redParticles', new Num(1, 20)], type: 'red-timeline', reached: false, unlock: ['redParticles', new Num(1, 40)]
    },
    {
      name: 'yellow-phase', displayName: 'A new generation', description: 'I am sick of red particles. I want something new.', hasProgress: true,
      unlocked: false, requirement: ['redParticles', new Num(1, 40)], type: 'red-timeline', reached: false, unlock: ['redParticles', new Num(1, 110)]
    },

    {
      name: 'yellow-particles', displayName: 'Another new universe', description: 'When red particles are not enough.', hasProgress: false,
      unlocked: true, requirement: ['none'], type: 'yellow-timeline', reached: false, unlock: ['yellowParticles', new Num(1, 0)]
    },
    {
      name: 'yellow-generators', displayName: 'Boosting the red', description: 'So yellow particles are friendly.', hasProgress: true,
      unlocked: false, requirement: ['yellowParticles', new Num(1, 0)], type: 'yellow-timeline', reached: false, unlock: ['yellowParticles', new Num(1, 2)]
    },
    {
      name: 'yellow-challenges', displayName: 'I am up for a challenge', description: 'I think we have to discover new universes.', hasProgress: true,
      unlocked: false, requirement: ['yellowParticles', new Num(1, 2)], type: 'yellow-timeline', reached: false, unlock: ['yellowParticles', new Num(1, 5)]
    },
    {
      name: 'yellow-fusion', displayName: 'Yellow stars confirmed?', description: 'A star is basically an infinite source of energy.', hasProgress: true,
      unlocked: false, requirement: ['yellowParticles', new Num(1, 5)], type: 'yellow-timeline', reached: false, unlock: ['yellowParticles', new Num(1, 32)]
    },
    {
      name: 'green-phase', displayName: 'A step into greenification', description: 'Green energy is the best.', hasProgress: true,
      unlocked: false, requirement: ['yellowParticles', new Num(1, 32)], type: 'yellow-timeline', reached: false, unlock: ['yellowParticles', new Num(1, 110)]
    },

    {
      name: 'green-phase-start', displayName: 'And there we have it', description: 'For all our needs of free boosters. Like we don\'t have enough.', hasProgress: false,
      unlocked: true, requirement: ['none'], type: 'green-timeline', reached: false, unlock: ['greenParticles', new Num(1, 0)]
    },
    {
      name: 'dark-energy', displayName: 'This is different', description: 'What if we compress green energy.', hasProgress: true,
      unlocked: false, requirement: ['greens', new Num(1, 0)], type: 'green-timeline', reached: false, unlock: ['greens', new Num(1, 1)]
    },
    {
      name: 'ascending', displayName: 'Dark ages are coming.', description: 'Ascending to an alternate dark universe.', hasProgress: true,
      unlocked: false, requirement: ['greenParticles', new Num(1, 0)], type: 'green-timeline', reached: false, unlock: ['greenParticles', new Num(1, 10)]
    },
    {
      name: 'nuclear-decay', displayName: 'Overwhelmed by green souls?', description: 'There is another use for green souls you know.', hasProgress: true,
      unlocked: false, requirement: ['greenParticles', new Num(1, 0)], type: 'green-timeline', reached: false, unlock: ['greenParticles', new Num(1, 30)]
    },
    {
      name: 'blue-phase', displayName: 'When a star dies', description: 'What is this blue substance produced when stars die.', hasProgress: true,
      unlocked: false, requirement: ['greenParticles', new Num(1, 30)], type: 'green-timeline', reached: false, unlock: ['greenParticles', new Num(1, 110)]
    },

    {
      name: 'blue-phase-start', displayName: 'Why a universe is so neutral', description: 'Blue neutrons are coming fast to boost all are needs.', hasProgress: false,
      unlocked: true, requirement: ['none'], type: 'blue-timeline', reached: false, unlock: ['blues', new Num(1, 0)]
    },
    {
      name: 'blue-phase-start', displayName: 'Why a universe is so neutral', description: 'Blue neutrons are coming fast to boost all are needs.', hasProgress: true,
      unlocked: true, requirement: ['blues', new Num(1, 0)], type: 'blue-timeline', reached: false, unlock: ['blues', new Num(5, 0)]
    },
  ]

  static save() {
    const save = {}
    this.events.forEach((event) => {
      // @ts-ignore
      save[event.name] = event.unlocked
    })
    localStorage['timeline'] = JSON.stringify(save)
  }

  static load() {
    const events = JSON.parse(localStorage['timeline'])
    this.events.forEach((event) => {
      if (events[event.name] !== undefined) {
        event.unlocked = events[event.name];
      }
    })
  }

  static getEvents(type: string) {
    let retArr: TimelineEvent[] = [];
    this.events.forEach((event) => {
      if (event.type === type) {
        retArr.push(event);
      }
    })
    return retArr;
  }

  static unlock() {
    this.events.forEach((event) => {
      if (!event.unlocked && event.requirement[0] !== 'none') {
        const doc = (<HTMLElement> document.getElementById(event.name))
        if (HoldingsService.get(event.requirement[0]).greq(event.requirement[1])) {
          event.unlocked = true;
          if (doc !== null) doc.style.display = 'unset';
        } else {
          event.unlocked = false;
          if (doc !== null) doc.style.display = 'none';
        }
      }
    })
  }

  static reach() {
    this.events.forEach((event) => {
      const doc = (<HTMLElement> document.getElementById(event.name+'-event'))
      if (HoldingsService.get(event.unlock[0]).greq(event.unlock[1])) {
        event.reached = true;
        if (doc !== null) doc.classList.add('reached');
      } else {
        event.reached = false;
        if (doc !== null) doc.classList.remove('reached');
      }
    })
  }

  static setProgress() {
    this.events.forEach((event) => {
      const doc = (<HTMLElement> document.getElementById(event.name+'-progress'))
      if (doc !== null) {
        if (event.reached) {
          doc.style.height = '100%';
          doc.innerHTML = '<p>100%</p>';
        } else if (event.unlocked && event.hasProgress) {
          const num1 = event.requirement[1].exp + event.requirement[1].num / 10;
          const num2 = event.unlock[1].exp + event.unlock[1].num / 10
          const holding = HoldingsService.get(event.unlock[0])
          const holdingNum = holding.exp + holding.num / 10 - num1
          let value = holdingNum / (num2 - num1) * 100
          if (value < 0) value = 0;
          doc.style.height = value.toString()+'%';
          doc.innerHTML = '<p>'+value.toFixed(2)+'%</p>';
        }
      }
    })
  }
}
