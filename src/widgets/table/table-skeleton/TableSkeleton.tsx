import { Loader } from "@/shared/ui/loader/Loader";
import { TableHeader } from "../table-header/TableHeader";
import type { TableOptions } from "../table-main/TableMain";

import styles from "./TableSkeleton.module.scss";

type Props = {
  options: TableOptions;
};

const TableSkeleton = ({ options }: Props) => {
  return (
    <section className={styles.root}>
      <TableHeader
        cellGridColums={options.cellGridColums}
        headerDescription={options.headerDescription}
      />
      <div className={styles.body}>
        <Loader />
      </div>
      <footer className={styles.footer}></footer>
    </section>
  );
};

export { TableSkeleton };
