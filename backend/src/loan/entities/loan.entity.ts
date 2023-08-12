import { CredcoopClientEntity } from 'src/credcoop-client/entities/credcoop-client.entity';
import { LoanInstallment } from 'src/loan-installment/entities/loan-installment.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
@Entity({ name: 'loan' })
export class LoanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'contract_number', nullable: true })
  contractNumber: string;

  @Column({ name: 'loan_amount', nullable: true })
  loanAmount: number;

  @Column({ name: 'interest_rate', nullable: true })
  interestRate: number;

  @Column({ name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ name: 'amount_of_installments', nullable: true })
  amountOfInstallments: number;

  @Column({ name: 'in_person_modality', default: true })
  inPersonModality: boolean;

  @Column({ name: 'online_modality', default: false })
  onlineModality: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => LoanInstallment, (installment) => installment.loan, { cascade: true, })
  @JoinColumn({ name: 'credcoop_client_id' })
  installments?: LoanInstallment[];

  @Column({ name: 'client_loan_id', nullable: true })
  clientLoanId: number;
  @ManyToOne(() => CredcoopClientEntity, (credcoopClient) => credcoopClient.clientLoans, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'client_loan_id', referencedColumnName: 'id' })
  credcoopClient?: CredcoopClientEntity;

  // Gera número de contrato
  private static lastYear = new Date().getFullYear() - 1; // Ano anterior  
  private static contractCounter = 0; // Inicializa o contador

  @BeforeInsert()
  generateContractNumber() {
    const modality = this.inPersonModality ? 1 : 0;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear().toString().slice(-2);
    const credcoop = '1'
    
    // Verifica se é o primeiro empréstimo do ano
    if (currentDate.getFullYear() > LoanEntity.lastYear) {
      LoanEntity.contractCounter = 1; // Reinicia o contador para 1
      LoanEntity.lastYear = currentDate.getFullYear(); // Atualiza o ano
    } else {
      LoanEntity.contractCounter++; // Incrementa o contador
    }

    this.contractNumber = `${modality}${credcoop}${day}${month}${year}${LoanEntity.contractCounter}`;
    console.log('this.contractNumber::: ', this.contractNumber);
  }

  @BeforeInsert()
  generatesCalculationInstallments() {
    
  }
}
