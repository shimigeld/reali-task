import { State } from 'src/app/reducers';
import { createSelector } from '@ngrx/store';
import { FormState } from '../reducer/form.reducer';

export const selectForm = (state: State) => state.formState;

export const selectIsFormValid = createSelector(
    selectForm,
    (state: FormState) => {
        if (state.name !== '' && state.email !== '' && state.phone !== '') {
            return true;
        } else {
            return false;
        }
    }
  );