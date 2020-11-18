import { Injectable } from '@nestjs/common';
import { User } from './db/entities/user.entity';

@Injectable()
export class AppService {
    getHello() {
        return User.find();
    }
}
