import { Global, Module } from '@nestjs/common';
import ErrorHandlerService from './utils/error.handler.service';

@Global()
@Module({
  providers: [ErrorHandlerService],
  exports: [ErrorHandlerService],
})
export class CommonModule {}
