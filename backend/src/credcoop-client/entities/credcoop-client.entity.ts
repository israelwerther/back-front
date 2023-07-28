import { ClientAddressEntity } from "src/client-address/entities/client-address.entity";
import { LoanEntity } from "src/loan/entities/loan.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity({ name: "credcoop_client" })
@ObjectType()
export class CredcoopClientEntity {
    @PrimaryGeneratedColumn('rowid')
    @Field(() => Int)
    id: number;

    @Column({ name: 'client_name', nullable: true })
    @Field({ nullable: true })
    clientName: string

    @Column({ name: 'cpf', nullable: true })
    cpf: string

    @Column({ name: 'id_card', nullable: true })
    idCard: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => ClientAddressEntity, (clientAddress) => clientAddress.credcoopClient, { cascade: true })
    @JoinColumn({ name: 'credcoop_client_id' })
    clientAddresses?: ClientAddressEntity[];

    @OneToMany(() => LoanEntity, (loans) => loans.credcoopClient, { cascade: true })
    @JoinColumn({ name: 'credcoop_client_id' })
    clientLoans?: LoanEntity[];
}
