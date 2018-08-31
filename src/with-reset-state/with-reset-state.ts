import { ReducerAction, ReducerEnhancer, Reducer } from '../types';

/**
 * Creates a reducer enhancer that handles the case for resetting back to initial state
 * @param resetActionType The action type dispatched to reset state the given initialState
 * @param initialState The state object used to reset your reducer state
 *
 * @returns a reducer enhancer function that takes a reducer
 */
export const withResetState = <State, Action extends ReducerAction = ReducerAction>(
  resetActionType: Action['type'],
  initialState: State,
): ReducerEnhancer<State, Action> => (reducer: Reducer<State, Action>): Reducer<State, Action> => (
  state: State,
  action: Action,
): State => {
  const newState = action.type === resetActionType ? Object.assign({}, initialState) : state;

  return reducer(newState, action);
};
