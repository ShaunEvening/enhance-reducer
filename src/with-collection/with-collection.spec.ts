import { withCollection } from './with-collection';
import { createTestReducer } from '../test/helpers/create-test-reducer';

interface Todo {
  todoId: string;
  note: string;
}

interface TodoState {
  todos: Todo[];
}

const INITIAL_TODO_STATE: TodoState = {
  todos: [],
};

const baseReducer = createTestReducer<TodoState>(INITIAL_TODO_STATE);

const todoReducer = withCollection('todos', 'todoId', {
  setCollection: 'SET_TODOS',
  addToCollection: 'ADD_TODO',
  removeFromCollection: 'REMOVE_TODO',
  editItemInCollection: 'EDIT_TODO',
  clearCollection: 'CLEAR_TODOS',
})(baseReducer);

describe('ENHANCER: withCollection', () => {
  it('SET COLLECTION: It should set the collection it is responsible for', () => {
    const todos: Todo[] = [
      { todoId: '1234', note: 'this is a todo' },
      { todoId: '1235', note: 'this is another todo' },
      { todoId: '1236', note: 'this is a third todo' },
    ];

    const newState = todoReducer(INITIAL_TODO_STATE, { type: 'SET_TODOS', payload: todos });

    expect(newState.todos).toEqual(todos);
  });

  it('ADD TO COLLECTION: It should append a new item to the collection it is responsible for', () => {
    const state: TodoState = {
      todos: [
        { todoId: '1234', note: 'this is a todo' },
        { todoId: '1235', note: 'this is another todo' },
        { todoId: '1236', note: 'this is a third todo' },
      ],
    };

    const newTodo: Todo = { todoId: '1237', note: 'this is a new todo' };

    const newState = todoReducer(state, { type: 'ADD_TODO', payload: newTodo });

    expect(newState.todos).toEqual([...state.todos, newTodo]);
  });

  it('REMOVE FROM COLLECTION: It should remove an item to the collection it is responsible for given the unique id', () => {
    const todosAfterRemoval: Todo[] = [
      { todoId: '1234', note: 'this is a todo' },
      { todoId: '1235', note: 'this is another todo' },
    ];
    const todoToRemove: Todo = { todoId: '1236', note: 'this is a third todo' };

    const state: TodoState = {
      todos: [...todosAfterRemoval, todoToRemove],
    };

    const newState = todoReducer(state, { type: 'REMOVE_TODO', payload: todoToRemove.todoId });

    expect(newState.todos).toEqual(todosAfterRemoval);
  });

  it('EDIT ITEM IN COLLECTION: It should edit an item to the collection it is responsible for given the new new object with the unique id', () => {
    const unchangedTodos: Todo[] = [
      { todoId: '1234', note: 'this is a todo' },
      { todoId: '1235', note: 'this is another todo' },
    ];
    const todoBeforeEdit: Todo = { todoId: '1236', note: 'this is a third todo' };
    const todoAfterEdit: Todo = { todoId: '1236', note: 'this the updated' };

    const state: TodoState = {
      todos: [...unchangedTodos, todoBeforeEdit],
    };

    const newState = todoReducer(state, { type: 'EDIT_TODO', payload: todoAfterEdit });

    expect(newState.todos).toEqual([...unchangedTodos, todoAfterEdit]);
  });

  it('CLEAR COLLECTION: It should clear the collection it is responsible for', () => {
    const state: TodoState = {
      todos: [
        { todoId: '1234', note: 'this is a todo' },
        { todoId: '1235', note: 'this is another todo' },
        { todoId: '1236', note: 'this is a third todo' },
      ],
    };

    const newState = todoReducer(state, { type: 'CLEAR_TODOS' });

    expect(newState.todos).toEqual([]);
  });
});
