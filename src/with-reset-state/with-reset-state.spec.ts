import { withResetState } from './with-reset-state';
import { createTestReducer } from '../test/helpers/create-test-reducer';

const INITIAL_TEST_REDUCER_STATE = {
  a: '',
  b: '',
  c: 0,
};

const baseTestReducer = createTestReducer(INITIAL_TEST_REDUCER_STATE);
const testReducer = withResetState('RESET_TEST_STATE', INITIAL_TEST_REDUCER_STATE)(baseTestReducer);

describe('ENHANCER: withResetState', () => {
  it('RESET ACTION: It should reset the reducer back to the given initial state', () => {
    const state = { a: 'foo', b: 'bar', c: 100 };
    const newState = testReducer(state, { type: 'RESET_TEST_STATE' });

    expect(newState).toEqual(INITIAL_TEST_REDUCER_STATE);
  });

  it('OTHER ACTIONS: It should not reset the reducer back to the given initial state', () => {
    const state = { a: 'foo', b: 'bar', c: 100 };
    const newState = testReducer(state, { type: 'DO_NOT_RESET_TEST_STATE' });

    expect(newState).toEqual(state);
  });
});
