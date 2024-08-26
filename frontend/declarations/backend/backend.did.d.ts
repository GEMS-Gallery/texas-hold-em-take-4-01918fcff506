import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Card { 'value' : string, 'suit' : string }
export interface GameState {
  'playerChips' : bigint,
  'communityCards' : Array<[] | [Card]>,
  'potSize' : bigint,
  'playerHand' : Array<[] | [Card]>,
}
export type Result = { 'ok' : GameState } |
  { 'err' : string };
export interface _SERVICE {
  'dealCards' : ActorMethod<[], Result>,
  'getGameState' : ActorMethod<[], GameState>,
  'initGame' : ActorMethod<[], Result>,
  'performAction' : ActorMethod<[string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
