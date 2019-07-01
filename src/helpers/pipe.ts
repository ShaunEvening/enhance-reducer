import { ReducerEnhancer, Reducer, ReducerAction } from '../types';

/**
 * Create a pipe of reducer enhancers for your base reducer
 * @param enhancers a collection of higher-order reducers
 *
 * @returns A new reducer enhancer which is the result of piping the
 * given enhancers together
 */
export const pipe = <State, Action extends ReducerAction = ReducerAction>(
  ...enhancers: ReducerEnhancer<State, Action>[]
): ReducerEnhancer<State, Action> => (
  baseReducer: Reducer<State, Action>,
): Reducer<State, Action> =>
  enhancers.reduce((reducer, enhancer) => enhancer(reducer), baseReducer);
