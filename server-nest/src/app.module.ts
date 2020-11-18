import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DbModule } from './db/db.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: './public/angular/',
    }),
    DbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
