import React from "react";
import classes from './Form.module.css';
import Input from "../Input/Input";

const Form = ({formControls, changeHandler, submitHandler, children, loginError}) => {

    const renderFormControls = (formControls, changeHandler) => {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

            return (
                <React.Fragment key={controlName + index}>
                    <Input value={control.value}
                           label={control.label}
                           valid={control.valid}
                           touched={control.touched}
                           shouldValidate={!!control.validation}
                           errorMessage={control.errorMessage}
                           onChange={event => changeHandler(event.target.value, controlName)}/>
                    {index === 0 ? <hr/> : null}
                </React.Fragment>

            );
        })
    };

    return (
        <form onSubmit={submitHandler}
              className={classes.form}>
            { renderFormControls(formControls, changeHandler) }
            { children }
            {loginError ? <span>Invalid email or password! Please, try again</span> : null}
        </form>
    )
};

export default Form;