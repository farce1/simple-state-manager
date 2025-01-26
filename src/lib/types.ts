export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action) => Action;

export type Middleware<T> = (store: {
  dispatch: Dispatch;
  getState: () => T;
}) => (next: Dispatch) => Dispatch;

export type Reducer<T> = (state: T, action: Action) => T;

export interface Slice<T> {
  name: string;
  reducer: Reducer<T>;
  initialState: T;
}

export interface Store<T> {
  getState: () => T;
  dispatch: Dispatch;
  subscribe: (listener: () => void) => () => void;
}
