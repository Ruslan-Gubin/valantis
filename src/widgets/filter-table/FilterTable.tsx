import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useSearchParams} from 'react-router-dom';
import FilterTableSvg from '../../../public/assets/svg/filter-list_119136.svg';
import { FilterSecect } from './filter-secect/FilterSecect';

import styles from './FilterTable.module.scss'; 

export type FilterOption = { label: string, field: string, type: 'text' | 'date' | 'select', selectOption?: { value: string, label: string  }[] }

type Props = {
  filterOptions: FilterOption[];
  onSubminSearch: (values: Record<string, string>) => void;
  onCancelSearch: () => void;
}

const getInitValues = (optionsArr: FilterOption[]) => {
  const result: Record<string, string> = {};
  optionsArr.forEach(item => result[item.field] = '');
  return result;
}

const getInitSelected = (optionsArr: FilterOption[]) => {
  const result: Record<string, {label: string, value: string}[]> = {};

  optionsArr.forEach(item => {
    if (item.selectOption) {
      result[item.field] = item.selectOption
    }
  });

  return result;
}


const FilterTable = ({ filterOptions, onSubminSearch, onCancelSearch }: Props) => {
  const [_, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [values, setValues] = useState<Record<string, string>>(() => getInitValues(filterOptions));
  const [selectedValues] = useState<Record<string, {label: string, value: string}[]>>(() => getInitSelected(filterOptions))


  const handleToggleFilter = () => setIsOpen(prev => !prev);

  const clickOutside = (e: MouseEvent) => {
    if (!filterRef.current) return;
    if (!filterRef.current.contains(e.target as Node)) {
      setIsOpen(() => false);
    }
  };

  const changeValue = (value: string | { value: string, label: string }, field: string) => {
    if (typeof value === 'string') {
      setValues(prev => ({ ...prev, [field]: value }));
    } else {
      setValues(prev => ({ ...prev, [field]: value.label }));
      ///
    }
  }

  useEffect(() => {
    if (!filterRef.current || !isOpen) return;
    document.addEventListener("mousedown", clickOutside);
    return () => {
    document.removeEventListener("mousedown", clickOutside);
    };
  },[isOpen])

  const handleCancelFilter = () => {
    setIsOpen(() => false);
    setIsActive(() => false);
    setValues(() => getInitValues(filterOptions));
    onCancelSearch();
    setSearchParams({});
  }

  const handleSubmitFilter: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const payload: Record<string, string> = {};

    for (let field in values) {
      const current = values[field];
      if (current && !(selectedValues.hasOwnProperty(field))) {
        payload[field] = current
      } else if (current && selectedValues.hasOwnProperty(field)) {
        //@ts-ignore
        const findValue = selectedValues[field].find(item => item.label === current);
        if (findValue) {
          payload[field] = findValue.value
        }
      }
    }

    let checkIsActiveFilter = false;

    for (let field in payload) {
      if (payload[field]) {
        checkIsActiveFilter = true;
        break;
      }
    }

    if (checkIsActiveFilter) {
      setIsActive(() => true);  
      setIsOpen(() => false);  
      onSubminSearch(payload);
      setSearchParams(payload);
    } 
  }

  return (
    <div ref={filterRef} className={styles.root}>
    <button  className={styles.button} onClick={handleToggleFilter}>
    <FilterTableSvg 
    color={isActive || isOpen ? '#5664d2' : '#727272'}
    width={25} 
    height={25} 
    />
    <span className={styles.filtersLabel}>ПОИСК</span>
    </button>

    {isOpen &&
    <form 
    onSubmit={handleSubmitFilter}
    className={styles.filterContent}
    >
    {filterOptions && filterOptions.map(item =>
    <div key={item.field}>
    {item.type === 'select' && item.selectOption ?
    <FilterSecect
    options={item.selectOption}
    onSelect={(value) => changeValue(value, item.field)}
     //@ts-ignore
    selected={{label: values[item.field], value: values[item.field]}}
    label={item.label}
    />
    :  
     <label className={styles.filterLabel}>
      {item.label}
      <input
      className={styles.filterInput}
      type={item.type}
      value={values[item.field]}
      onChange={(e) => changeValue(e.target.value, item.field)}
      />
      </label>
    }
      </div>
        )}

<div className={styles.footerButtons}>
      <button
      type='reset'
      onClick={handleCancelFilter}
      className={styles.cancelButton}
      >Отмена
      </button>
      <button
      type='submit'
      className={styles.searchButton}
      >Поиск
      </button>
 </div>

    </form>
    }
      
    </div>
  );
};

export { FilterTable };