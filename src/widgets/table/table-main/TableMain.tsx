import { TableHeader } from "../table-header/TableHeader";
import { TableFooter } from "../table-footer/TableFooter";
import { TableSkeleton } from "../table-skeleton/TableSkeleton";

import styles from "./TableMain.module.scss";


export type TableOptions = {
  headerDescription: string[];
  cellGridColums: string;
  minWidth: number;
  pathInfo?: string;
  pathEdit?: string;
  underline?: { red: string; green: string };
  noStretch?: boolean;
  progressField?: number;
};

type Props = {
  itemsList: (string | null | undefined)[][];
  options: TableOptions;
  image: boolean;
  totalCount?: number | null;
  limit?: number;
  changeLimit?: ({ limit }: { limit: number }) => void;
  page?: number;
  changePage?: (page: number) => void;
  remove?: (id: string) => void;
  uploadFile?: (id: string) => void;
  isLoaded: boolean;
  modalOptionsRemove?: {
    content: string;
    title: string;
  };
};

const TableMain = ({
  isLoaded,
  changePage,
  itemsList,
  options,
  totalCount,
  limit,
  changeLimit,
  page,
}: Props) => {
  if (isLoaded) {
    return <TableSkeleton options={options} />;
  }

  const getColorField = (value: string | null | undefined) => {
    if (!value) {
      return styles.tableBodyItemCellTextEmpty;
    }

    if (value === options.underline?.green) {
      return styles.tableBodyItemCellTextGreen;
    }
    if (value === options.underline?.red) {
      return styles.tableBodyItemCellTextRed;
    }
    return "";
  };

  const checkProgress = (cellIndex: number) => {
    if (!options.progressField || cellIndex !== options.progressField)
      return false;
    return true;
  };

  return (
    <>
    {itemsList.length > 0 &&  !isLoaded && (
      <div className={styles.tableWrapper}>
        <section style={{ minWidth: options.minWidth }} className={styles.root}>
          <TableHeader
            cellGridColums={options.cellGridColums}
            headerDescription={options.headerDescription}
          />
          <ul
            className={styles.tableBodyList}
            style={options.noStretch ? { minHeight: "auto" } : {}}
          >
            {itemsList.map((cell, cellIndex) => (
              <ul
                key={cellIndex}
                className={styles.tableBodyItem}
                style={{ gridTemplateColumns: options.cellGridColums }}
              >
                {cell.map((item, ItemIndex) => (
                  <ul key={ItemIndex} className={styles.cellItem}>
                    {!checkProgress(ItemIndex) && (
                      <li className={styles.tableBodyItemCell} key={ItemIndex}>
                        <span
                          className={`${
                            styles.tableBodyItemCellText
                          } ${getColorField(item)}`}
                        >
                          {item ?? "---"}
                        </span>
                      </li>
                    )}

                    {checkProgress(ItemIndex) && (
                      <div className={styles.progress}>
                        <span className={styles.progressCount}>{item}%</span>
                        <div
                          className={styles.progressBar}
                          style={{ width: `${item}%` }}
                        ></div>
                      </div>
                    )}
                  </ul>
                ))}
              </ul>
            ))}
          </ul>

          <TableFooter
            changeLimit={changeLimit}
            changePage={changePage}
            limit={limit}
            page={page}
            totalCount={totalCount}
          />
        </section>
      </div>
           )}
    </>
  );
};

export { TableMain };
