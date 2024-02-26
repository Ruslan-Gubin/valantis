import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./App.module.scss";

const App = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <Link to={"./shop"} style={{ paddingRight: 50 }}>
        Shop
      </Link>
      <Link to={"./about"}>About</Link>

      <h1>Webpack Template 111</h1>

      <label>Url: {BACKEND_URL}</label>
      <h2 data-testid={"TEST_ID_APP_H2"}>Count: {count}</h2>
      <button
        className={styles.button}
        onClick={() => setCount((prev) => prev + 1)}
      >
        Up
      </button>
      <button
        className={styles.button}
        onClick={() => setCount((prev) => prev - 1)}
      >
        Down
      </button>
      <Outlet />
    </div>
  );
};

export { App };
