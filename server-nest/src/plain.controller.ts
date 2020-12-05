import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Plain } from './db/entities/plain.entity';

@ApiTags('plains')
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

    @Get(':type')
    getPlain(@Param('type') type: string) {
        return Plain.findOne({ type });
    }

    @Post()
    createNewPlain(@Body(ValidationPipe) newPlain: Plain) {
        return Plain.save(newPlain);
    }

    @Delete(':type')
    deletePlain(@Param('type') type: string) {
        return Plain.delete({ type });
    }
}
