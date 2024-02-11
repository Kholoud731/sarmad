import { ACTIONS, FormActions, FormState } from './types';

export const initialState: FormState = {
  firstName: '',
  midName: '',
  lastName: '',
  nationality: '',
  error: '',
};

export function formReducer(state: FormState, action: FormActions) {
  switch (action.type) {
    case ACTIONS.CHANGE_FIRST_NAME_ACTION:
      return {
        ...state,
        firstName: (action.payload.target as HTMLInputElement)?.value,
        error: '',
      };
    case ACTIONS.CHANGE_MID_NAME_ACTION:
      return {
        ...state,
        midName: (action.payload.target as HTMLInputElement)?.value,
        error: '',
      };
    case ACTIONS.CHANGE_LAST_NAME_ACTION:
      return {
        ...state,
        lastName: (action.payload.target as HTMLInputElement)?.value,
        error: '',
      };
    case ACTIONS.CHANGE_NATIONALITY_ACTION:
      return {
        ...state,
        nationality: (action.payload.target as HTMLSelectElement).value,
        error: '',
      };
    case ACTIONS.RESET_FORM_ACTION:
      return initialState;
    case ACTIONS.THROW_ERROR_ACTION:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
