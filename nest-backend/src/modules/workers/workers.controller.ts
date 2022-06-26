import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddWorkerRqDTO, GenerateKey, GenerateToken } from './workers.dto';
import { WorkerService } from './workers.service';

@ApiTags('workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('/add')
  async addWorker(@Body() body: AddWorkerRqDTO) {
    return this.workerService.addWorker(body);
  }

  @Delete('')
  async deleteWorker(@Query('id') id?: string) {
    return this.workerService.removeWorker(id);
  }

  @Get()
  async get() {
    return this.workerService.getAll();
  }

  @Post('/generate_key_for_token')
  async getKey(@Body() body: GenerateKey) {
    return this.workerService.generateKey(body);
  }

  @Post('/generate_token_by_key')
  getToken(@Body() body: GenerateToken) {
    return this.workerService.generateToken(body);
  }
}
