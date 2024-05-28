import { Task } from 'src/tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  round: number;
  @Column()
  taskId: number;

  @ManyToOne(() => Task, (task) => task.submissions)
  task: Task;
}
