import { createReducer, on, Action } from '@ngrx/store';
import { setName, setEmail, setPhone, resetForm, submitForm } from '../actions/form.actions';

export interface FormState {
    name: string;
    email: string;
    phone: string;
    is_submit: boolean;
  }

export const initialState: FormState = {
    name: '',
    email: '',
    phone: '',
    is_submit: false
};

const formReducer = createReducer(
    initialState,
    on(setName, (state, { name }) => ({ ...state, name})),
    on(setEmail, (state, { email }) => ({ ...state, email})),
    on(setPhone, (state, { phone }) => ({ ...state, phone})),
    on(resetForm, (state) => ({ ...state, name: '', email: '', phone: '', is_submit: false})),
    on(submitForm, (state) => ({ ...state, is_submit: true}))
);

export function FormReducer(state: FormState | undefined, action: Action) {
    return formReducer(state, action);
}
