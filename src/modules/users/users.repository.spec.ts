import { Test } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    usersRepository = moduleRef.get(UsersRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  describe('createUser', () => {
    it('should create new user', async () => {
      const mockUser: User = {
        id: 1,
        name: 'Joe',
        surname: 'Mama',
        email: 'example@mail.com',
        password: 'Qwerty1234',
        phone: '+79991112233',
        role: 'USER',
        vkLink: null,
        tgLink: null,
      };

      prismaService.user.create.mockResolvedValue(mockUser);

      const createUser = () =>
        usersRepository.createUser({
          name: mockUser.name,
          surname: mockUser.surname,
          email: mockUser.email,
          phone: mockUser.phone,
          password: mockUser.password,
        });
      await expect(createUser()).resolves.toBe(mockUser);
    });
  });
});
