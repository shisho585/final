import { BadRequestException, Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { User } from './db/entities/user.entity';

@Controller('api/user')
export class UserController {

    constructor(private jwtService: JwtService) { }

    @UseGuards(AuthGuard)
    @SetMetadata('role', 'admin')
    @Get()
    getAllUsers() {
        return User.find({ relations: ['orders', 'orders.tickets', 'orders.tickets.flight', 'orders.tickets.passenger'] })
    }

    @UseGuards(AuthGuard)
    @SetMetadata('role', 'user')
    @Get(':email')
    getUser(@Param('email') user_email: string) {
        return User.findOne({ email: user_email }, { relations: ['orders', 'orders.tickets', 'orders.tickets.flight', 'orders.tickets.passenger'] })
    }

    @Post()
    async createNewUser(@Body(ValidationPipe) newUser: User) {
        try {
            await User.insertUser(newUser);
            return this.jwtService.sign({ name: newUser.name, email: newUser.email, role: newUser.role })
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @UseGuards(AuthGuard)
    @SetMetadata('role', 'user')
    @Delete(':email')
    deletUser(@Param('email') email: string) {
        return User.delete({ email });
    }
}
