import { Component } from '@angular/core';
import { Loan } from 'src/app/interfaces/loan';
import { CredcoopLoanService } from '../credcoop-loan.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CredcoopClientService } from '../../credcoop-client/credcoop.service';

@Component({
  selector: 'app-credcoop-loan-create',
  templateUrl: './credcoop-loan-create.component.html',
  styleUrls: ['./credcoop-loan-create.component.css']
})
export class CredcoopLoanCreateComponent {
  clients: any[] = [];

  ngOnInit() {
    this.loadQueryCredcoop();
  }

  constructor(
    private credcoopLoanService: CredcoopLoanService,
    private fb: FormBuilder,
    private router: Router,
    private credcoopClientService: CredcoopClientService
  ) { }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loanForm = this.fb.group({
    clientLoanId: [null, Validators.required],
    loanAmount: [100, Validators.required],
    startDate: [this.getTodayDate(), Validators.required],
    amountOfInstallments: [1, Validators.required],
    installments: this.fb.array([
      this.fb.group({
        amount: [100],
        dueDate: [new Date(2023, 9, 1)],
      }),
    ]),
  });

  get installments() {
    console.log('installments::: ', this.loanForm.get('installments'));
    return this.loanForm.get('installments') as FormArray;
  }

  addInstallments() {
    const amountOfInstallments = this.loanForm.get('amountOfInstallments')?.value || 0;
    const installmentsArray = this.loanForm.get('installments') as FormArray;
    let startDate = this.loanForm.get('starDate')?.value;
    const loanAmount = this.loanForm.get('loanAmount')?.value || 0;

    let newAmount = loanAmount / amountOfInstallments;
    newAmount = parseFloat(newAmount.toFixed(2))
  
    for (let i = 0; i < installmentsArray.length; i++) {
      installmentsArray.at(i).get('amount')?.setValue(newAmount);
    }
  
    if (amountOfInstallments > installmentsArray.length) {
      for (let i = installmentsArray.length; i < amountOfInstallments; i++) {
        installmentsArray.push(this.fb.group({
          amount: newAmount,
          dueDate: startDate
        }));
      }
    } else if (amountOfInstallments < installmentsArray.length) {
      for (let i = installmentsArray.length; i > amountOfInstallments; i--) {
        installmentsArray.removeAt(i - 1);
      }
    }
  }
  

  onSubmitLoan() {
    if (this.loanForm.valid) {

      const startDateValue = this.loanForm.value.startDate;
      const parsedStartDate = startDateValue ? new Date(startDateValue) : null;

      const LoanData: Loan = {
        clientLoanId: this.loanForm.value.clientLoanId,
        loanAmount: this.loanForm.value.loanAmount,
        startDate: parsedStartDate,
        amountOfInstallments: this.loanForm.value.amountOfInstallments,
      };

      this.credcoopLoanService.createCredcoopLoan(LoanData).subscribe({
        next: () => {
          console.log("Empréstimo cadastrado com sucesso")
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar o cliente e endereço:', error);
        },
      });
    }
    else {
      console.log("invalid form")
      //this.missingFields();
    }
  }

  loadQueryCredcoop() {
    this.credcoopClientService.getQueryCredcoop().subscribe((result) => {
      this.clients = result.data.credcoopClients;
    });
  }

}
