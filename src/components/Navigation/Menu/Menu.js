import React from "react";
import classes from './Menu.module.css';
import {NavLink} from 'react-router-dom'
import Backdrop from "../../UI/Backdrop/Backdrop";

const Menu = ({isOpen, onClose}) => {

    const links = [
        {label: 'Список', to: '/', exact: true},
        {label: 'Авторизация', to: '/auth', exact: false},
        {label: 'Создать тест', to: '/test-creator', exact: false},
        {label: 'Тест №1', to: '/test/1', exact: false}
    ];

    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink activeClassName={classes.active}
                             exact={link.exact}
                             to={link.to}
                             onClick={onClose}>{link.label}</NavLink>
                </li>
            )
        })
    };

    const cls = (!isOpen) ? [classes.menu, classes.close] : [classes.menu];

    return (
        <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks()}
                </ul>
            </nav>
            {isOpen ? <Backdrop onClick={onClose} /> : null}
        </React.Fragment>
    )
};

export default Menu;