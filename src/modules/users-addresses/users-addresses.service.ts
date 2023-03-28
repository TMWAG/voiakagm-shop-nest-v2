import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAddress } from '@prisma/client';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { DeleteUserAddressDto } from './dto/delete-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddressRepository } from './users-addresses.repository';

@Injectable()
export class UsersAddressesService {
  constructor(private readonly repository: UserAddressRepository) {}

  //create
  async createUserAddress(userId: number, dto: CreateUserAddressDto) {
    return await this.repository.createUserAddress(userId, dto.address);
  }

  //get
  async getAllUserAddressesByUserId(id: number) {
    return await this.repository.getAllAddressesByUserId(id);
  }

  async getUserAddressByIdOrThrowError(id: number) {
    const userAddress = await this.repository.getOneById(id);
    if (!userAddress)
      throw new NotFoundException(
        httpExceptionMessages.notFound.userAddress(id),
      );
    return userAddress;
  }

  //update
  async updateUserAddressById(userId: number, dto: UpdateUserAddressDto) {
    await this.getUserAddressByIdOrThrowError(dto.id);
    await this.checkUserOwnershipOnAddressOrThrowError(userId, dto.id);
    return await this.repository.updateAddressById(dto.id, dto.address);
  }

  //delete
  async deleteUserAddressById(userId: number, dto: DeleteUserAddressDto) {
    await this.getUserAddressByIdOrThrowError(dto.id);
    await this.checkUserOwnershipOnAddressOrThrowError(userId, dto.id);
    return await this.repository.deleteAddressById(dto.id);
  }

  //utils
  async checkUserOwnershipOnAddressOrThrowError(
    userId: number,
    addressId: number,
  ): Promise<UserAddress | never> {
    const addresses = await this.getAllUserAddressesByUserId(userId);
    const target = addresses.find((address) => address.id === addressId);
    if (!target)
      throw new NotFoundException(
        `Адрес с Id: ${addressId} не числится за данным пользователем`,
      );
    return target;
  }
}
