import { withLoadable, Loadable, INITIAL_LOADABLE_STATE } from './with-loadable';
import { createTestReducer } from '../test/helpers/create-test-reducer';

interface Todo {
  todoId: string;
  note: string;
}

interface TodoState extends Loadable {
  todos: Todo[];
}

const INITIAL_TODO_STATE: TodoState = {
  todos: [],
  ...INITIAL_LOADABLE_STATE,
};

const baseReducer = createTestReducer<TodoState>(INITIAL_TODO_STATE);

const todoReducer = withLoadable({
  isLoadingAction: 'SAVE_TODOS',
  successAction: 'SAVE_TODOS_SUCCESS',
  errorAction: 'SAVE_TODOS_ERROR',
})(baseReducer);

describe('ENHANCER: withLoadable', () => {
  it('IS LOADING ACTION: It should set the loadable state to "{ isLoading: true, success: false, error: false }"', () => {
    const newState = todoReducer(INITIAL_TODO_STATE, { type: 'SAVE_TODOS' });

    expect(newState).toEqual({
      ...INITIAL_TODO_STATE,
      isLoading: true,
      success: false,
      error: false,
    });
  });

  it('SUCCESS ACTION: It should set the loadable state to "{ isLoading: false, success: true, error: false }"', () => {
    const newState = todoReducer(INITIAL_TODO_STATE, { type: 'SAVE_TODOS_SUCCESS' });

    expect(newState).toEqual({
      ...INITIAL_TODO_STATE,
      isLoading: false,
      success: true,
      error: false,
    });
  });

  it('ERROR ACTION: It should set the loadable state to "{ isLoading: false, success: false, error: true }"', () => {
    const newState = todoReducer(INITIAL_TODO_STATE, { type: 'SAVE_TODOS_ERROR' });

    expect(newState).toEqual({
      ...INITIAL_TODO_STATE,
      isLoading: false,
      success: false,
      error: true,
    });
  });

  it('NON LOADABLE ACTION: It should not update any of the loadable flags', () => {
    const newState = todoReducer(INITIAL_TODO_STATE, { type: 'SOME_OTHER_ACTION' });

    expect(newState).toEqual(INITIAL_TODO_STATE);
  });
});
