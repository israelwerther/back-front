import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CredcoopLoanService } from '../credcoop-loan.service';
import { Loan } from 'src/app/interfaces/loan';
import { Installments } from 'src/app/interfaces/installments';

@Component({
  selector: 'app-credcoop-loan-update',
  templateUrl: './credcoop-loan-update.component.html',
  styleUrls: ['./credcoop-loan-update.component.css']
})
export class CredcoopLoanUpdateComponent {
  loanId: string = '';
  credcoopLoanEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private credcoopLoanService: CredcoopLoanService
  ) {
    this.credcoopLoanEditForm = this.createCredcoopLoanEditForm();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loanId = params['id'];
      this.getCredcoopLoanData(this.loanId);
      // this.teste()
      // this.teste2()
    });
  }

  createCredcoopLoanEditForm() {
    return this.fb.group({
      contractNumber: ['', Validators.required],
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      startDate: ['', Validators.required],
      amountOfInstallments: ['', Validators.required],
      inPersonModality: ['', Validators.required],
      onlineModality: ['', Validators.required],
      installments: this.fb.array([]),
    });
  }

  getCredcoopLoanData(id: string) {
    const token = localStorage.getItem('token_storage');
    if (token) {
      this.credcoopLoanService.getCredcoopLoanById(id, token).subscribe(
        (credcoopLoanData) => {
          this.credcoopLoanEditForm.patchValue({
            contractNumber: credcoopLoanData.contractNumber,
            loanAmount: credcoopLoanData.loanAmount,
            interestRate: credcoopLoanData.interestRate,
            startDate: credcoopLoanData.startDate,
            amountOfInstallments: credcoopLoanData.amountOfInstallments,
            inPersonModality: credcoopLoanData.inPersonModality,
            onlineModality: credcoopLoanData.onlineModality,
          });
          this.setInstallments(credcoopLoanData.installments);
        },
        (error) => {
          console.error('Erro ao obter os dados do empréstimo:', error);
        }
      );
    }
  }

  setInstallments(installments: Installments[]) {
    const intalmentArray = this.credcoopLoanEditForm.get('installments') as FormArray;
    installments.forEach((installment) => {
      intalmentArray.push(
        this.fb.group({
          installmentValue: [installment.installmentValue],
          dueDate: [installment.dueDate],
        })
      );
    });
  }

  get installments() {
    return this.credcoopLoanEditForm.get('installments') as FormArray;
  }

  onSubmit() {
    const loanData: Loan = {
      contractNumber: this.credcoopLoanEditForm.value.contractNumber,
      loanAmount: this.credcoopLoanEditForm.value.loanAmount,
      startDate: this.credcoopLoanEditForm.value.startDate,
      amountOfInstallments: this.credcoopLoanEditForm.value.amountOfInstallments,
      inPersonModality: this.credcoopLoanEditForm.value.inPersonModality,
      onlineModality: this.credcoopLoanEditForm.value.onlineModality,
      interestRate: this.credcoopLoanEditForm.value.interestRate,
      installments: this.credcoopLoanEditForm.value.installments as Installments[],
    };

    const token = localStorage.getItem('token_storage');

    if (token) {
      this.credcoopLoanService
        .updateCredcoopLoan(this.loanId, loanData, token)
        .subscribe(
          () => {
            console.log('Cliente atualizado com sucesso');
          },
          (error) => {
            console.error('Erro ao atualizar o cliente:', error);
          }
        );
    }
  }

  
  // teste() {
  //   class Produto {
  //     nome: string;
  //     preco: number;
    
  //     constructor(nome: string, preco: number) {
  //       this.nome = nome;
  //       this.preco = preco;
  //     }
  //   }
  //   const nomeEscolhido: string = "Produto Legal";
  //   const precoEscolhido: number = 19.99;
  
  //   const produto1 = new Produto(nomeEscolhido, precoEscolhido);
  //   console.log("Detalhes do produto:", produto1);
  // }

  // teste2() {
  //   class Produto {
  //     nome: string = "";
  //     preco: number = 0;
  //   } 
    
  //   const nomeEscolhido: string = "Produto Enfermo";
  //   const precoEscolhido: number = 19.99;

  //   const produto = new Produto();
  //   produto.nome = nomeEscolhido;
  //   produto.preco = precoEscolhido;

  //   console.log("Detalhes do produto 2:", produto);
    
  // }
}
