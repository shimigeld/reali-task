import { createReducer, on, Action } from '@ngrx/store';
import { setName, setEmail, setPhone, resetForm } from '../actions/form.actions';

export interface FormState {
    name: string;
    email: string;
    phone: string;
  }

export const initialState: FormState = {
    name: null,
    email: null,
    phone: null,

}

const formReducer = createReducer(
    initialState,
    on(setName, (state, { name }) => ({ ...state, name})),
    on(setEmail, (state, { email }) => ({ ...state, email})),
    on(setPhone, (state, { phone }) => ({ ...state, phone})),
    on(resetForm, (state, ) => ({ ...state, initialState}))
);

export function FormReducer(state: FormState | undefined, action: Action) {
    return formReducer(state, action);
}
