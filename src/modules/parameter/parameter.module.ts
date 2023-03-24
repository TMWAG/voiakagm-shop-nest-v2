import { Module } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ParameterController } from './parameter.controller';
import { ParameterRepository } from './parameter.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  providers: [ParameterService, ParameterRepository],
  controllers: [ParameterController],
  imports: [PrismaModule],
})
export class ParameterModule {}
