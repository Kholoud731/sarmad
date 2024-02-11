export interface Form {
  submit: (firstName: string, nat: string, midName: string, lastName:string) => void;
  isDisabled: boolean;
}

// eslint-disable-next-line no-shadow
export enum ACTIONS {
  CHANGE_FIRST_NAME_ACTION = 'CHANGE_FIRST_NAME_ACTION',
  CHANGE_MID_NAME_ACTION = 'CHANGE_MID_NAME_ACTION',
  CHANGE_LAST_NAME_ACTION = 'CHANGE_LAST_NAME_ACTION',
  CHANGE_NATIONALITY_ACTION = 'CHANGE_NATIONALITY_ACTION',
  RESET_FORM_ACTION = 'RESET_FORM_ACTION',
  THROW_ERROR_ACTION = 'THROW_ERROR_ACTION'
}

type ChangeFirstNameAction = {
  type: ACTIONS.CHANGE_FIRST_NAME_ACTION;
  payload: React.FormEvent<HTMLInputElement>;
};

type ChangeMidNameAction = {
    type: ACTIONS.CHANGE_MID_NAME_ACTION;
    payload: React.FormEvent<HTMLInputElement>;
  };

type ChangeLastNameAction = {
    type: ACTIONS.CHANGE_LAST_NAME_ACTION;
    payload: React.FormEvent<HTMLInputElement>;
  };

type ChangeNationalityAction = {
  type: ACTIONS.CHANGE_NATIONALITY_ACTION;
  payload: React.FormEvent<HTMLSelectElement>;
};

type ReserFormAction = {
    type: ACTIONS.RESET_FORM_ACTION;
  };

type ThrowErrorAction = {
    type: ACTIONS.THROW_ERROR_ACTION;
  };

export type FormActions = ChangeFirstNameAction |
ChangeMidNameAction | ChangeLastNameAction |
ChangeNationalityAction | ReserFormAction | ThrowErrorAction;

export interface FormState {
  firstName: string;
  midName: string;
  lastName: string;
  nationality: string;
  error: string
}
