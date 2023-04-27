import { Module } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ParameterController } from './parameter.controller';
import { ParameterRepository } from './parameter.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from '../category/category.module';

@Module({
  providers: [ParameterService, ParameterRepository],
  controllers: [ParameterController],
  imports: [
    PrismaModule,
    CategoryModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [ParameterService],
})
export class ParameterModule {}
