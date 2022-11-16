import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    KnexModule.forRoot({
    config: {
      client: 'pg',
      version: '14.5',
      useNullAsDefault: true,
      connection: {
        host: 'localhost',
        port : 5432,
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres',
      },
    },
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
