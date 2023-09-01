import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rate' })
export class RateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'fees', type: 'decimal', precision: 10, scale: 10 })
    fees: number;

    @Column({ name: 'daily_iof', type: 'decimal', precision: 10, scale: 10 })
    dailyIOF: number;

    @Column({ name: 'extra_iof', type: 'decimal', precision: 10, scale: 10 })
    extraIOF: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
