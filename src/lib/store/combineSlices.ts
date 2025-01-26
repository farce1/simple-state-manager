import { Slice, Action } from '../types';

/**
 * Combines multiple slices into a single reducer
 * @param slices Array of slices to combine
 * @returns Combined reducer function and initial state
 */
export function combineSlices<T extends Record<string, any>>(...slices: Slice<any>[]) {
  // Create initial state by combining all slice initial states
  const initialState = slices.reduce(
    (acc, slice) => ({
      ...acc,
      [slice.name]: slice.initialState,
    }),
    {}
  ) as T;

  // Create combined reducer
  return {
    reducer: (state: T = initialState, action: Action): T => {
      return slices.reduce(
        (newState, slice) => ({
          ...newState,
          [slice.name]: slice.reducer(state[slice.name], action),
        }),
        {} as T
      );
    },
    initialState,
  };
}
