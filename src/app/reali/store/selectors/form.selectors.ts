import { createSelector } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { FormState } from '../reducer/form.reducer';

export const selectForm = (state: State) => state.formState;

export const selectFormName = createSelector(
  selectForm,
  (state: FormState) => state.name
);

export const selectFormEmail = createSelector(
  selectForm,
  (state: FormState) => state.email
);

export const selectFormPhone = createSelector(
  selectForm,
  (state: FormState) => state.phone
);

export const selectIsFormSubmitted = createSelector(
  selectForm,
  (state: FormState) => state.is_submit
);
