export const createControl = (config, validation) => {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
};

const validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateControl = (value, validation = null) => {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) isValid = value.trim() !== '' && isValid;

    if (validation.email) isValid = validateEmail(value) && isValid;

    if (validation.minLength) isValid = value.length >= validation.minLength && isValid;

    return isValid;
};

const validateForm = formControls => {
    let isFormValid = true;

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid;
};

export const changeInput = (formControls, value, controlName) => {
    const control = {...formControls[controlName]};

    control.value = value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = validateForm(formControls);

    return {
        formControls,
        isFormValid
    };

};