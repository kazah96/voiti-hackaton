import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddWorkerRqDTO, GenerateToken } from './workers.dto';
import { WorkerService } from './workers.service';

@ApiTags('workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('/add')
  async addWorker(@Body() body: AddWorkerRqDTO) {
    return this.workerService.addWorker(body);
  }

  @Get()
  async get() {
    return this.workerService.getAll();
  }

  @Get('generate_key_for_token')
  getKey() {
    return this.workerService.generateKey();
  }

  @Post('generate_token_by_key')
  generateToken(@Body() { key }: GenerateToken) {
    return this.workerService.generateToken(key);
  }
}
