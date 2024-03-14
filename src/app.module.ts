import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './mongo/mongo.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_URI: Joi.string().required(),
        JSON_TOKEN_KEY: Joi.string().required(),
        JSON_TOKEN_EXPIRERS_IN: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),

    MongoModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
