import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, last } from 'rxjs/operators';

import { State } from 'src/app/reducers';
import { setName, setEmail, setPhone, resetForm, submitForm } from '../../store/actions/form.actions';
import { selectForm, selectIsFormValid } from '../../store/selectors/form.selectors';
import { FormState } from '../../store/reducer/form.reducer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public group: FormGroup;
  public fieldSelected = 'name';
  public buttonsDisabled = true;
  public formState: string;
  public isFormValid = false;

  private formStateSubscription: Subscription;
  private isFormValidSubscription: Subscription;

  constructor(formBuilder: FormBuilder, private store: Store<State>) {
    this.group = formBuilder.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     phone: ['', [Validators.required, Validators.pattern(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/)]]
    });
  }

  public ngOnInit(): void {
    this.formStateSubscription = this.store.select(selectForm).subscribe((formState: FormState) => {
      this.group.controls.name.setValue(formState.name);
      this.group.controls.email.setValue(formState.email);
      this.group.controls.phone.setValue(formState.phone);
      this.formState = formState.form_state;

      if (this.formState === 'reset') {
        this.group.reset();
        this.fieldSelected = 'name';
        this.buttonsDisabled = true;
      }
    });

    this.store.select(selectIsFormValid).subscribe((isValid: boolean) => {
      this.isFormValid = isValid;
    });
  }

  public onButtonClick(type: string): void {
    this.fieldSelected = type;
    this.CheckIfDisableButtons(type);
  }

  public async onInputChange(input: string, type: string): Promise<void> {
    const inputResult  = await of(input).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      last())
    .toPromise();

    this.group.controls[type].setValue(inputResult);
    this.CheckIfDisableButtons(type);

    if (this.group.controls[type].valid) {
      switch (type) {
        case 'name':
          this.store.dispatch(setName({name: this.group.controls[type].value}));
          break;
        case 'email':
          this.store.dispatch(setEmail({email: this.group.controls[type].value}));
          break;
        case 'phone':
          this.store.dispatch(setPhone({phone: this.group.controls[type].value}));
          break;
      }
    }
  }

  public onSubmitClick(): void {
    if (this.group.valid) {
      this.fieldSelected = null;
      this.store.dispatch(submitForm());
    }
  }

  public onClearClick(): void {
    this.store.dispatch(resetForm());
  }

  private CheckIfDisableButtons(type: string): void {
    if (this.formState === 'submitted') {
      this.buttonsDisabled = true;
    } else {
      if (this.group.controls[type]) {
        if (!this.group.controls[type].value ||  this.group.controls[type].invalid) {
          this.buttonsDisabled = true;
        } else {
          this.buttonsDisabled = false;
        }
      } else {
        this.buttonsDisabled = false;
      }
    }
  }

  public ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();
    this.isFormValidSubscription.unsubscribe();
  }
}
