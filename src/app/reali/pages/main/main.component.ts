import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { setName, setEmail, setPhone, resetForm, submitForm } from '../../store/actions/form.actions';
import { selectForm } from '../../store/selectors/form.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public group: FormGroup;
  public fieldSelected = 'name';
  public buttonsDisabled = true;
  public isSubmit = false;

  private formStateSubscription: Subscription;
  constructor(fb: FormBuilder, private store: Store<State>) {
    this.group = fb.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     phone: ['', [Validators.required]]
    });
  }

  public ngOnInit(): void {
    this.formStateSubscription = this.store.select(selectForm).subscribe(formState => {
      this.group.controls.name.setValue(formState.name);
      this.group.controls.email.setValue(formState.email);
      this.group.controls.phone.setValue(formState.phone);
      this.isSubmit = formState.is_submit;
    });
  }

  public onButtonClick(type: string): void {
    this.fieldSelected = type;
    this.CheckIfDisableButtons(type);
  }

  public onInputChange(input: string, type: string): void {
    const $input = of(input).pipe(debounceTime(500),
    distinctUntilChanged())
    .subscribe(res => {
      this.group.controls[type].setValue(res);
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
    });

    $input.unsubscribe();
  }

  public onSubmitClick(): void {
    if (this.group.valid) {
      this.store.dispatch(submitForm());
    }
  }

  public onClearClick(): void {
    this.group.reset();
    this.fieldSelected = 'name';
    this.buttonsDisabled = true;
    this.store.dispatch(resetForm());
  }

  private CheckIfDisableButtons(type: string): void {
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

  public ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();
  }
}
