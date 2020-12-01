import { Controller, Post, Body, ValidationPipe, Get, Headers, BadRequestException, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Passenger } from './db/entities/passenger.entity';
import { Ticket } from './db/entities/ticket.entity';
import { User } from './db/entities/user.entity';
import { Order } from './db/entities/order.entity';
import bcrypt = require('bcrypt');
import { AuthGuard } from './auth.guard';

@Controller('api')
export class AppController {

  constructor(private jwtService: JwtService) { }

  @Get('login')
  async login(@Headers() user_data) {
    let user: User;
    try {
      user = await User.findOneOrFail({ email: user_data.email }, { select: ['name', 'email', 'role', 'hashed_password'] });
      if (bcrypt.compareSync(user_data.password, user.hashed_password))
        return this.jwtService.sign({ name: user.name, email: user.email, role: user.role })
      throw new Error("pass incorrect");
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

  @UseGuards(AuthGuard)
  @SetMetadata('role', 'admin')
  @Get('user')
  getAllUsers() {
    return User.find({ relations: ['orders', 'orders.tickets', 'orders.tickets.flight', 'orders.tickets.passenger'] })
  }

  @UseGuards(AuthGuard)
  @SetMetadata('role', 'user')
  @Get('user/:email')
  getUser(@Param('email') user_email: string) {
    return User.findOne({ email: user_email }, { relations: ['orders', 'orders.tickets', 'orders.tickets.flight', 'orders.tickets.passenger'] })
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
      return this.jwtService.sign({ name: newUser.name, email: newUser.email, role: newUser.role })
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
