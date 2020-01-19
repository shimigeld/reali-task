import { createAction, props } from '@ngrx/store';

export const setName = createAction('[MainComponent] Set Name', props<{name: string}>());
export const setEmail = createAction('[MainComponent] Set Email', props<{email: string}>());
export const setPhone = createAction('[MainComponent] Set Phone', props<{phone: string}>());

export const submitForm = createAction('[MainComponent] Submit Form');
export const resetForm = createAction('[MainComponent] Reset Form');
