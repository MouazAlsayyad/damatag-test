import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { TaskSchema, Task } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    JwtService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class TasksModule {}
