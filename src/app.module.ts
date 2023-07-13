import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import JoiValidation from './common/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidation,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
