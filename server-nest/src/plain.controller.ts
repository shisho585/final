import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Plain } from './db/entities/plain.entity';

@Controller('api/plain')
export class PlainController {

    @Get()
    getAllPlains() {
        return Plain.find();
    }

    @Get('type')
    getAllPlainTypes() {
        return Plain.find({ select: ['type'] });
    }

    @Post()
    createNewPlain(@Body(ValidationPipe) newPlain: Plain) {
        return Plain.save(newPlain);
    }

}
