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
import { ServeStaticModule } from '@nestjs/serve-static';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { ProductCharacteristicModule } from './modules/product-characteristic/product-characteristic.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { DeliveryServiceModule } from './modules/delivery-service/delivery-service.module';
import { OrderModule } from './modules/order/order.module';
import { OrderedProductsModule } from './modules/ordered-products/ordered-products.module';
import { TinkoffAcqModule } from './modules/tinkoff-acq/tinkoff-acq.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
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
    FeedbackModule,
    ProductCharacteristicModule,
    RecommendationModule,
    DeliveryServiceModule,
    OrderModule,
    OrderedProductsModule,
    TinkoffAcqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
