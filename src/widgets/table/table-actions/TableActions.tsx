import TrashSvg from '../../../../public/assets/svg/trash-table.svg';
import InfoActionSvg from '../../../../public/assets/svg/info-table-action.svg';
import EditActionSvg from '../../../../public/assets/svg/edit-table-action.svg';
import UploadActionSvg from '../../../../public/assets/svg/download_icon_128877.svg';
import { useNavigate } from 'react-router-dom';

import styles from './TableActions.module.scss';

type Props = {
cellIndex: string;
isAdmin: boolean;
pathInfo?: string;
pathEdit?: string;
uploadFile?: (id: string) => void;
remove?: (id: string) => void | null;
}

const TableActions = ({ uploadFile, remove, cellIndex, isAdmin, pathEdit, pathInfo }: Props) => {
  const navigate = useNavigate();

  const handleNavigateItemInfo = () => navigate(`${pathInfo}${cellIndex}`);

  const handleNavigateItemEdit = () => !isAdmin ? navigate(`${pathEdit}${cellIndex}`) : undefined;

  const handleItemRemove = () => !isAdmin && remove ? remove(cellIndex) : undefined;

  const uplaodFile = () => uploadFile && uploadFile(cellIndex);

  return (
    <ul  className={styles.actionCellContainer}>
      {uploadFile &&
      <button onClick={uplaodFile} className={styles.actionButtonItem}>
      <UploadActionSvg width={15} height={15} color='white' /> 
      </button>
      }
      {pathInfo &&
      <button onClick={handleNavigateItemInfo} className={styles.actionButtonItem}>
      <InfoActionSvg width={15} height={15} color='white' />
      </button>
      }
      {pathEdit &&
      <button onClick={handleNavigateItemEdit} className={isAdmin ? `${styles.actionButtonItem} ${styles.actionButtonItemGray}` : styles.actionButtonItem}>
      <EditActionSvg width={15} height={15} color='white' />
      </button>
      }
      {remove &&
      <button onClick={handleItemRemove} className={isAdmin ? `${styles.actionButtonItem} ${styles.actionButtonItemGray}` : `${styles.actionButtonItem} ${styles.actionButtonItemTresh}`}>
      <TrashSvg width={15} height={15} color='white' />
      </button>
      }
    </ul>
  );
};

export { TableActions };