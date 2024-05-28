export class CreateTaskDto {
  title: string;
  description: string;
  status: string;
  bson_id: string; // a uuid
}
