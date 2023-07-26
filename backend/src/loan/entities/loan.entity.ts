import { ClientCredcoopEntity } from "src/client-credcoop/entities/client-credcoop.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: "loan" })
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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'client_loan_id', nullable: true })
    clientLoanId: number;
    @ManyToOne(() => ClientCredcoopEntity, (clientCredcoop) => clientCredcoop.clientLoans, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'client_loan_id', referencedColumnName: 'id' })
    clientCredcoop?: ClientCredcoopEntity;
}
