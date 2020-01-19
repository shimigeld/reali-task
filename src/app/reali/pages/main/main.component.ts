import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public group: FormGroup;
  public fieldSelected = 'name';
  public buttonsDisabled = true;
  constructor(fb: FormBuilder) {
    this.group = fb.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     phone: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  public onButtonClick(type: string): void {
    this.fieldSelected = type;
    this.CheckIfDisableButtons(type);
    console.debug(type);
  }

  public onInputChange(input: string, type: string): void {
    const $input = of(input).pipe(debounceTime(500),
                  distinctUntilChanged())
          .subscribe(res => {
            this.group.controls[type].setValue(res);
            this.CheckIfDisableButtons(type);
          });


    $input.unsubscribe();
  }

  private CheckIfDisableButtons(type: string): void {
    if (!this.group.controls[type].value ||  this.group.controls[type].invalid) {
      this.buttonsDisabled = true;
    } else {
      this.buttonsDisabled = false;
    }
  }

}
