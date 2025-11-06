import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FeedbackModule } from './feedback/feedback.module';
import { User } from './entities/user.entity';
import { Feedback } from './entities/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'npg_vxhOcF0dGzJ4',
      database: process.env.DB_NAME || 'test',
      entities: [User, Feedback],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UsersModule,
    FeedbackModule,
  ],
})
export class AppModule {}