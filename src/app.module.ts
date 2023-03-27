import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { UsersAddressesModule } from './modules/users-addresses/users-addresses.module';
import { CategoryModule } from './modules/category/category.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { ParameterModule } from './modules/parameter/parameter.module';
import { ProductModule } from './modules/product/product.module';
import { ProductPictureModule } from './modules/product-picture/product-picture.module';

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
    ProductModule,
    ProductPictureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
