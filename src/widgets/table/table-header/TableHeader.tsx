
import styles from './TableHeader.module.scss';

type Props = {
  cellGridColums: string;
  headerDescription: string[];
}

const TableHeader = ({ cellGridColums, headerDescription }: Props) => {


  return (
    <ul 
      style={{ gridTemplateColumns: cellGridColums }}
      className={styles.tableHeaderList} 
      >
          {headerDescription.map((item, index) =>
            <li className={styles.headerItem} key={`${item}${index}`} >{item}</li>
            )}
      </ul>
  );
};

export { TableHeader };