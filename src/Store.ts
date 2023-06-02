import { Draft, produce } from 'immer';

export type Action<S> = (draft: Draft<S>) => void;
export type Subscription = () => void;
export type Middleware<S> = (
  store: Store<S>
) => (next: (action: Action<S>) => void) => (action: Action<S>) => void;

export class Store<S> {
  private state: S;
  private subscriptions: Subscription[] = [];
  private middlewares: Middleware<S>[] = [];

  constructor(initialState: S) {
    this.state = initialState;
  }

  getState = (): S => {
    return this.state;
  };

  dispatch = <A = Action<S>>(action: A): void => {
    const middlewareEnhancedDispatch = this.middlewares.reduce(
      (next, middleware) => middleware(this)(next),
      (action: Action<S>) => {
        this.state = produce(this.state, action);
        this.subscriptions.forEach(subscription => subscription());
      }
    );

    middlewareEnhancedDispatch(action as Action<S>);
  };

  applyMiddleware = (...middlewares: Middleware<S>[]) => {
    this.middlewares = middlewares;
  };

  subscribe(subscription: Subscription) {
    this.subscriptions.push(subscription);

    subscription();

    return () => {
      this.subscriptions = this.subscriptions.filter(s => s !== subscription);
    };
  }
}
