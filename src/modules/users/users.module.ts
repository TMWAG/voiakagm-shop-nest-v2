import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
