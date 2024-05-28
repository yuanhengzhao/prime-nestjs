import { Submission } from 'src/submissions/submission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  bson_id: string; // a uuid
  @Column()
  status: string;
  @OneToMany(() => Submission, (submission) => submission.task)
  submissions: Submission[];
}
