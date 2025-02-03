import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true, // only for dev environment
  }),UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { // global validation pipe, validation pipe is applied to all requests
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // global middleware cookieSession is applied to all requests
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: ['shortly-space-orange-strong']
    })).forRoutes('*');
  }
}
