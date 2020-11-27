import { Controller, Post, Body, ValidationPipe, Get, Headers, BadRequestException, Param } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Passenger } from './db/entities/passenger.entity';
import { Ticket } from './db/entities/ticket.entity';
import { User } from './db/entities/user.entity';
import { Order } from './db/entities/order.entity';
import bcrypt = require('bcrypt');

@Controller('api')
export class AppController {

  constructor(private jwtService: JwtService) { }

  @Get('login')
  async login(@Headers() user_data) {
    let user: User;
    try {
      user = await User.findOneOrFail(user_data.email, { select: ['email', 'role', 'hashed_password'] });
      let pass = bcrypt.compareSync(user_data.password, user.hashed_password);
      if (pass)
        return this.jwtService.sign({ email: user.email, role: user.role })
      else {
        throw new Error("pass incorrect");
      }
    } catch (error) {
      if (error.message.includes("entity of type \"User\""))
        error.message = "user not found";
      throw new BadRequestException(error.message);
    }
  }

  @Get('authenticate')
  async authenticate(@Headers() user_data) {
    try {
      return this.jwtService.verify(user_data.authorization).role;
    } catch (error) {
      return 'fail';
    }
  }

  @Get('user')
  getAllUsers() {
    return User.find({ relations: ['orders', 'orders.tickets', 'orders.tickets.flight', 'orders.tickets.passenger'] })
  }

  @Get('user/:email')
  getUser(@Param('email') user_email: string) {
    return User.findOne(user_email, { relations: ['orders', 'orders.tickets', 'orders.tickets.flight', 'orders.tickets.passenger'] })
  }

  @Post('passenger')
  createNewPassenger(@Body(ValidationPipe) newPassenger: Passenger) {
    return Passenger.save(newPassenger);
  }

  @Post('ticket')
  createNewTicket(@Body() ticketsToAdd: Ticket[]) {
    return Ticket.save(ticketsToAdd);
  }

  @Post('order')
  createNewOrder(@Body(ValidationPipe) newOrder: Order) {
    return Order.saveOrder(newOrder);
  }

  @Post('user')
  async createNewUser(@Body(ValidationPipe) newUser: User) {
    try {
      await User.insertUser(newUser);
      return this.jwtService.sign({ email: newUser.email, role: newUser.role })
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
