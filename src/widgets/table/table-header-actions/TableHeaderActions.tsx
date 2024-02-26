import { ChildrenNodeType } from "@/shared/types/children";

import styles from './TableHeaderActions.module.scss';


export type LinksHeaderTable = {
  text: string;
  link: string;
  color?: 'error' | 'info'| 'inherit'| 'primary'| 'secondary'| 'success'| 'warning';
}[]

export type ActionsHeaderTable = {
  text: string;
  callback: () => void;
  color?: 'error' | 'info'| 'inherit'| 'primary'| 'secondary'| 'success'| 'warning';
}[]

type Props = {
  links?: LinksHeaderTable;
  actions?: ActionsHeaderTable;
  children?: ChildrenNodeType;
}

const TableHeaderActions = ({ children, actions }: Props) => {

  return (
    <section className={styles.wrapper}>
    <div className={styles.filterContainer}>
    {children}
    </div>
    <ul className={styles.root} >
    {actions && actions.map(item =>
        <li key={`${item.text}`}>
        </li>
    )}
    </ul>
    </section>
  );
};

export { TableHeaderActions };