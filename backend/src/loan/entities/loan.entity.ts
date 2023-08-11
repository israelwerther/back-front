import { CredcoopClientEntity } from 'src/credcoop-client/entities/credcoop-client.entity';
import { LoanInstallment } from 'src/loan-installment/entities/loan-installment.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
@Entity({ name: 'loan' })
export class LoanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'contract_number', nullable: true })
  contractNumber: string;

  @BeforeInsert()
  generateContractNumber() {
    this.contractNumber = `CONTRACT-${Date.now()}`;
  }

  @Column({ name: 'loan_amount', nullable: true })
  loanAmount: number;

  @Column({ name: 'interest_rate', nullable: true })
  interestRate: number;

  @Column({ name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ name: 'amount_of_installments', nullable: true })
  amountOfInstallments: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => LoanInstallment, (installment) => installment.loan, {
    cascade: true,
  })
  @JoinColumn({ name: 'credcoop_client_id' })
  installments?: LoanInstallment[];

  @Column({ name: 'client_loan_id', nullable: true })
  clientLoanId: number;
  @ManyToOne(
    () => CredcoopClientEntity,
    (credcoopClient) => credcoopClient.clientLoans,
    { onDelete: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'client_loan_id', referencedColumnName: 'id' })
  credcoopClient?: CredcoopClientEntity;
}
