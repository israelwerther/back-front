import { ClientCredcoopEntity } from "src/client-credcoop/entities/client-credcoop.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => ClientCredcoopEntity, (clientCredcoop) => clientCredcoop.clientAddresses, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'client_credcoop_id' })
    clientCredcoop?: ClientCredcoopEntity;
}
