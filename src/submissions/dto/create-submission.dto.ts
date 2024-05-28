import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSubmissionDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  round: number;

  @IsInt()
  @IsNotEmpty()
  taskId: number; // Assuming each submission is linked to a specific task
}
