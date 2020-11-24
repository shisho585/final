import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightController } from './flight.controller';
import { PlainController } from './plain.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: './public/angular/',
    }),
    DbModule,
  ],
  controllers: [AppController, FlightController, PlainController],
  providers: [AppService],
})
export class AppModule { }
