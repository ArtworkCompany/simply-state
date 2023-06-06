import { beforeEach, describe, expect, it } from 'vitest';

import { Action, Store } from '../src';

describe('Store', () => {
  const initialState = {
    count: 0,
  };

  let store: Store<typeof initialState>;

  beforeEach(() => {
    store = new Store(initialState);
  });

  it('should get the initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  it('should update the state', () => {
    const increment: Action<typeof initialState> = state => {
      state.count += 1;
    };

    store.dispatch(increment);

    expect(store.getState()).toEqual({
      count: 1,
    });
  });

  it('should subscribe to state changes', () => {
    store.dispatch(state => {
      state.count++;
    });

    store.subscribe(() => {
      expect(store.getState()).toEqual({
        count: 1,
      });
    });
  });

  it('should unsubscribe from state changes', () => {
    store.dispatch(state => {
      state.count++;
    });

    const unsubscribe = store.subscribe(() => {
      expect(store.getState()).toEqual({
        count: 1,
      });
    });

    unsubscribe();

    store.dispatch(state => {
      state.count++;
    });
  });
});
