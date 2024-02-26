import { LoaderCircle } from "@/shared/svg/loader-circle/LoaderCircle";

import styles from "./Loader.module.scss";

const Loader = () => {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
      <LoaderCircle/>
      </div>

    </div>
  );
};

export { Loader };