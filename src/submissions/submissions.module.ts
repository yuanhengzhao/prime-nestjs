import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { Submission } from 'src/submissions/submission.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Task, Submission])],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
