import { ReducerAction, Reducer, ReducerEnhancer } from '../types';

/**
 *
 * @param nestedReducer The reducer that you would like to compute nested state in your base reducer
 * @param stateKey The key of the nested state you would like the nestedReducer to handle
 *
 * @returns Reducer enhancer used to compute specified nested state of your base reducer
 */
export const withNestedReducer = <State, NestedState, Action extends ReducerAction = ReducerAction>(
  nestedReducer: Reducer<NestedState, Action>,
  stateKey: string,
): ReducerEnhancer<State, Action> => (
  baseReducer: Reducer<State, Action>,
): Reducer<State, Action> => (state: State, action: Action): State => {
  const newState = Object.assign({}, state, {
    [stateKey]: nestedReducer(state[stateKey], action),
  });

  return baseReducer(newState, action);
};
