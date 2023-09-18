import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/interfaces/loan';
import { CredcoopLoanService } from '../credcoop-loan.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CredcoopClientService } from '../../credcoop-client/credcoop.service';
import { PublicService } from 'src/app/services/public.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credcoop-loan-create',
  templateUrl: './credcoop-loan-create.component.html',
  styleUrls: ['./credcoop-loan-create.component.css']
})
export class CredcoopLoanCreateComponent implements OnInit {
  clients: any[] = [];
  installmentDates: Date[] = [];

  ngOnInit() {
    this.loadQueryCredcoop();
    this.returnInstallments(this.startDate, this.amountOfInstallments);    
  }

  constructor(
    private credcoopLoanService: CredcoopLoanService,
    private publicService: PublicService,
    private fb: FormBuilder,
    private credcoopClientService: CredcoopClientService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  loanForm = this.fb.group({
    credcoopClientLoanId: [null, Validators.required],
    loanAmount: [1000, Validators.required],
    startDate: [this.publicService.getTodayDate(), Validators.required],
    amountOfInstallments: [Validators.required],
    modality: ['online', [Validators.required]],
    installments: this.fb.array([
      this.fb.group({
        amount: [100],
        dueDate: [],
      }),
    ]),
  });

  // get installments() {
  //   return this.loanForm.get('installments') as FormArray;
  // }  

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
        installments: this.loanForm.value.installments || [],
      };

      this.credcoopLoanService.createCredcoopLoan(loanData).subscribe({
        next: () => {
          this.showSuccessToast();
          this.router.navigate(['emprestimos-credcoop-lista']);
        },
        error: (error) => {
          this.showErrorToast();
          console.error('Erro ao cadastrar o empréstimo:', error);
        },
      });
    } else {
      this.showErrorToast();
      console.log("Formulário inválido");
      //this.missingFields();
    }
  }

  // Necessário para obter o nome e id para usar no ng-select
  loadQueryCredcoop() {
    this.credcoopClientService.getQueryCredcoop().subscribe((result) => {
      this.clients = result.data.credcoopClients;
    });
  }

  startDate: string = this.publicService.getTodayDate();
  amountOfInstallments: number = 5;

  returnInstallments(startDate: string, amountOfInstallments: number) {
    this.credcoopLoanService.getInstallments(startDate, amountOfInstallments).subscribe((result) => {
      this.installmentDates = result.data.getInstallmentDates;
    });
  }

  onInputChange() {
    // Esta função será chamada quando os inputs forem alterados
    // Atualize as variáveis startDate e amountOfInstallments aqui
    // e chame returnInstallments novamente com os novos valores
    this.returnInstallments(this.startDate, this.amountOfInstallments);
  }

  // Método para exibir o toastr de sucesso
  showSuccessToast() {
    this.toastr.success('Empréstimo realizado com sucesso', 'Sucesso');
  }

  // Método para exibir o toastr de erro
  showErrorToast() {
    this.toastr.error('Erro ao cadastrar o empréstimo', 'Erro');
  }

}
