import { useState } from "preact/hooks";

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount((currentCount: number) => currentCount - 1);

  return (
    <>
      <div class="counter">
        <h4>Counter: {count}</h4>
        <div class="counter-buttons">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
      </div>
    </>
  );
}
