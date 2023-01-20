import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CompaniesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SendGridModule.forRoot({
      apikey: process.env.SEND_GRID_KEY,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
