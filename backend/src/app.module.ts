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
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'mysecretpassword',
        database: process.env.DB_DATABASE || 'postgres',
      },
    },
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
