import clsx from 'clsx';
import React from 'react';
import styles from './checkbox.module.scss';

interface checkBox {
  isChecked: boolean;
  label: string;
  checkHandler: () => void;
}

function CheckBox({ isChecked, label, checkHandler }: checkBox) {
  return (
    <div className={clsx(styles.checkbox)}>
      <input
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor="checkbox">{label}</label>
    </div>
  );
}

export default CheckBox;
