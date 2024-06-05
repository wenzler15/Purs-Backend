import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { LeadModule } from './lead/lead.module';
import { PdiModule } from './pdi/pdi.module';
import { PdiActionModule } from './pdi-action/pdi-action.module';
import { ExportUrlModule } from './export-url/export-url.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { QuestionsTypeModule } from './questions-type/questions-type.module';
import { QuestionsAlternativesModule } from './questions-alternatives/questions-alternatives.module';
import { QuestionsSectionsModule } from './questions-sections/questions-sections.module';
import { QuestionsModule } from './questions/questions.module';
import { ResearchModule } from './research/research.module';
import { ResearchResponseModule } from './research-response/research-response.module';
import { UploadsModule } from './uploads/uploads.module';

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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
            user: process.env.SEND_GRID_FROM,
            pass: process.env.SEND_GRID_PASS
        },
    }
    }),
    UsersModule,
    RolesModule,
    LeadModule,
    PdiModule,
    PdiActionModule,
    ExportUrlModule,
    QuestionsTypeModule,
    QuestionsAlternativesModule,
    QuestionsSectionsModule,
    QuestionsModule,
    ResearchModule,
    ResearchResponseModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
