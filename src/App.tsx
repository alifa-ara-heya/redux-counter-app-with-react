// import { useDispatch } from "react-redux";
import { decrement, increment } from "./redux/features/counter/counterSlice";
// import type { RootState } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  // const counter = useSelector((state) => state.counter); //react redux hook
  // console.log(counter);

  // const { count } = useSelector((state: RootState) => state.counter);
  const { count } = useAppSelector((state) => state.counter);
  // console.log(count);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const handleIncrement = (amount: number) => {
    dispatch(increment(amount)); //make sure to call the increment function
  };

  const handleDecrement = (amount: number) => {
    dispatch(decrement(amount));
  };

  return (
    <>
      <h1>Counter With Redux</h1>
      <button aria-label="Increment value" onClick={() => handleIncrement(1)}>
        Increment
      </button>
      <button
        aria-label="Increment value by 5"
        onClick={() => handleIncrement(5)}
      >
        Increment value by 5
      </button>
      <div>{count}</div>
      <button aria-label="Decrement value" onClick={() => handleDecrement(1)}>
        Decrement
      </button>
    </>
  );
}

export default App;
