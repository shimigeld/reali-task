import { createReducer, on, Action } from '@ngrx/store';
import { setName, setEmail, setPhone, resetForm, submitForm } from '../actions/form.actions';

export interface FormState {
    name: string;
    email: string;
    phone: string;
    form_state: string;
  }

export const initialState: FormState = {
    name: '',
    email: '',
    phone: '',
    form_state: 'reset'
};

const formReducer = createReducer(
    initialState,
    on(setName, (state, { name }) => ({ ...state, name, form_state: 'onProgress'})),
    on(setEmail, (state, { email }) => ({ ...state, email, form_state: 'onProgress'})),
    on(setPhone, (state, { phone }) => ({ ...state, phone, form_state: 'onProgress'})),
    on(resetForm, (state) => ({ ...state, name: '', email: '', phone: '', form_state: 'reset'})),
    on(submitForm, (state) => ({ ...state, form_state: 'submitted'}))
);

export function FormReducer(state: FormState | undefined, action: Action) {
    return formReducer(state, action);
}
