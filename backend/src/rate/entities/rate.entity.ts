import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rate' })
export class RateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ type: 'float', default: 0.083 })
    @Column({ name: 'fees', type: 'decimal', precision: 10, scale: 2 })
    fees: number;

    // @Column({ type: 'float', default: 0.00137 })
    @Column({ name: 'daily_iof', type: 'decimal', precision: 10, scale: 2 })
    dailyIOF: number;

    // @Column({ type: 'float', default: 0.0038 })
    @Column({ name: 'extra_iof', type: 'decimal', precision: 10, scale: 2 })
    extraIOF: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
