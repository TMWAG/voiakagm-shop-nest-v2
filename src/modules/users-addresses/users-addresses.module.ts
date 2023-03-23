import { Module } from '@nestjs/common';
import { UsersAddressesService } from './users-addresses.service';
import { UsersAddressesController } from './users-addresses.controller';

@Module({
  providers: [UsersAddressesService],
  controllers: [UsersAddressesController]
})
export class UsersAddressesModule {}
