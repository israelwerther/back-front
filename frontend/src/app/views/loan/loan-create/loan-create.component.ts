import { Component } from '@angular/core';
import {
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-loan-create',
  templateUrl: './loan-create.component.html',
  styleUrls: ['./loan-create.component.css']
})
export class LoanCreateComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}
