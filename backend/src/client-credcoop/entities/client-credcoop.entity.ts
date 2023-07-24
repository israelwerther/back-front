import { ClientAddressEntity } from "src/client-address/entities/client-address.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "client_credcoop" })
export class ClientCredcoopEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'client_name', nullable: true })
    clientName: string

    @Column({ name: 'cpf', nullable: true })
    cpf: string

    @Column({ name: 'id_card', nullable: true })
    idCard: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => ClientAddressEntity, (clientAddress) => clientAddress.clientCredcoop, { cascade: true })
    @JoinColumn({ name: 'client_credcoop_id' })
    clientAddresses?: ClientAddressEntity[];
}
