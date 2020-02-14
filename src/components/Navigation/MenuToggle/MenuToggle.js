import React from "react";
import classes from './MenuToggle.module.css';

const MenuToggle = ({isOpen, onToggle}) => {
    const cls = [classes.menuToggle, 'fa'];
    (!isOpen) ? cls.push('fa-bars') : cls.push('fa-times', classes.open);

    return (
        <i className={cls.join(' ')} onClick={onToggle}/>
    )
};

export default MenuToggle;