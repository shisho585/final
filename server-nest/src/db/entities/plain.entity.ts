import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';

@Entity('plains')
export class Plain extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ unique: true })
  @IsString()
  type: string;

  @Column()
  @IsNumber()
  number_of_rows: number;

  @Column()
  @IsNumber()
  seats_to_row: number;

  @Column()
  @IsNumber()
  range: number;

  @Column()
  @IsNumber()
  speed: number;
}
