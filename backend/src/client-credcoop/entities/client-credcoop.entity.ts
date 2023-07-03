import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "client_credcoop" })
export class ClientCredcoopEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'clientName', nullable: false })
    clientName: string
}
