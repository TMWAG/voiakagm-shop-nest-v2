import { Module } from '@nestjs/common';
import { UsersAddressesService } from './users-addresses.service';
import { UsersAddressesController } from './users-addresses.controller';
import { UserAddressRepository } from './users-addresses.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  providers: [UsersAddressesService, UserAddressRepository],
  controllers: [UsersAddressesController],
  imports: [PrismaModule],
  exports: [UsersAddressesService],
})
export class UsersAddressesModule {}
