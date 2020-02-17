import React from "react";
import classes from './Select.module.css';

const Select = ({label, value, onChange, options}) => {
    const selectId = `${label}-${Math.random().toFixed(3) * 1000}`;

    return (
        <div className={classes.select}>
            <label htmlFor={selectId}>{label}</label>
            <select id={selectId}
                    value={value}
                    onChange={onChange}>
                {
                    options.map( (option, index) => {
                        return (
                            <option value={option.value} key={option.value + index}>
                                {option.text}
                            </option>
                            )
                    })
                }
            </select>
        </div>
    )
}

export default Select;