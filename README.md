# Simply State

Simply State is a simple state management library for JavaScript applications, providing a straightforward solution for state management with an intuitive API.

# Installation

You can install Simply State via npm:

```sh
npm install simply-state
```

# Usage

Here's a basic example of how to use Simply State:

## 1. Creating a Store

First, import the necessary functions and types from the simply-state package:

```jsx
import { Action, Store } from 'simply-state';

const initialState = {
  count: 0,
};

const store = new Store(initialState);
```

## 2. Dispatching Actions

Actions in Simply State are functions that receive a draft state and mutate it. Here's an example of an action that increments the `count` property:

```jsx
const increment: Action<typeof initialState> = state => {
  state.count += 1;
};

store.dispatch(increment);
```

## 3. Subscribing to the Store

You can subscribe to changes in the store using the `subscribe` method. This method receives a function that is called whenever the state changes:

```js
store.subscribe(() => {
  console.log(store.getState()); // Logs the current state whenever it changes
});
```

# Middleware

Middleware lets you wrap the dispatch method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

## Applying middleware

Middleware is a powerful feature in simply-state that allows you to wrap the dispatch method for various purposes. One of the key attributes of middleware is its composability. You can combine multiple middleware functions together, and each middleware doesn't need to know what comes before or after it in the chain.

Here is an example of a custom middleware:

```js
const myMiddleware = store => next => action => {
  console.log('previous state', store.getState());
  next(action);
  console.log('new state', store.getState());
};

store.applyMiddleware(myMiddleware);
```

# Thunk Middleware

The thunk middleware extends simply-state with the ability to dispatch functions (thunks) in addition to regular actions. This can be very useful when you need to perform asynchronous operations, like making an HTTP request, or when you need to dispatch actions conditionally.

## Using Thunk Middleware

```js
import { Store, createThunkMiddleware, ThunkAction } from 'simply-state';

interface State {
  count: number;
}

const initialState: State = { count: 0 };

const store = new Store(initialState);

// Applying thunk middleware
store.applyMiddleware(createThunkMiddleware<State>());
```

## Creating a Thunk

A thunk is a function that returns another function which accepts the dispatch and getState parameters. Here's an example:

```ts
const thunkAction: ThunkAction<State> = (dispatch, getState) => {
  // Access current state
  const state = getState();

  // Conditionally dispatch actions
  if (state.count < 10) {
    // Dispatch another action
    dispatch(state => {
      state.count += 1;
    });
  }
};

// Dispatch the thunk
store.dispatch(thunkAction);
```

## Using Thunk with Extra Argument

In some cases, you might want to provide an additional argument to your thunks. This can be done using the extra argument parameter when creating the thunk middleware:

```ts
interface ApiService {
  /* ... */
}

const apiService: ApiService = {
  /* ... */
};

// Applying thunk middleware with extra argument
store.applyMiddleware(createThunkMiddleware<State, ApiService>(apiService));
```

Now, every thunk will receive apiService as the third argument:

```ts
const thunkAction: ThunkAction<State, ApiService> = (
  dispatch,
  getState,
  api
) => {
  // Now you can use api in your thunk
};
```

The extra argument can be anything, from an API service instance to a shared configuration object, or anything else that your thunks might need.
