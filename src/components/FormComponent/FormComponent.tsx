import React, { FormEvent, useMemo, useReducer } from 'react';
import countryList from 'react-select-country-list';
import { ACTIONS, Form } from './types';
import { formReducer, initialState } from './formReducer';

const FormComponent: React.FC<Form> = ({ submit }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const options = useMemo(
    () => countryList()
      .getData()
      .map((country) => country.label),
    [],
  );

  const submitHandeler = (e: FormEvent) => {
    e.preventDefault();
    if (state.firstName.trim().length < 2){
      dispatch({type: ACTIONS.THROW_ERROR_ACTION})
    } else {
      submit(
        state.firstName,
        state.nationality,
        state.midName,
        state.lastName,
      );
    }
  }

  return (
    <form
      className="form"
      onSubmit={submitHandeler}
    >
      <div className="form-field">
        <div className="form-field__label">First Name</div>
        <input
          className="form-field__element"
          type="text"
          value={state.firstName}
          placeholder='Ex: Ahmed'
          onChange={(e) => dispatch({ type: ACTIONS.CHANGE_FIRST_NAME_ACTION, payload: e })}
          required
        />
        <div className='form-error' >{state.error}</div>
      </div>

      <div className="form-field">
        <div className="form-field__label">Middle Name</div>
        <input
          className="form-field__element"
          type="text"
          placeholder='Ex: Ahmed'
          value={state.midName}
          onChange={(e) => dispatch({ type: ACTIONS.CHANGE_MID_NAME_ACTION, payload: e })}
        />
      </div>

      <div className="form-field">
        <div className="form-field__label">Last Name</div>
        <input
          className="form-field__element"
          type="text"
          placeholder='Ex: Ahmed'
          value={state.lastName}
          onChange={(e) => dispatch({ type: ACTIONS.CHANGE_LAST_NAME_ACTION, payload: e })}
        />
      </div>

      <div className="form-field">
        <div className="form-field__label">Nationality</div>
        <select
          className="form-field__element"
          value={state.nationality}
          onChange={(e) => dispatch({ type: ACTIONS.CHANGE_NATIONALITY_ACTION, payload: e })}
        >
          <option>Select</option>
          {options.map((nationality) => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-actions">
      <input 
      className="button"
      type="Submit" 
      disabled={false} />
      <button
        className="button"
        type="button"
        onClick={() => dispatch({ type: ACTIONS.RESET_FORM_ACTION })}
      >
        Clear
      </button>
      </div>
    </form>
  );
};

export default FormComponent;
