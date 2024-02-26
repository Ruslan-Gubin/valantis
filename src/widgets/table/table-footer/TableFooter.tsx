import { Pagination } from '@/shared/ui';

import styles from './TableFooter.module.scss';

type Props = {
  totalCount?: number | null;
  limit?: number;
  changeLimit?: ({ limit }: { limit: number }) => void;
  page?: number;
  changePage?: (page: number) => void;
}

const TableFooter = ({ changePage, limit, page, totalCount }: Props) => {

  return (
    <footer className={styles.tableFooterContainer}>
    <div className={styles.paginationContainer}>

        <>
        {totalCount && limit && page && changePage && 
        <Pagination
        totalCount={totalCount}
        countPerPage={limit}
        currentPage={page}
        clickNumber={(value) => changePage(value)}
        nextPage={() => changePage( page + 1 )}
        prevPage={() => changePage( page - 1 )}
        />
        }
        </>
        
        </div>
    </footer>
  );
};

export { TableFooter };