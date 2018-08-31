export interface ReducerAction {
  type: string;
  payload?: any;
  meta?: any;
  error?: true;
}

export interface Reducer<S, A extends ReducerAction = ReducerAction> {
  (state: S, ReducerAction: A): S;
}

export interface ReducerEnhancer<S, A extends ReducerAction> {
  (reducer: Reducer<S, A>): Reducer<S, A>;
}
