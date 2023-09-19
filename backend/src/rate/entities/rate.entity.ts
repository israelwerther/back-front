import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'rate' })
@ObjectType()
export class RateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'fees', type: 'double precision', nullable: true })
    @Field()
    fees: number;

    @Column({ name: 'daily_iof', type: 'double precision', nullable: true })
    @Field()
    dailyIOF: number;

    @Column({ name: 'extra_iof', type: 'double precision', nullable: true })
    @Field()
    extraIOF: number;

    @Column({ name: 'late_fee', type: 'double precision', nullable: true })
    @Field()
    lateFee: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
