# Enhance Reducer

[![CircleCI](https://circleci.com/gh/ShaunLloyd/enhance-reducer/tree/master.svg?style=svg)](https://circleci.com/gh/ShaunLloyd/enhance-reducer/tree/master) [![npm version](https://badge.fury.io/js/enhance-reducer.svg)](https://badge.fury.io/js/enhance-reducer)

a group of utility functions for composing additional functionality into a reducer. Available for JavaScript and TypeScript.

## Getting Started

```bash
# Using npm
npm install --save enhance-reducer

#Using Yarn
yarn add enhance-reducer
```

All functions are available on the top level import.

```js
import { pipe, withLoadable, withResetState /* ... */ } from 'enhance-reducer';
```

## `enhance-reducer` can be used to...

- Handle loading flags for async code
- Handle setting, add to, updating, deleting collections
- Resetting a reducer state back to it's initial state
- Nest reducers

## API Docs

[Read them here](https://github.com/ShaunLloyd/enhance-reducer/tree/master/docs/API.md)

## Contributing

```bash
# Fork and clone this repo
git clone https://github.com/<GH_USERNAME>/enhance-reducer.git

# cd into folder
cd enhance-reducer

# Install dependencies
yarn install # or npm install
```
