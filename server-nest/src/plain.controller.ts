import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Plain } from './db/entities/plain.entity';

@Controller('api/plain')
@UseGuards(AuthGuard)
@SetMetadata('role', 'admin')
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

    @Delete(':id')
    deletePlain(@Param('id') id: string) {
        return Plain.delete(id);
    }
}
