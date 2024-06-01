import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { envs } from './config/env';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(envs.mongoDbUri)],
})
export class AppModule {}
