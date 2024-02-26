import { useEffect, useRef, useState } from 'react';

import CloseSvg from '../../../../public/assets/svg/close.svg';
import { SelectBird } from '@/shared/ui/select-bird/SelectBird';

import styles from './FilterSecect.module.scss';

type SelectValue = {
  value: string; 
  label: string;
}


type Props = {
  options: SelectValue[];
  onSelect: (value: SelectValue) => void;
  selected: SelectValue | null;
  label: string;
}

const FilterSecect = ({ onSelect, options, selected, label }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: SelectValue) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChechClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.document.addEventListener("click", handleChechClickOutside);
    return () => {
      window.document.removeEventListener("click", handleChechClickOutside);
    };
  }, [isOpen]);

  const handleClickReset = (e: any) => {
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
    }
    onSelect({value: '', label: ''});
  };


  return (
    <>
    <div ref={ref}  className={styles.dropdown}>
      {label && (
        <label
          className={styles.dropdownLabel}
        >
          {label}
        </label>
      )}
      <div
        onClick={handleToggleDropdown}
        className={styles.dropdown_selected}
      >
        <div className={styles.value_container}>
          <span
            className={
              Number(selected?.label) === 0
                ? `${styles.dropdown_selected__value} ${styles.dropdown_selected__value_opasity}`
                : styles.dropdown_selected__value
            }
          >
            {selected?.label}
          </span>
        </div>
            {(!!selected?.label) ? (
              <CloseSvg onClick={handleClickReset} width={18} height={18} />
              ) : (
              <SelectBird active={isOpen} />
            )}

      </div>
      {isOpen && (
        <div
          className={styles.dropdown_menu__container}
        >
          <ul className={styles.dropdown_menu}>
            {options.map((option) => (
              <li
                className={
                  selected?.label === option.label
                    ? `${styles.dropdown_menu__li} ${styles.dropdown_menu__active}`
                    : styles.dropdown_menu__li
                }
                key={option.label}
                onClick={() => handleOptionClick(option)}
              >
                <span
                  style={selected?.label === option.label ? { color: "white" } : {}}
                  className={styles.dropdown_menu__item}
                >
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export { FilterSecect };