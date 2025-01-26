import { counterActions, counterSelectors } from '@/features/counter/counterSlice';
import { useSelector, useDispatch } from '@/lib';

export function Counter() {
  const count = useSelector(counterSelectors.getCount);
  const dispatch = useDispatch();

  const { increment, decrement, reset } = counterActions;

  const handleDecrement = () => dispatch(decrement());

  const handleIncrement = () => dispatch(increment());

  const handleReset = () => dispatch(reset());

  return (
    <div className='counter'>
      <h2>Counter: {count}</h2>
      <div className='counter-buttons'>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
