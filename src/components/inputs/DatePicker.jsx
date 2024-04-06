import React from 'react';
import styles from './DatePicker.module.css';

const DatePicker = ({value, onChange}) => {
	return (
		<input
			type="date"
			value={value}
			onChange={onChange}
			className={styles.datePicker}
		/>
	);
};

export default DatePicker;
