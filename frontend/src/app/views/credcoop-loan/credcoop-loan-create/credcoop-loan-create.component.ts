import { Component, OnInit } from '@angular/core';
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
export class CredcoopLoanCreateComponent implements OnInit {
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
    credcoopClientLoanId: [null, Validators.required],
    loanAmount: [1000, Validators.required],
    startDate: [this.getTodayDate(), Validators.required],
    amountOfInstallments: [12, Validators.required],
    interestRate: [5],
    modality: ['online', [Validators.required]],
    installments: this.fb.array([
      this.fb.group({
        amount: [100],
        dueDate: [new Date(2023, 9, 1)],
      }),
    ]),
  });

  get installments() {
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
    const startDateValue = this.loanForm.value.startDate;
    const parsedStartDate = startDateValue ? new Date(startDateValue) : null;
    const selectedModality = this.loanForm.value.modality;
    
    if (this.loanForm.valid) {
      const loanData: Loan = {
        credcoopClientLoanId: this.loanForm.value.credcoopClientLoanId,
        loanAmount: this.loanForm.value.loanAmount,
        startDate: parsedStartDate,
        amountOfInstallments: this.loanForm.value.amountOfInstallments,
        inPersonModality: selectedModality === 'inPerson',
        onlineModality: selectedModality === 'online',
        interestRate: this.loanForm.value.interestRate,
        installments: this.loanForm.value.installments || [],
      };

      this.credcoopLoanService.createCredcoopLoan(loanData).subscribe({
        next: () => {
          console.log("Empréstimo cadastrado com sucesso");
          // this.router.navigate(['emprestimos-credcoop-lista']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar o empréstimo:', error);
        },
      });
    } else {
      console.log("Formulário inválido");
      //this.missingFields();
    }
  }

  loadQueryCredcoop() {
    this.credcoopClientService.getQueryCredcoop().subscribe((result) => {
      this.clients = result.data.credcoopClients;
    });
  }

}
