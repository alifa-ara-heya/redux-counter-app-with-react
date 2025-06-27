# Redux Counter App (with Vite + React + TypeScript)

A simple counter application built using **React**, **Redux Toolkit**, **TypeScript**, and **Vite**.

---

## 🛠️ Project Setup

### 1. Create a Vite + React App

```bash
npm create vite@latest redux-counter-app -- --template react-ts
```

Replace `redux-counter-app` with your desired project name. When prompted which language to use, you can select typescript.

### 2. Navigate to the Project Directory

```bash
cd redux-counter-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 🧠 Setting Up Redux

### Install Redux Toolkit and React-Redux

Add the Redux Toolkit and React-Redux packages to your project:

```bash
npm install @reduxjs/toolkit react-redux
```

### 5. Create the Redux Store

Create a file named `src/app/store.ts`. Import the `configureStore` API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

```ts
// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}, // We'll add reducers here later
});
```

This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.

### 6. Connect Redux Store to React

Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application.
Wrap your application with the Redux `<Provider>` in `main.tsx` and pass the store as a prop:

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

✅ You can confirm Redux is connected by checking for `@@INIT` in the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

---

## 🧩 Create a Redux State Slice

### 7. Setup `counterSlice.ts`

Organize your folder as follows:
`src/redux/features/counter/counterSlice.ts`. In that file, import the `createSlice` API from Redux Toolkit.
Creating a slice requires:

- a string name to identify the slice,
- an initial state value,
- and one or more reducer functions to define how the state can be updated.

```ts
// src/redux/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export default counterSlice.reducer;
```

---

## 🔗8. Add the Reducer to the Store

Update `store.ts` to include the counterSlice.ts:

```ts
// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

✅In Redux DevTools, your state should now look like:

```json
{
  "counter": {
    "count": 0
  }
}
```

## 9. Adding our business logic in reducers. This is our action.

```ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
```

> Why counterSlice.reducer and not counterSlice.reducers?

Because:

`reducers` (plural) is just your input — an object containing individual reducer functions.

`reducer` (singular) is the output — a single function Redux uses to manage that slice of state.

## 10. Add types in store.ts

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## 11. Create Typed Redux Hooks

Create `src/redux/hook.ts`:

```ts
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
```

These typed hooks will provide full TypeScript support when using Redux in components.

## 12. Use Redux State and Actions in React Components

```ts
// src/App.tsx
// import { useDispatch } from "react-redux";
import { decrement, increment } from "./redux/features/counter/counterSlice";
// import type { RootState } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  // const counter = useSelector((state) => state.counter);
  // console.log(counter);

  // const { count } = useSelector((state: RootState) => state.counter);
  const { count } = useAppSelector((state) => state.counter);
  // console.log(count);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment()); //make sure to call the increment function
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <>
      <h1>Counter With Redux</h1>
      <button aria-label="Increment value" onClick={handleIncrement}>
        Increment
      </button>
      <div>{count}</div>
      <button aria-label="Decrement value" onClick={handleDecrement}>
        Decrement
      </button>
    </>
  );
}

export default App;
```

## 13. Make Actions Dynamic with Payloads

Update counterSlice.ts to accept payloads for increment/decrement, so that we can increment/decrement not just 1, but any number we want:

let's update our counterSlice.ts

```ts
// src/redux/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

Now your actions are flexible and can take dynamic values like 1, 5, or any number.

let's update our `App.tsx` again for final touch.

```ts
import { decrement, increment } from "./redux/features/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const { count } = useAppSelector((state) => state.counter);

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
```
