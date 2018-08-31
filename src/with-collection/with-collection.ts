import { ReducerAction, ReducerEnhancer, Reducer } from '../types';

export interface CollectionActionTypes {
  setCollection: string;
  addToCollection: string;
  removeFromCollection: string;
  editItemInCollection: string;
  clearCollection: string;
}

const setCollectionReducer = (stateKey: string) => <
  State,
  Action extends ReducerAction = ReducerAction
>(
  state: State,
  action: Action,
) => Object.assign({}, state, { [stateKey]: action.payload });

const addToCollectionReducer = (stateKey: string) => <
  State,
  Action extends ReducerAction = ReducerAction
>(
  state: State,
  action: Action,
) => {
  const newCollection = [...state[stateKey], action.payload];
  return Object.assign({}, state, { [stateKey]: newCollection });
};

const removeFromCollectionReducer = (stateKey: string, itemIdKey: string = 'id') => <
  State,
  Action extends ReducerAction = ReducerAction
>(
  state: State,
  action: Action,
) => {
  const newCollection = state[stateKey].filter(item => item[itemIdKey] !== action.payload);
  return Object.assign({}, state, { [stateKey]: newCollection });
};

const editItemFromCollectionReducer = (stateKey: string, itemIdKey: string = 'id') => <
  State,
  Action extends ReducerAction = ReducerAction
>(
  state: State,
  action: Action,
) => {
  const newCollection = state[stateKey].map(
    item => (item[itemIdKey] === action.payload[itemIdKey] ? action.payload : item),
  );
  return Object.assign({}, state, { [stateKey]: newCollection });
};

const clearCollectionReducer = (stateKey: string) => <State>(state: State) =>
  Object.assign({}, state, { [stateKey]: [] });

const noopReducer = <State>(state: State): State => state;

/**
 *
 * @param stateKey The key in state where the desired collection is stored
 * @param itemIdKey The unique id key of the items in the collection. Defaults to "id"
 * @param collectionActionTypes A map of action types used to handling the updates to the desired collection
 *
 * @returns Returns a reducer enhancer that will handle state changes for the desired collection in the base reducer state
 */
export const withCollection = <State, Action extends ReducerAction = ReducerAction>(
  stateKey: string,
  itemIdKey: string = 'id',
  collectionActionTypes: CollectionActionTypes,
): ReducerEnhancer<State, Action> => {
  const actionReducerMap = {
    [collectionActionTypes.setCollection]: setCollectionReducer(stateKey),
    [collectionActionTypes.addToCollection]: addToCollectionReducer(stateKey),
    [collectionActionTypes.removeFromCollection]: removeFromCollectionReducer(stateKey, itemIdKey),
    [collectionActionTypes.editItemInCollection]: editItemFromCollectionReducer(
      stateKey,
      itemIdKey,
    ),
    [collectionActionTypes.clearCollection]: clearCollectionReducer(stateKey),
  };

  return (baseReducer: Reducer<State, Action>): Reducer<State, Action> => (
    state: State,
    action: Action,
  ): State => {
    const reducerFunction = actionReducerMap[action.type] || noopReducer;
    const newState = reducerFunction(state, action);
    return baseReducer(newState, action);
  };
};
