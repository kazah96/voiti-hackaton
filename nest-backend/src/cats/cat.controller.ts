import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CatsService } from './cat.service';
import { Cat } from '../interfaces/cat.interface';
import { ApiProperty } from '@nestjs/swagger';

function getProm() {
  return new Promise<string>((res, rej) => {
    const timer = setTimeout(() => {
      res('ebaka');
    }, 1000);
  });
}

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  greed?: string;
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Req() req) {
    return this.catsService.findAll();
  }

  @Post()
  async setAll(@Body() body: CreateCatDto): Promise<string> {
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );

    const cat: Cat = {
      age: body.age,
      breed: body.breed,
      name: body.name,
    };

    this.catsService.create(cat);

    return 'Daa';
  }
}
