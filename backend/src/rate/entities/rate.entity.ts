import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rate' })
export class RateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'fees', type: 'double precision', nullable: true })
    fees: number;

    @Column({ name: 'daily_iof', type: 'double precision', nullable: true })
    dailyIOF: number;

    @Column({ name: 'extra_iof', type: 'double precision', nullable: true })
    extraIOF: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
