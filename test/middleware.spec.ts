import { beforeEach, describe, expect, it } from 'vitest';

import { Store } from '../src';
import { createThunkMiddleware, ThunkAction } from '../src/middlewares';
import { Middleware } from '../src/Store';

describe('Middleware', () => {
  const initialState = {
    count: 0,
  };

  let store: Store<typeof initialState>;

  beforeEach(() => {
    store = new Store(initialState);
  });

  it('should be called middleware on dispatch', () => {
    const middleware: Middleware<typeof initialState> =
      ({ getState }) =>
      next =>
      action => {
        expect(getState()).toEqual({ count: 0 });
        next(action);
        expect(getState()).toEqual({ count: 1 });
      };

    store.applyMiddleware(middleware);

    store.dispatch(state => {
      state.count += 1;
    });
  });

  it('should be called thunk middleware on subscribe', () => {
    const thunk: ThunkAction<typeof initialState, string> = (
      dispatch,
      getState,
      extra
    ) => {
      expect(getState()).toEqual({ count: 0 });
      dispatch(state => {
        state.count += 1;
      });
      expect(getState()).toEqual({ count: 1 });
      expect(extra).toEqual('extra argument');
    };

    const thunkMiddleware = createThunkMiddleware<typeof initialState, string>(
      'extra argument'
    );

    store.applyMiddleware(thunkMiddleware);
    store.dispatch(thunk);
  });
});
