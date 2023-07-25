import { ClientCredcoopEntity } from "src/client-credcoop/entities/client-credcoop.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: "loan" })
export class LoanEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ""})
    contractNumber: string;

    @Column()
    amount: number;

    @Column()
    interestRate: number;

    @Column()
    startDate: Date;

    @Column()
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
