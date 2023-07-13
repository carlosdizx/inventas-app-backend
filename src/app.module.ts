import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import JoiValidation from './common/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ErrorHandlerModule } from './common/modules/error-handler/error.handler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidation,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ErrorHandlerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
