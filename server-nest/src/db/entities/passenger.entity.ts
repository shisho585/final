import { Entity, BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Matches, IsNumber } from 'class-validator';
import { Ticket } from './ticket.entity';

@Entity('passengers')
export class Passenger extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ unique: true })
  @IsNumber({}, { message: "מספר הדרכון חייב לכלול ספרות בלבד" })
  passport: number;

  @Column()
  @Matches(/^[\u0590-\u05fe\s]*$/, { message: "שם בעברית חייב לכלול רק אותיות בעברית ורווחים" })
  hebrew_name: string;

  @Column()
  @Matches(/^[a-zA-Z\s]*$/, { message: "שם באנגלית חייב לכלול רק אותיות באנגלית ורווחים" })
  english_name: string;

  @OneToMany('Ticket', 'passenger')
  tickets: Ticket[];
}
