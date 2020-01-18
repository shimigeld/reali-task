import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public group: FormGroup;

  constructor(fb: FormBuilder) {
    this.group = fb.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     phone: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

}
