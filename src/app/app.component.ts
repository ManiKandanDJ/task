import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  SignupForm: FormGroup;
  validatermessage: {
    name: [
      { pattern: 'Please enter valid pattter' },
      { required: 'Please enter value' }
    ];
    email: [
      { pattern: 'Please enter valid pattter' },
      { required: 'Please enter value' }
    ];
    mobile: [
      { pattern: 'Please enter valid pattter' },
      { required: 'Please enter value' }
    ];
  };

  infoEnable: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.SignupForm = this.formBuilder.group({
      details: this.formBuilder.array([]),
    });
  }

  get details(): FormArray {
    return this.SignupForm.get('details') as FormArray;
  }

  addApp() {
    if (this.details.length <= 10) {
      const detailform = this.formBuilder.group({
        name: ['', Validators.required],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ]),
        ],
        mobile: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^([0-9]{10})$'),
          ]),
        ],
      });

      this.details.push(detailform);
    }
  }

  onSubmit(value) {
    this.infoEnable = true;
    console.log(this.SignupForm.value);
  }
}

// angular form is group of controls
