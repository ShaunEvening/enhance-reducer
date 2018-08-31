# API

In this documentation, a `higher-order reducer (HOR)` refers to a function that takes an action reducer and returns a new action reducer

```js
const enhancedReducer = hor(baseReducer);
```

Because all higher-order reducers all take a single reducer and return a new one, you can pipe your base reducer through multiple higher-order reducers

```js
const enhancedReducer = pipe(
  hor1,
  hor2,
  hor3,
)(baseReducer);

// Same as:
const enhancerReducer = hor3(hor2(hor1(baseReducer)));
```

All of the functions included in `enhance-reducer` prefixed with `with` are functions that configure and return a higher-order reducer:

```js
const hor = withResetState('RESET_STATE', { someState: [], someMoreState: '' });
const enhancedReducer = hor(baseReducer);

// Same as
const enhancedReducer = withResetState('RESET_STATE', { someState: [], someMoreState: '' })(
  baseReducer,
);
```

# Table of Contents

- [`pipe`](<#`pipe()`>)
- [`withCollection`](<#`withCollection()`>)
- [`withLoadable`](<#`withLoadable()`>)
- [`withNestedReducer`](<#`withNestedReducer()`>)
- [`withResetState`](<#`withResetState()`>)

## `pipe()`

Takes multiple higher-order reducers and returns a new higher-order reducer piping the given base reducer through all of the given higher-order reducers from left to right

```js
const enhancedReducer = pipe(
  hor1,
  hor2
  hor3,
  hor4
)(baseReducer);
```

## `withCollection()`

Used to handle the setting, adding to, deleting, and editing of a collection of objects in a reducer. This function accepts three arguments:

- `stateKey`: The key in the reducer state where the collection is stored
- `itemIdKey`: The key of the unique id of the items stored in the collection
- `collectionActionTypes`: A map of action types to listen for to handle collection changes
  - `setCollection`: sets a collection of given items from the action payload to the state's collection
  - `addToCollection`: Adds a given item from the action payload to the state's collection
  - `removeFromCollection`: Removes an item of the given id from the action payload from the state's collection
  - `editItemInCollection`: Replaces the an item in the state's collection with the item of matching id from the action payload
  - `clearCollection`: Sets the state's collection to an empty array

```js
const INITIAL_SHOPPING_CART_STATE = {
  cart: [],
  userId: '',
  isPremiumMember: false,
};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_ID': {
      /* snip */
    }
    case 'SET_IS_PREMIUM_MEMBER': {
      /* snip */
    }
    default: {
      return state;
    }
  }
};

const enhancedShoppingCartReducer = withCollection('cart', 'productId', {
  setCollection: 'SET_SHOPPING_CART',
  addToCollection: 'ADD_ITEM_TO_CART',
  removeFromCollection: 'REMOVE_FROM_CART',
  editItemInCollection: 'EDIT_ITEM_IN_CART',
  clearCollection: 'EMPTY_CART',
})(shoppingCartReducer);
```

## `withLoadable()`

Used to handles the loading flags of async code for the given reducer. explicitly sets the `isLoading`, `success`, `error` flags to true or false based on the fired action. This function takes one argument, a map of action types to listen for to update the reducers loadable state:

- `isLoadingAction`: Sets the loadable state to `{ isLoading: true, success: false, error: false }`
- `successAction`: Sets the loadable state to `{ isLoading: false, success: true, error: false }`
- `errorAction`: Sets the loadable state to `{ isLoading: false, success: false, error: true }`

```js
const INITIAL_SHOPPING_CART_STATE = {
  cart: [],
  userId: '',
  isPremiumMember: false,
  isLoading: false,
  success: false,
  error: false,
};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_ID': {
      /* snip */
    }
    case 'SET_IS_PREMIUM_MEMBER': {
      /* snip */
    }
    default: {
      return state;
    }
  }
};

const enhancedShoppingCartReducer = withLoadable({
  isLoadingAction: 'PURCHASE_CART',
  successAction: 'PURCHASE_CART_SUCCESS',
  errorAction: 'PURCHASE_CART_ERROR',
})(shoppingCartreducer);
```

## `withNestedReducer()`

Used to add a nested reducer to handle a chunk of your base reducers state. This function takes two arguments:

- `nestedReducer`: The reducer you would like to have handle a chunk of the base reducers state
- `stateKey`: The key of the base reducer's state that you would like the given nested reducer to handle

```js
const INITIAL_NESTED_REDUCER_STATE = {
  someStuff: '',
  anotherThing: 0,
};

const nestedReducer = (state, action) => {
  switch (action.type) {
    case 'SOME_STUFF': {
      /* snip */
    }
    case 'SOME_OTHER_THING': {
      /* snip */
    }
    default: {
      return state;
    }
  }
};

const INITIAL_PARENT_REDUCER_STATE = {
  nested: { ...INITIAL_NESTED_REDUCER_STATE },
  a: 0,
  b: '',
};

const parentReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_A': {
      /* snip */
    }
    case 'UPDATE_B': {
      /* snip */
    }
    default: {
      return state;
    }
  }
};

const combinedReducers = withNestedReducer(nestedReducer, 'nested')(parentReducer);
```

## `withResetState()`

Used to handle the resetting of a reducer's state back to the given initial state. This function takes two arguments:

- `resetActiontype`: The action type to listen for to reset state back to the given initial state
- `initialState`: The state you want to reset the reducer's state to upon recieveing the given resetActionType

```js
const INITIAL_SHOPPING_CART_STATE = {
  cart: [],
  userId: '',
  isPremiumMember: false,
  isLoading: false,
  success: false,
  error: false,
};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_ID': {
      /* snip */
    }
    case 'SET_IS_PREMIUM_MEMBER': {
      /* snip */
    }
    default: {
      return state;
    }
  }
};

const enhancedShoppingCartReducer = withResetState(
  'RESET_SHOPPING_CART_STATE',
  INITIAL_SHOPPING_CART_STATE,
)(shoppingCartReducer);
```
