import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';
import { IsString, IsNumberString, IsOptional } from 'class-validator';

@Entity('plains')
export class Plain extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  type: string;

  @Column()
  @IsNumberString()
  number_of_rows: number;

  @Column()
  @IsNumberString()
  seats_to_row: number;

  @Column({ nullable: true })
  @IsNumberString()
  @IsOptional()
  range: number;

  @Column({ nullable: true })
  @IsNumberString()
  @IsOptional()
  speed: number;
}
