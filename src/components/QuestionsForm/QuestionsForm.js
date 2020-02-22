import React from "react";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import Loader from "../UI/Loader/Loader";
import Form from "../UI/Form/Form";

const QuestionsForm = props => {

    const {
        state, test, isLoading,
        submitHandler,
        changeHandler, selectChangeHandler,
        addQuestionHandler, createTestHandler
    } = props;

    const createSelectOptions = () => {
        return Object.keys(state.formControls)
            .filter(key => key.includes('option'))
            .map( (option, index) => ({text: index + 1, value: index + 1}))
    };

    return (
        <Form submitHandler={submitHandler}
              formControls={state.formControls}
              changeHandler={changeHandler}>
            {

            }
            <Select label='Choose right answer'
                    value={state.rightAnswerId}
                    onChange={selectChangeHandler}
                    options={createSelectOptions()}/>
            <Button type='primary'
                    onClick={addQuestionHandler}
                    disabled={!state.isFormValid}>Add question</Button>
            <Button type='success'
                    onClick={createTestHandler}
                    disabled={test.length === 0}>Create test</Button>
            { isLoading ? <Loader/> : null }
        </Form>
    )
};

export default QuestionsForm;