import { ClientCredcoopEntity } from "src/client-credcoop/entities/client-credcoop.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "client_address" })
export class ClientAddressEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'zip_code', nullable: true })
    zipCode: string

    @Column({ name: 'street', nullable: true })
    street: string

    @Column({ name: 'neighborhood', nullable: true })
    neighborhood: string

    @Column({ name: 'state', nullable: true })
    state: string

    @Column({ name: 'city', nullable: true })
    city: string

    @Column({ name: 'building_number', nullable: true })
    buildingNumber: string

    @Column({ name: 'reference_point', nullable: true })
    referencePoint: string

    @Column({ name: 'complement', nullable: true })
    complement: string

    @Column({ name: 'client_credcoop_id', nullable: true })
    clientCredcoopId: number;
    @ManyToOne(() => ClientCredcoopEntity, (clientCredcoop) => clientCredcoop.client_addresses)
    @JoinColumn({ name: 'client_credcoop_id', referencedColumnName: 'id' })
    clientCredcoop?: ClientCredcoopEntity;
}
