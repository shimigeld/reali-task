import {
  ActionReducerMap,
} from '@ngrx/store';
import { FormState, FormReducer } from '../reali/store/reducer/form.reducer';

export interface State {
  formState: FormState;
}

export const reducers: ActionReducerMap<State> = {
  formState: FormReducer
};