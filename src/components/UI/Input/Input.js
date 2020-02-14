import React from "react";
import classes from './Input.module.css';

const Input = ({label, type, value, errorMessage, onChange}, props) => {
    const inputType = type || 'text';
    const inputId = `${inputType}-${Math.random().toFixed(3) * 1000}`;
    const cls = [classes.input];

    const isInvalid = ({valid, touched, shouldValidate}) => {
        return !valid && shouldValidate && touched
    };

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={inputId}>{label}</label>
            <input type={inputType}
                   id={inputId}
                   value={value}
                   onChange={onChange}/>
            {
                isInvalid(props)
                    ? <span>{errorMessage || 'Введите верное значение'}</span>
                    : null
            }
        </div>
    )
}

export default Input;