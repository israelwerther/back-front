import { ClientAddressEntity } from "src/client-address/entities/client-address.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "client_credcoop" })
export class ClientCredcoopEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'client_name', nullable: false })
    clientName: string

    @Column({ name: 'cpf', nullable: true })
    cpf: string

    @OneToMany(() => ClientAddressEntity, (clientAddress) => clientAddress.clientCredcoop, { cascade: true })
    @JoinColumn({ name: 'client_credcoop_id' })
    clientAddresses?: ClientAddressEntity[];
}
