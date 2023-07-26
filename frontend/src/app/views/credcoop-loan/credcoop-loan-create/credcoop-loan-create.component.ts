import { Component } from '@angular/core';
import { Loan } from 'src/app/interfaces/loan';
import { CredcoopLoanService } from '../credcoop-loan.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credcoop-loan-create',
  templateUrl: './credcoop-loan-create.component.html',
  styleUrls: ['./credcoop-loan-create.component.css']
})
export class CredcoopLoanCreateComponent {

  constructor(
    private credcoopLoanService: CredcoopLoanService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loanForm = this.fb.group({
    clientLoanId:['', Validators.required],
    loanAmount: ['', Validators.required],
    startDate: ['', Validators.required],
    amountOfInstallments: ['', Validators.required],
  });

  onSubmitLoan() {
    if (this.loanForm.valid) {

      const clientLoanIdValue = this.loanForm.value.clientLoanId;
      const parsedClientLoanId = clientLoanIdValue ? Number(clientLoanIdValue) : null;

      const loanAmountValue = this.loanForm.value.loanAmount;
      const parsedloanAmount = loanAmountValue ? Number(loanAmountValue) : null;

      const startDateValue = this.loanForm.value.startDate;
      const parsedStartDate = startDateValue ? new Date(startDateValue) : null;

      const amountOfInstallmentsValue = this.loanForm.value.amountOfInstallments;
      const parsedAmountOfInstallments = amountOfInstallmentsValue ? Number(amountOfInstallmentsValue) : null;

      const LoanData: Loan = {
        clientLoanId: parsedClientLoanId,
        loanAmount: parsedloanAmount,
        startDate: parsedStartDate,
        amountOfInstallments: parsedAmountOfInstallments,
      };

      // const token = localStorage.getItem('token_storage');

      // if (token) {
        this.credcoopLoanService.createCredcoopLoan(LoanData).subscribe({
            next: () => {
              console.log("Empréstimo cadastrado com sucesso")
              // this.router.navigate(['home']);
            },
            error: (error) => {
              console.error('Erro ao cadastrar o cliente e endereço:', error);
            },
          });
      }
     else {
      console.log("Nada")
      //this.missingFields();
    }
  }
}
