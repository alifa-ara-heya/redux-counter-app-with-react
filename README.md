# Redux Counter App (with Vite + React + TypeScript)

A simple counter application built using **React**, **Redux Toolkit**, **TypeScript**, and **Vite**.

---

## 🛠️ Project Setup

### 1. Create a Vite + React App

```bash
npm create vite@latest redux-counter-app -- --template react
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
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export default counterSlice.reducer;
```

---

## 🔗 Add the Reducer to the Store

Update `store.ts` to include the counter slice:

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

Now, in Redux DevTools, you should see the following under state:

```json
{
  "counter": {
    "count": 0
  }
}
```
