import { Controller, Get, Query } from '@nestjs/common';
import { SubmissionDto } from 'src/submissions/dto/get-submissions.dto';
import { Submission } from 'src/submissions/submission.entity';
import { SubmissionsService } from 'src/submissions/submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionService: SubmissionsService) {}

  @Get('')
  async findAllByTaskId(@Query('taskId') taskId: number): Promise<Submission[]> {
    const submissions = await this.submissionService.findAllByTaskId(taskId);
    return submissions;
  }
}
