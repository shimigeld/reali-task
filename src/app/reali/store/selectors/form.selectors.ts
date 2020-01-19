import { createSelector } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { FormState } from '../reducer/form.reducer';

export const selectForm = (state: State) => state.formState;
