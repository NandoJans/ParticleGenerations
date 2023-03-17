import {Num} from "./num";
import {Action} from "./action";
import {NewAction} from "./NewAction";
import {Component} from "@angular/core";

export interface Generator {name: string, displayName: string, baseCost: Num, cost: Num, increase: Num, scaling: Num, bought: Num, currency: string, generates: string, baseMulMod: Num, baseMultiplier: Num, multiplier: Num, amount: Num, type: string, resetId: string, unlocked: boolean, requirement: any[], auto?: boolean, style: string, noMax?: boolean, scalingStart?: Num, nav?: string, subNav?: string, globalMultiplier?: string}
export interface Upgrade {name: string, displayName: string, description: string, baseCost: Num, cost: Num, increase: Num, scaling: Num, scalingStart?: Num, bought: Num, currency: string, baseBuffer: Num, buffer: Num, amount: Num, type: string, resetId: string, style: string, unlocked: boolean, oneTime: boolean, resets: string, requirement: any[], action?: Action | Action[] | NewAction | NewAction[], auto?: boolean, limit?: Num, noMax?: boolean, nav?: string, subNav?: string, effect?: Num}
export interface Automator {name: string, displayName: string, cost: Num, currency: string, unlocked: boolean, active: boolean, requirement: any[], bought: Num, type: string, resetId: string, style: string, target: string | string[], targetType: string, waitFor?: Num, layer?: string, nav?: string, subNav?: string}
export interface Combiner {name: string, displayName: string, element: string, cost: Num, currency: string, unlocked: boolean, active: boolean, style: string, type: string, resetId: string, buffer?: Num, requirement: any[], bought: Num, nav?: string, subNav?: string}
export interface Milestone {name: string, displayName: string, description: string, style: string, type: string, unlocked: boolean, requirement: any[], cost: Num, currency: string, buffer: Num, action: Action | NewAction}
export interface Challenge {name: string, displayName: string, description: string, goal: Num, currency: string, prestige: string, rewardDescription: string, style: string, type: string, resetId: string, unlocked: boolean, instantComplete: boolean, disabled: boolean, requirement: any[], reward: Action | NewAction, nerfs: Action[], completed: boolean}
export interface Navigation {name: string, displayName: string, location: string, unlocked: boolean, requirement: [string, Num] | string, wasOn: string}
export interface SubNavigation {name: string, displayName: string, location: string, parent: string, unlocked: boolean, requirement: [string, Num] | string}
export interface TimelineEvent {name: string, displayName: string, description: string, hasProgress: boolean, unlocked: boolean, requirement: any[], type: string, reached: boolean, unlock: any[]}
