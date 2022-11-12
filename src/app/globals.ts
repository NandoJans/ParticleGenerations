import {Num} from "./num";
import {Action} from "./action";

export interface Generator {name: string, displayName: string, baseCost: Num, cost: Num, increase: Num, scaling: Num, bought: Num, currency: string, generates: string, baseMultiplier: Num, multiplier: Num, amount: Num, type: string, resetId: string, unlocked: boolean, requirement: any[], auto?: boolean, style: string}
export interface Upgrade {name: string, displayName: string, description: string, baseCost: Num, cost: Num, increase: Num, scaling: Num, bought: Num, currency: string, baseBuffer: Num, buffer: Num, amount: Num, type: string, resetId: string, style: string, unlocked: boolean, oneTime: boolean, resets: string, requirement: any[], action?: Action, auto?: boolean}
export interface Milestone {name: string, displayName: string, description: string, style: string, type: string, unlocked: boolean, requirement: any[], cost: Num, currency: string, buffer: Num, action: Action}
export interface Navigation {name: string, displayName: string, location: string, unlocked: boolean, requirement: [string, Num] | string}
export interface SubNavigation {name: string, displayName: string, location: string, parent: string, unlocked: boolean, requirement: [string, Num] | string}
