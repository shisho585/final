import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: './client-static',
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
