import { LoanEntity } from "src/loan/entities/loan.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "loan_installment" })
export class LoanInstallment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'installment_amount', nullable: true })
    installmentAmount: number;

    @Column({ name: 'loan_id', nullable: true })
    loanId: number;
    @ManyToOne(() => LoanEntity, loan => loan.installments, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'loan_id', referencedColumnName: 'id' })
    loan?: LoanEntity;
}
