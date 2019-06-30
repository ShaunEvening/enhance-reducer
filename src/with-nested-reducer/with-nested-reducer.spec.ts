import { withNestedReducer } from './with-nested-reducer';
import { createTestReducer } from '../test/helpers/create-test-reducer';

const NESTED_STATE_KEY = 'nested';
const INITIAL_NESTED_STATE = {
  c: 0,
  d: 0,
};

const nestedReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_C': {
      return {
        ...state,
        c: state.c + 1,
      };
    }
    case 'INCREMENT_D': {
      return {
        ...state,
        d: state.d + 1,
      };
    }
    default: {
      return state;
    }
  }
};

const INITIAL_TEST_REDUCER_STATE = {
  a: '',
  b: '',
  [NESTED_STATE_KEY]: { ...INITIAL_NESTED_STATE },
};

const baseTestReducer = createTestReducer(INITIAL_TEST_REDUCER_STATE);
const testReducer = withNestedReducer(nestedReducer, NESTED_STATE_KEY)(baseTestReducer);

describe('ENHANCER: withNestedReducer', () => {
  it('NESTED REDUCER ACTION: It should update the nested state when a nested reducer action is passed', () => {
    const expected = { a: '', b: '', [NESTED_STATE_KEY]: { c: 1, d: 0 } };
    const newState = testReducer(INITIAL_TEST_REDUCER_STATE, { type: 'INCREMENT_C' });

    expect(newState).toEqual(expected);
  });

  it('OTHER ACTIONS: It should not reset the reducer back to the given initial state', () => {
    const state = { a: '', b: '', [NESTED_STATE_KEY]: { c: 1, d: 0 } };
    const newState = testReducer(state, { type: 'PARENT_REDUCER_ACTION' });

    expect(newState[NESTED_STATE_KEY]).toEqual(state[NESTED_STATE_KEY]);
  });
});
