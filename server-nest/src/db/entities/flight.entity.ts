import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn, AfterLoad, BeforeInsert, BeforeUpdate, } from 'typeorm';
import { Plain } from './plain.entity';
import { Ticket } from './ticket.entity';
import { MaxLength, IsOptional, IsDateString, IsAlpha, IsString, IsDate, IsNumber, Matches, } from 'class-validator';
import { Type } from 'class-transformer';

@Entity('flights')
export class Flight extends BaseEntity {

    // @BeforeInsert()
    // @BeforeUpdate()
    // async saveLandindg() {
    //     this.landing = this.departure;
    //     if (this.landing != null) {
    //         if (this.plain == null) {
    //             await Plain.findOne(this.plain_type).then(plain => this.plain = plain)
    //         }
    //         console.log(this.distance);
    //         console.log(this.plain.speed);

    //         this.landing.setMinutes(this.departure.getMinutes() + (this.distance / this.plain.speed) * 60);
    //     }
    //     console.log(this);
    // }

    @PrimaryColumn()
    @Matches(/^[0-9a-zA-Z\s]*$/)
    number: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    departure: Date;

    @Column({
        // default: () => {
        //     console.log(this.departure);

        //     if (this.departure != null) {
        //         const landing = this.departure;
        //         landing.setMinutes(this.departure.getMinutes() + (this.distance / this.plain.speed) * 60);
        //         return landing;
        //     }
        // }
    } /*TODO nullable*/)
    @IsDateString()
    @IsOptional()
    landing: Date;

    @Column()
    @IsAlpha()
    from_country: string;

    @Column()
    @IsAlpha()
    @MaxLength(3)
    from_terminal: string;

    @Column()
    @IsAlpha()
    to_country: string;

    @Column()
    @IsAlpha()
    @MaxLength(3)
    to_terminal: string;

    @Column({ nullable: true })
    @IsString()
    plain_type: string;

    @Column()
    @IsNumber()
    price: number;

    @ManyToOne('Plain')
    @JoinColumn({ name: 'plain_type' })
    plain: Plain;

    @OneToMany('Ticket', 'flight')
    tickets: Ticket[];

    @IsNumber()
    distance: number;
}
