import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, last } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public group: FormGroup;
  public fieldSelected = 1;
  constructor(fb: FormBuilder) {
    this.group = fb.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     phone: ['', [Validators.required]]
    });
  }

  ngOnInit() {   
  }

  public onButtonClick(value: string): void {
    this.fieldSelected = +value;
    console.debug(value);
  }

  public onInputChange(input: string): void {
    const $input = of(input).pipe(debounceTime(500),
                  distinctUntilChanged(),
                  filter((query: string) => query.length > 2))
          .subscribe(res => console.debug(res));


    $input.unsubscribe();
  }

}
