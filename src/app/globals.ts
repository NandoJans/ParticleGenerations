import {Num} from "./num";
import {Action} from "./action";

export interface Generator {name: string, displayName: string, baseCost: Num, cost: Num, increase: Num, scaling: Num, bought: Num, currency: string, generates: string, baseMultiplier: Num, multiplier: Num, amount: Num, type: string, resetId: string, unlocked: boolean, requirement: any[], auto?: boolean, style: string}
export interface Upgrade {name: string, displayName: string, description: string, baseCost: Num, cost: Num, increase: Num, scaling: Num, bought: Num, currency: string, baseBuffer: Num, buffer: Num, amount: Num, type: string, resetId: string, style: string, unlocked: boolean, oneTime: boolean, resets: string, requirement: any[], action?: Action, auto?: boolean}
export interface Automator {name: string, displayName: string, cost: Num, currency: string, unlocked: boolean, active: boolean, requirement: any[], bought: Num, type: string, resetId: string, style: string, target: string, targetType: string, waitFor?: Num, layer?: string}
export interface Milestone {name: string, displayName: string, description: string, style: string, type: string, unlocked: boolean, requirement: any[], cost: Num, currency: string, buffer: Num, action: Action}
export interface Challenge {name: string, displayName: string, description: string, goal: Num, currency: string, prestige: string, rewardDescription: string, style: string, type: string, resetId: string, unlocked: boolean, disabled: boolean, requirement: any[], reward: Action, nerfs: Action[], completed: boolean}
export interface Navigation {name: string, displayName: string, location: string, unlocked: boolean, requirement: [string, Num] | string, wasOn: string}
export interface SubNavigation {name: string, displayName: string, location: string, parent: string, unlocked: boolean, requirement: [string, Num] | string}
export interface TimelineEvent {name: string, displayName: string, description: string, hasProgress: boolean, unlocked: boolean, requirement: any[], type: string, reached: boolean, unlock: any[]}
