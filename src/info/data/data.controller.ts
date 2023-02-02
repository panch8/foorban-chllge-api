import { Body, Controller, Post } from '@nestjs/common';
import { DataService } from './data.service';
import { UpdateDataRequest } from '../interfaces';
import { BaseResponse } from '../../interfaces';

@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateDataRequest): Promise<BaseResponse> {
    return this.dataService.validateData(bodyRequest);
  }
}
