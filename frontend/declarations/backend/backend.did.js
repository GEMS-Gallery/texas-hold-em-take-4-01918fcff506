export const idlFactory = ({ IDL }) => {
  const Card = IDL.Record({ 'value' : IDL.Text, 'suit' : IDL.Text });
  const GameState = IDL.Record({
    'playerChips' : IDL.Nat,
    'communityCards' : IDL.Vec(IDL.Opt(Card)),
    'potSize' : IDL.Nat,
    'playerHand' : IDL.Vec(IDL.Opt(Card)),
  });
  const Result = IDL.Variant({ 'ok' : GameState, 'err' : IDL.Text });
  return IDL.Service({
    'dealCards' : IDL.Func([], [Result], []),
    'getGameState' : IDL.Func([], [GameState], ['query']),
    'initGame' : IDL.Func([], [Result], []),
    'performAction' : IDL.Func([IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
