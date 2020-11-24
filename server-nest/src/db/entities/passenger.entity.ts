import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Matches, IsNumber, IsString } from 'class-validator';
import { Ticket } from './ticket.entity';
import { User } from './user.entity';

@Entity('passengers')
export class Passenger extends BaseEntity {
  @PrimaryColumn()
  @IsNumber({}, { message: "מספר הדרכון חייב לכלול ספרות בלבד" })
  passport: number;

  @Column()
  @Matches(/^[\u0590-\u05fe\s]*$/, { message: "שם בעברית חייב לכלול רק אותיות בעברית ורווחים" })
  hebrew_name: string;

  @Column()
  @Matches(/^[a-zA-Z\s]*$/, { message: "שם באנגלית חייב לכלול רק אותיות באנגלית ורווחים" })
  english_name: string;

  @Column()
  @IsString()
  contact_user_name: string;

  @ManyToOne('User')
  @JoinColumn({ name: 'contact_user_name' })
  cantact_user: User;

  @OneToMany('Ticket', 'passenger')
  tickets: Ticket[];
}
