import { ReducerAction, ReducerEnhancer, Reducer } from '../types';

export interface Loadable {
  isLoading: boolean;
  success: boolean;
  error: boolean;
}

export interface LoadableActionTypes {
  isLoadingAction: string;
  successAction: string;
  errorAction: string;
}

export const INITIAL_LOADABLE_STATE: Loadable = {
  error: false,
  isLoading: false,
  success: false,
};

const isLoadingReducer = <State>(state: State): State =>
  Object.assign({}, state, { error: false, isLoading: true, success: false });

const successReducer = <State>(state: State): State =>
  Object.assign({}, state, { error: false, isLoading: false, success: true });

const errorReducer = <State, Action extends ReducerAction = ReducerAction>(
  state: State,
  action: Action,
): State => Object.assign({}, state, { error: action.payload, isLoading: false, success: false });

const noopReducer = <State>(state: State): State => state;

/**
 *
 * @param loadableActionTypes A map of action types to handle the changes in loadable state
 *
 * @returns A reducer enhancer that will handle the loadable state of the base reducer
 */
export const withLoadable = <State, Action extends ReducerAction = ReducerAction>(
  loadableActionTypes: LoadableActionTypes,
): ReducerEnhancer<State, Action> => {
  const loadableActionReducerMap = {
    [loadableActionTypes.isLoadingAction]: isLoadingReducer,
    [loadableActionTypes.successAction]: successReducer,
    [loadableActionTypes.errorAction]: errorReducer,
  };

  return (baseReducer: Reducer<State, Action>): Reducer<State, Action> => (
    state: State,
    action: Action,
  ): State => {
    const reducerFunction: Reducer<State, Action> =
      loadableActionReducerMap[action.type] || noopReducer;
    const newState = reducerFunction(state, action);
    return baseReducer(newState, action);
  };
};
