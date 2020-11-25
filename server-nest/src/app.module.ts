import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightController } from './flight.controller';
import { PlainController } from './plain.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: './public/angular/',
    }),
    JwtModule.register({
      secret: 'secret990',
      signOptions: {
        expiresIn: '60m'
      }
    }),
    DbModule,
  ],
  controllers: [AppController, FlightController, PlainController],
  providers: [AppService],
})
export class AppModule { }
