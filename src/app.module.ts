import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UsersAddressesModule } from './modules/users-addresses/users-addresses.module';
import { CategoryModule } from './modules/category/category.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { ParameterModule } from './modules/parameter/parameter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    UsersAddressesModule,
    CategoryModule,
    VendorModule,
    ParameterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
