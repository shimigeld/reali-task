import { createAction, props } from '@ngrx/store';

export const setName = createAction('[MainComponent] Set Name', props<{name: string}>());
export const setEmail = createAction('[MainComponent] Set Phone', props<{email: string}>());
export const setPhone = createAction('[MainComponent] Set Email', props<{phone: string}>());

export const resetForm = createAction('[MainComponent] Reset Form');
