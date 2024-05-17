import clsx from 'clsx';
import React from 'react';
import styles from './checkbox.module.scss';

export interface checkBox {
  isChecked: boolean;
  label: string;
  checkHandler: () => void;
  id: string;
}

export default function Checkbox({
  isChecked,
  label,
  checkHandler,
  id,
}: checkBox) {
  return (
    <div className={clsx(styles.checkbox)}>
      <input
        className={clsx(styles.checkboxInput)}
        type="checkbox"
        id={`${id}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`${id}`} className={clsx(styles.checkboxLabel)}>
        {label}
      </label>
    </div>
  );
}
