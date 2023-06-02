import { Action, Middleware } from '../Store';

export type ThunkAction<S, E = undefined> = (
  dispatch: (action: Action<S>) => void,
  getState: () => S,
  extra?: E
) => void;

export function createThunkMiddleware<S, E = undefined>(extra?: E) {
  const middleware: Middleware<S> =
    ({ dispatch, getState }) =>
    next =>
    action => {
      if (typeof action === 'function' && action.length >= 2) {
        return (action as unknown as ThunkAction<S, E>)(
          dispatch,
          getState,
          extra
        );
      }

      next(action);
    };

  return middleware;
}
