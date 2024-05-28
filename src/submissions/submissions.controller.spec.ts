import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { Submission } from 'src/submissions/submission.entity';
import { Task } from 'src/tasks/entities/task.entity';

describe('SubmissionsController', () => {
  let controller: SubmissionsController;
  let submissionsService: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionsController],
      providers: [
        {
          provide: SubmissionsService,
          useValue: {
            findAllByTaskId: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SubmissionsController>(SubmissionsController);
    submissionsService = module.get<SubmissionsService>(SubmissionsService);
  });

  describe('findAllByTask', () => {
    it('should return all submissions for a specific task ID and round when task ID is 1234', async () => {
      const taskId = 1234;
      const mockSubmissions = [
        {
          id: 1,
          task: { id: taskId, title: 'Mock Task', description: 'Mock Description', bson_id: 'mockId', status: 'open', submissions: [] },
          round: 1,
        },
      ];
      jest.spyOn(submissionsService, 'findAll').mockResolvedValue(mockSubmissions);

      const result = await controller.findAllByTask(taskId);
      expect(result).toEqual(mockSubmissions);
      expect(submissionsService.findAll).toHaveBeenCalledWith({
        where: { task: { id: taskId }, round: 1 },
      });
    });

    it('should delegate to findAllByTaskId for other task IDs', async () => {
      const taskId = 5678;
      const mockTask: Task = {
        id: taskId,
        title: 'Mock Task',
        description: 'This is a mock task',
        bson_id: 'mockId',
        status: 'open',
        submissions: [],
      };
      const mockSubmissions: Submission[] = [{ id: 2, task: mockTask, round: 1 }];
      jest.spyOn(submissionsService, 'findAllByTaskId').mockResolvedValue(mockSubmissions);

      const result = await controller.findAllByTask(taskId);
      expect(result).toEqual(mockSubmissions);
      expect(submissionsService.findAllByTaskId).toHaveBeenCalledWith(taskId);
    });

    it('should handle and return empty array when no submissions are found', async () => {
      const taskId = 9999;
      jest.spyOn(submissionsService, 'findAllByTaskId').mockResolvedValue([]);

      const result = await controller.findAllByTask(taskId);
      expect(result).toEqual([]);
    });
  });
});
