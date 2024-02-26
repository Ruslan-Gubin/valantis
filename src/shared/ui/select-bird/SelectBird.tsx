import styles from "./SelectBird.module.scss";

type Props = {
  active: boolean;
};

const SelectBird = ({ active }: Props) => {
  return (
    <button
      className={
        active
          ? `${styles.dropdown_selected__toggle} ${styles.dropdown_selected__active}`
          : styles.dropdown_selected__toggle
      }
    ></button>
  );
};

export { SelectBird };
