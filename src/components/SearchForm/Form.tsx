import React, { FormEvent, useMemo, useReducer } from 'react';
import countryList from 'react-select-country-list';
import { ACTIONS } from './types';
import { formReducer, initialState } from './formReducer';

export type Form = {
  submit: (
    firstName: string,
    nat: string,
    midName: string,
    lastName: string
  ) => void;
};

const SearchForm: React.FC<Form> = ({ submit }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { firstName, midName, lastName, nationality, error } = state;

  const options = useMemo(
    () =>
      countryList()
        .getData()
        .map((country) => country.label),
    []
  );

  const submitHandeler = (e: FormEvent) => {
    e.preventDefault();
    if (firstName.trim().length < 2) {
      dispatch({
        type: ACTIONS.THROW_ERROR_ACTION,
        payload: 'First Name should be at least 2 characters',
      });
    } else {
      submit(firstName, nationality, midName, lastName);
    }
  };

  return (
    <form className="form" onSubmit={submitHandeler}>
      <div>
        <div className="form-field">
          <div className="form-field__label">First Name</div>
          <input
            className={`form-field__element ${error ? 'error' : ''}`}
            type="text"
            value={firstName}
            placeholder="Ex: Ahmed"
            onChange={(e) =>
              dispatch({ type: ACTIONS.CHANGE_FIRST_NAME_ACTION, payload: e })
            }
            required
          />
          {error && <div className="form-error">{error}</div>}
        </div>

        <div className="form-field">
          <div className="form-field__label">Middle Name</div>
          <input
            className="form-field__element"
            type="text"
            placeholder="Ex: Ahmed"
            value={midName}
            onChange={(e) =>
              dispatch({ type: ACTIONS.CHANGE_MID_NAME_ACTION, payload: e })
            }
          />
        </div>

        <div className="form-field">
          <div className="form-field__label">Last Name</div>
          <input
            className="form-field__element"
            type="text"
            placeholder="Ex: Ahmed"
            value={lastName}
            onChange={(e) =>
              dispatch({ type: ACTIONS.CHANGE_LAST_NAME_ACTION, payload: e })
            }
          />
        </div>

        <div className="form-field">
          <div className="form-field__label">Nationality</div>
          <select
            className="form-field__element"
            value={nationality}
            onChange={(e) =>
              dispatch({ type: ACTIONS.CHANGE_NATIONALITY_ACTION, payload: e })
            }
          >
            <option value="">Select</option>
            {options.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <input className="button" type="Submit" />
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

export default SearchForm;
